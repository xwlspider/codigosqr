import { useState } from 'react';
import { Alert } from 'react-native';
import { router } from 'expo-router';
import { supabase } from '../supabase/supabase';

// ─── Tipos ────────────────────────────────────────────────────────────────────

// Parámetros que llegan desde la pantalla del hospedaje vía router.push
export interface PagoParams {
  hospedajeId:     string;
  hospedajeNombre: string;
  monto:           string;
  checkin:         string;
  checkout:        string;
}

// Estado interno del formulario de tarjeta
export interface TarjetaForm {
  numero:  string;
  titular: string;
  expiry:  string;
  cvv:     string;
}

// ─── Helpers de formato ───────────────────────────────────────────────────────

// Agrega espacios cada 4 dígitos: "1234567812345678" → "1234 5678 1234 5678"
export const formatCardNumber = (val: string) =>
  val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();

// Inserta la barra de expiración: "1225" → "12/25"
export const formatExpiry = (val: string) => {
  const digits = val.replace(/\D/g, '').slice(0, 4);
  return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
};

// Detecta la red de la tarjeta según el primer dígito
export const detectNetwork = (num: string): string => {
  if (/^4/.test(num))      return '💳 Visa';
  if (/^5[1-5]/.test(num)) return '💳 Mastercard';
  if (/^3[47]/.test(num))  return '💳 Amex';
  return '💳';
};

// ─── Mock de pasarela de pago ─────────────────────────────────────────────────
// Simula una llamada a una pasarela real (Stripe, PayPal, etc.)
// Tiene un 10% de probabilidad de fallo para simular errores del banco
const processMockPayment = async (amount: number) => {
  // Simula latencia de red de 2 segundos
  await new Promise(resolve => setTimeout(resolve, 2000));

  const isSuccess = Math.random() > 0.1;
  if (isSuccess) {
    // Genera un ID de transacción único basado en el timestamp
    return { success: true, transactionId: `TX-${Date.now()}` };
  } else {
    throw new Error('El banco no pudo procesar la transacción. Intenta con otra tarjeta.');
  }
};

// ─── Validación del formulario ────────────────────────────────────────────────
// Retorna string con el error encontrado, o null si todo está correcto
const validate = (form: TarjetaForm): string | null => {
  if (form.numero.replace(/\s/g, '').length < 16) return 'Ingresa un número de tarjeta válido.';
  if (!form.titular.trim())                        return 'Ingresa el nombre del titular.';
  if (form.expiry.length < 5)                      return 'Ingresa la fecha de expiración (MM/AA).';
  if (form.cvv.length < 3)                         return 'Ingresa el CVV.';
  return null;
};

// ─── Hook principal ───────────────────────────────────────────────────────────
export function usePago(params: PagoParams) {
  // Estado del formulario de tarjeta
  const [form, setForm] = useState<TarjetaForm>({
    numero:  '',
    titular: '',
    expiry:  '',
    cvv:     '',
  });
  const [loading, setLoading] = useState(false);

  // Actualizador genérico de campos del formulario
  const update = (key: keyof TarjetaForm) => (val: string) =>
    setForm(prev => ({ ...prev, [key]: val }));

  // Red detectada en tiempo real según los primeros dígitos
  const redSocial = detectNetwork(form.numero.replace(/\s/g, ''));

  // ── Flujo completo de pago ─────────────────────────────────────────────────
  const handlePagar = async () => {
    // 1. Validar formulario antes de hacer cualquier llamada
    const error = validate(form);
    if (error) {
      Alert.alert('Datos incompletos', error);
      return;
    }

    setLoading(true);
    try {
      // 2. Llamar a la pasarela de pago (mock por ahora)
      const { transactionId } = await processMockPayment(Number(params.monto ?? 0));

      // 3. Verificar que hay sesión activa (el usuario está logueado)
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No hay sesión activa.');

      // 4. Guardar la reserva confirmada en la tabla "reservas" de Supabase
      const { error: dbError } = await supabase.from('reservas').insert({
        user_id:          user.id,
        hospedaje_id:     Number(params.hospedajeId ?? 0),
        hospedaje_nombre: params.hospedajeNombre ?? '',
        fecha_checkin:    params.checkin ?? '',
        fecha_checkout:   params.checkout ?? '',
        monto:            Number(params.monto ?? 0),
        // Solo guardamos los últimos 4 dígitos, nunca el número completo
        ultimos_4:        form.numero.replace(/\s/g, '').slice(-4),
        transaction_id:   transactionId,
        estado:           'confirmada',
      });

      if (dbError) throw new Error(dbError.message);

      // 5. Navegar al comprobante con los datos para mostrar el QR
      router.replace({
        pathname: '/comprobante',
        params: {
          transactionId,
          hospedajeNombre: params.hospedajeNombre ?? '',
          monto:           params.monto ?? '0',
          checkin:         params.checkin ?? '',
          checkout:        params.checkout ?? '',
          // Últimos 4 para mostrar "•••• •••• •••• 1234" en el comprobante
          ultimos4:        form.numero.replace(/\s/g, '').slice(-4),
        },
      });

    } catch (err: any) {
      Alert.alert('Error en el pago', err.message ?? 'Ocurrió un error inesperado.');
    } finally {
      setLoading(false);
    }
  };

  return { form, update, loading, redSocial, handlePagar };
}