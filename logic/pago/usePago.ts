// logic/pago/usePago.ts
import { useState } from 'react';
import { Alert } from 'react-native';
import { router } from 'expo-router';
import { supabase } from '../supabase/supabase';

export interface PagoParams {
  hospedajeId:     string;
  hospedajeNombre: string;
  monto:           string;
  checkin:         string;
  checkout:        string;
}

export interface TarjetaForm {
  numero:  string;
  titular: string;
  expiry:  string;
  cvv:     string;
}

export const formatCardNumber = (val: string) =>
  val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();

export const formatExpiry = (val: string) => {
  const d = val.replace(/\D/g, '').slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
};

export const detectNetwork = (num: string): string => {
  if (/^4/.test(num))      return 'VISA';
  if (/^5[1-5]/.test(num)) return 'MC';
  if (/^3[47]/.test(num))  return 'AMEX';
  return '💳';
};

export const diffDays = (a: Date, b: Date) =>
  Math.max(1, Math.round((b.getTime() - a.getTime()) / 86400000));

export const toISO = (d: Date) => d.toISOString().split('T')[0];

export const formatDate = (d: Date) =>
  d.toLocaleDateString('es-EC', { day: '2-digit', month: 'short', year: 'numeric' });

const processMockPayment = async (_amount: number) => {
  await new Promise(r => setTimeout(r, 2000));
  if (Math.random() > 0.1) return { success: true, transactionId: `TX-${Date.now()}` };
  throw new Error('El banco no pudo procesar la transacción. Intenta con otra tarjeta.');
};

const validate = (form: TarjetaForm): string | null => {
  if (form.numero.replace(/\s/g, '').length < 16)  return 'Ingresa un número de tarjeta válido.';
  if (!form.titular.trim())                        return 'Ingresa el nombre del titular.';
  if (form.expiry.length < 5)                      return 'Ingresa la fecha de expiración (MM/AA).';
  if (form.cvv.length < 3 || form.cvv.length > 4)  return 'El CVV debe tener 3 o 4 dígitos.';
  return null;
};

export function usePago(params: PagoParams) {
  const [form, setForm] = useState<TarjetaForm>({
    numero: '', titular: '', expiry: '', cvv: '',
  });
  const [loading, setLoading] = useState(false);

  const [checkin, setCheckin] = useState<Date>(() => {
    const d = new Date(params.checkin);
    return isNaN(d.getTime()) ? new Date() : d;
  });
  const [checkout, setCheckout] = useState<Date>(() => {
    const d = new Date(params.checkout);
    if (!isNaN(d.getTime())) return d;
    const t = new Date(); t.setDate(t.getDate() + 1); return t;
  });

  const update = (key: keyof TarjetaForm) => (val: string) =>
    setForm(prev => ({ ...prev, [key]: val }));

  const redSocial  = detectNetwork(form.numero.replace(/\s/g, ''));
  const nights     = diffDays(checkin, checkout);
  const precioBase = Number(params.monto ?? 0);
  const montoTotal = precioBase * nights;

  const handleCheckinChange = (d: Date) => {
    setCheckin(d);
    if (d >= checkout) {
      const next = new Date(d);
      next.setDate(next.getDate() + 1);
      setCheckout(next);
    }
  };

  const handleCheckoutChange = (d: Date) => {
    if (d > checkin) setCheckout(d);
  };

  const handlePagar = async () => {
    const error = validate(form);
    if (error) { Alert.alert('Datos incompletos', error); return; }

    setLoading(true);
    try {
      const { transactionId } = await processMockPayment(montoTotal);

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No hay sesión activa.');

      const { error: dbError } = await supabase.from('reservas').insert({
        user_id:          user.id,
        hospedaje_id:     Number(params.hospedajeId ?? 0),
        hospedaje_nombre: params.hospedajeNombre ?? '',
        fecha_checkin:    toISO(checkin),
        fecha_checkout:   toISO(checkout),
        monto:            montoTotal,
        ultimos_4:        form.numero.replace(/\s/g, '').slice(-4),
        transaction_id:   transactionId,
        estado:           'confirmada', 
      });
      if (dbError) throw new Error(dbError.message);

      router.replace({
        pathname: '/comprobante',
        params: {
          transactionId,
          hospedajeNombre: params.hospedajeNombre ?? '',
          monto:    String(montoTotal),
          checkin:  toISO(checkin),
          checkout: toISO(checkout),
          ultimos4: form.numero.replace(/\s/g, '').slice(-4),
        },
      } as any);

    } catch (err: any) {
      Alert.alert('Error en el pago', err.message ?? 'Ocurrió un error inesperado.');
    } finally {
      setLoading(false);
    }
  };

  return {
    form, update, loading,
    redSocial, nights, montoTotal,
    checkin, checkout,
    handleCheckinChange, handleCheckoutChange,
    handlePagar,
  };
}