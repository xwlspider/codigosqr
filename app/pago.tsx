import React, { useRef, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, SafeAreaView,
  StatusBar, ScrollView, ActivityIndicator, KeyboardAvoidingView,
  Platform, Animated,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { usePago, formatCardNumber, formatExpiry } from '../logic/pago/usePago';
import { s, BG, AQUA } from '../components/pago.styles';

// Componentes extraídos
import { DateSelector } from '../logic/pago/DateSelector';
import { ResumenPago } from '../logic/pago/ResumenPago';

export default function PagoScreen() {
  const params = useLocalSearchParams<any>();
  const {
    form, update, loading, redSocial, nights, montoTotal,
    checkin, checkout, handleCheckinChange, handleCheckoutChange, handlePagar,
  } = usePago(params);

  // Refs de Animación
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const btnScale = useRef(new Animated.Value(1)).current;
  const resumenScale = useRef(new Animated.Value(0.95)).current;

  // Refs de Inputs
  const numeroRef = useRef<TextInput>(null);
  const titularRef = useRef<TextInput>(null);
  const expiryRef = useRef<TextInput>(null);
  const cvvRef = useRef<TextInput>(null);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, tension: 60, friction: 10, useNativeDriver: true }),
      Animated.spring(resumenScale, { toValue: 1, tension: 60, friction: 8, delay: 150, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={s.safe}>
      <StatusBar barStyle="light-content" backgroundColor={BG} />
      <View style={s.glowTL} /><View style={s.glowBR} />

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
          
          {/* Header */}
          <Animated.View style={[s.header, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
            <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
              <Text style={s.backText}>← Volver</Text>
            </TouchableOpacity>
            <Text style={s.title}>Pago seguro</Text>
            <Text style={s.subtitle}>🔒 PCI DSS Compliant · Encriptado</Text>
          </Animated.View>

          <DateSelector 
            checkin={checkin} checkout={checkout} 
            onCheckinChange={handleCheckinChange} onCheckoutChange={handleCheckoutChange} 
          />

          <ResumenPago 
            params={params} checkin={checkin} checkout={checkout} 
            nights={nights} montoTotal={montoTotal} scale={resumenScale} 
          />

          {/* Formulario */}
          <Animated.View style={[s.card, { opacity: fadeAnim }]}>
            <View style={s.field}>
              <Text style={s.label}>Número de tarjeta</Text>
              <View style={s.inputWrap}>
                <Text style={s.inputIcon}>{redSocial}</Text>
                <TextInput
                  ref={numeroRef} style={s.input} placeholder="0000 0000 0000 0000"
                  value={form.numero} onChangeText={v => update('numero')(formatCardNumber(v))}
                  keyboardType="numeric" maxLength={19} returnKeyType="next"
                  onSubmitEditing={() => titularRef.current?.focus()}
                />
              </View>
            </View>

            <View style={s.field}>
              <Text style={s.label}>Titular</Text>
              <View style={s.inputWrap}>
                <Text style={s.inputIcon}>👤</Text>
                <TextInput
                  ref={titularRef} style={s.input} placeholder="Nombre del titular"
                  value={form.titular} onChangeText={update('titular')} autoCapitalize="characters"
                  returnKeyType="next" onSubmitEditing={() => expiryRef.current?.focus()}
                />
              </View>
            </View>

            <View style={s.row}>
              <View style={[s.field, { flex: 1 }]}>
                <Text style={s.label}>Expiración</Text>
                <View style={s.inputWrap}>
                  <TextInput
                    ref={expiryRef} style={s.input} placeholder="MM/AA"
                    value={form.expiry} onChangeText={v => update('expiry')(formatExpiry(v))}
                    keyboardType="numeric" maxLength={5} returnKeyType="next"
                    onSubmitEditing={() => cvvRef.current?.focus()}
                  />
                </View>
              </View>
              <View style={[s.field, { flex: 1 }]}>
                <Text style={s.label}>CVV</Text>
                <View style={s.inputWrap}>
                  <TextInput
                    ref={cvvRef} style={s.input} placeholder="123" secureTextEntry
                    value={form.cvv} onChangeText={v => update('cvv')(v.replace(/\D/g, '').slice(0, 4))}
                    keyboardType="numeric" maxLength={4} returnKeyType="done"
                    onSubmitEditing={handlePagar}
                  />
                </View>
              </View>
            </View>

            <Animated.View style={{ transform: [{ scale: btnScale }] }}>
              <TouchableOpacity
                style={[s.btnPagar, loading && s.btnDisabled]}
                onPress={handlePagar}
                onPressIn={() => Animated.spring(btnScale, { toValue: 0.96, useNativeDriver: true }).start()}
                onPressOut={() => Animated.spring(btnScale, { toValue: 1, useNativeDriver: true }).start()}
                disabled={loading}
              >
                <View style={s.btnInner}>
                  {loading ? <ActivityIndicator color="#001a1a" /> : <Text style={s.btnText}>Pagar ${montoTotal} →</Text>}
                </View>
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}