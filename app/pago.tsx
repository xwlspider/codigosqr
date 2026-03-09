// app/pago.tsx
import React, { useRef, useEffect, useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, SafeAreaView,
  StatusBar, ScrollView, ActivityIndicator, KeyboardAvoidingView,
  Platform, Animated, Alert,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { supabase } from '../logic/supabase/supabase';
import { s, ACCENT, BG, AQUA, BORDER, TEXT, MUTED } from '../components/pago.styles';

// ─── Helpers ──────────────────────────────────────────────────────────────────
export const formatCardNumber = (val: string) =>
  val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();

export const formatExpiry = (val: string) => {
  const d = val.replace(/\D/g, '').slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
};

const detectNetwork = (num: string) => {
  if (/^4/.test(num))      return '💳 Visa';
  if (/^5[1-5]/.test(num)) return '💳 Mastercard';
  if (/^3[47]/.test(num))  return '💳 Amex';
  return '💳';
};

const processMockPayment = async (amount: number) => {
  await new Promise(r => setTimeout(r, 2000));
  if (Math.random() > 0.1) return { success: true, transactionId: `TX-${Date.now()}` };
  throw new Error('El banco no pudo procesar la transacción. Intenta con otra tarjeta.');
};

// ─── Pantalla ─────────────────────────────────────────────────────────────────
export default function PagoScreen() {
  const params = useLocalSearchParams<{
    hospedajeId: string; hospedajeNombre: string;
    monto: string; checkin: string; checkout: string;
  }>();

  const [numero,  setNumero]  = useState('');
  const [titular, setTitular] = useState('');
  const [expiry,  setExpiry]  = useState('');
  const [cvv,     setCvv]     = useState('');
  const [focused, setFocused] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Animaciones
  const fadeAnim  = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const btnScale  = useRef(new Animated.Value(1)).current;
  const resumenScale = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim,     { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.spring(slideAnim,    { toValue: 0, tension: 60, friction: 10, useNativeDriver: true }),
      Animated.spring(resumenScale, { toValue: 1, tension: 60, friction: 8, delay: 150, useNativeDriver: true }),
    ]).start();
  }, []);

  const redSocial = detectNetwork(numero.replace(/\s/g, ''));

  const validate = (): string | null => {
    if (numero.replace(/\s/g, '').length < 16) return 'Ingresa un número de tarjeta válido.';
    if (!titular.trim()) return 'Ingresa el nombre del titular.';
    if (expiry.length < 5) return 'Ingresa la fecha de expiración.';
    if (cvv.length < 3) return 'Ingresa el CVV.';
    return null;
  };

  const handlePagar = async () => {
    const error = validate();
    if (error) { Alert.alert('Datos incompletos', error); return; }
    setLoading(true);
    try {
      const { transactionId } = await processMockPayment(Number(params.monto ?? 0));
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No hay sesión activa.');
      const { error: dbError } = await supabase.from('reservas').insert({
        user_id: user.id,
        hospedaje_id:     Number(params.hospedajeId ?? 0),
        hospedaje_nombre: params.hospedajeNombre ?? '',
        fecha_checkin:    params.checkin ?? '',
        fecha_checkout:   params.checkout ?? '',
        monto:            Number(params.monto ?? 0),
        ultimos_4:        numero.replace(/\s/g, '').slice(-4),
        transaction_id:   transactionId,
        estado:           'confirmada',
      });
      if (dbError) throw new Error(dbError.message);
      router.replace({
        pathname: '/comprobante',
        params: {
          transactionId,
          hospedajeNombre: params.hospedajeNombre ?? '',
          monto:    params.monto ?? '0',
          checkin:  params.checkin ?? '',
          checkout: params.checkout ?? '',
          ultimos4: numero.replace(/\s/g, '').slice(-4),
        },
      } as any);
    } catch (err: any) {
      Alert.alert('Error en el pago', err.message ?? 'Ocurrió un error inesperado.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (name: string) => [
    s.inputRow,
    focused === name && s.inputFocused,
  ];

  return (
    <SafeAreaView style={s.safe}>
      <StatusBar barStyle="light-content" backgroundColor={BG} />
      {/* Orbes de fondo */}
      <View style={s.glowTL} />
      <View style={s.glowBR} />

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

          {/* Header */}
          <Animated.View style={[s.header, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
            <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
              <Text style={s.backText}>← Volver</Text>
            </TouchableOpacity>
            <Text style={s.title}>Pago seguro</Text>
            <Text style={s.subtitle}>🔒 PCI DSS Compliant · Encriptado</Text>
          </Animated.View>

          {/* Resumen */}
          <Animated.View style={[s.resumenBox, { transform: [{ scale: resumenScale }] }]}>
            <Text style={s.resumenLabel}>Hospedaje</Text>
            <Text style={s.resumenValue}>{params.hospedajeNombre ?? '—'}</Text>
            <View style={s.resumenRow}>
              <View>
                <Text style={s.resumenLabel}>Check-in</Text>
                <Text style={s.resumenValue}>{params.checkin ?? '—'}</Text>
              </View>
              <View>
                <Text style={s.resumenLabel}>Check-out</Text>
                <Text style={s.resumenValue}>{params.checkout ?? '—'}</Text>
              </View>
              <View>
                <Text style={s.resumenLabel}>Total</Text>
                <Text style={[s.resumenValue, { color: AQUA }]}>${params.monto ?? '0'}</Text>
              </View>
            </View>
          </Animated.View>

          {/* Formulario */}
          <Animated.View style={[s.card, { opacity: fadeAnim }]}>
            <View style={s.cardGlow} />

            {/* Número */}
            <View style={s.field}>
              <Text style={s.label}>Número de tarjeta</Text>
              <View style={inputStyle('numero')}>
                <Text style={s.networkIcon}>{redSocial}</Text>
                <TextInput
                  style={s.input} placeholder="0000 0000 0000 0000" placeholderTextColor="#1a4a45"
                  value={numero} onChangeText={v => setNumero(formatCardNumber(v))}
                  keyboardType="numeric" maxLength={19}
                  onFocus={() => setFocused('numero')} onBlur={() => setFocused(null)}
                />
              </View>
            </View>

            {/* Titular */}
            <View style={s.field}>
              <Text style={s.label}>Titular</Text>
              <View style={inputStyle('titular')}>
                <Text style={s.networkIcon}>👤</Text>
                <TextInput
                  style={s.input} placeholder="Nombre como aparece en la tarjeta" placeholderTextColor="#1a4a45"
                  value={titular} onChangeText={setTitular} autoCapitalize="characters"
                  onFocus={() => setFocused('titular')} onBlur={() => setFocused(null)}
                />
              </View>
            </View>

            {/* Expiración + CVV */}
            <View style={s.row}>
              <View style={[s.field, { flex: 1 }]}>
                <Text style={s.label}>Expiración</Text>
                <View style={inputStyle('expiry')}>
                  <Text style={s.networkIcon}>📅</Text>
                  <TextInput
                    style={s.input} placeholder="MM/AA" placeholderTextColor="#1a4a45"
                    value={expiry} onChangeText={v => setExpiry(formatExpiry(v))}
                    keyboardType="numeric" maxLength={5}
                    onFocus={() => setFocused('expiry')} onBlur={() => setFocused(null)}
                  />
                </View>
              </View>
              <View style={[s.field, { flex: 1 }]}>
                <Text style={s.label}>CVV</Text>
                <View style={inputStyle('cvv')}>
                  <Text style={s.networkIcon}>🔐</Text>
                  <TextInput
                    style={s.input} placeholder="123" placeholderTextColor="#1a4a45"
                    value={cvv} onChangeText={v => setCvv(v.replace(/\D/g, '').slice(0, 4))}
                    keyboardType="numeric" maxLength={4} secureTextEntry
                    onFocus={() => setFocused('cvv')} onBlur={() => setFocused(null)}
                  />
                </View>
              </View>
            </View>

            {/* Botón pagar */}
            <Animated.View style={{ transform: [{ scale: btnScale }] }}>
              <TouchableOpacity
                style={[s.btnPagar, loading && s.btnDisabled]}
                onPress={handlePagar}
                onPressIn={() => Animated.spring(btnScale, { toValue: 0.96, useNativeDriver: true }).start()}
                onPressOut={() => Animated.spring(btnScale, { toValue: 1, useNativeDriver: true }).start()}
                disabled={loading} activeOpacity={1}
              >
                <View style={s.btnInner}>
                  {loading
                    ? <ActivityIndicator color="#001a1a" />
                    : <><Text style={s.btnText}>Completar pago</Text><Text style={s.btnText}> →</Text></>
                  }
                </View>
                <View style={s.btnShine} />
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}