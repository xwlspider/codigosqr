// app/pago.tsx
import React, { useRef, useEffect, useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, SafeAreaView,
  StatusBar, ScrollView, ActivityIndicator, KeyboardAvoidingView,
  Platform, Animated, Modal,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  usePago, formatCardNumber, formatExpiry,
  formatDate, diffDays,
} from '../logic/pago/usePago';
import { s, BG, AQUA } from '../components/pago.styles';

// ─── Selector de fechas ───────────────────────────────────────────────────────
function DateSelector({
  checkin, checkout, onCheckinChange, onCheckoutChange,
}: {
  checkin: Date; checkout: Date;
  onCheckinChange: (d: Date) => void;
  onCheckoutChange: (d: Date) => void;
}) {
  const [showPicker, setShowPicker] = useState<'checkin' | 'checkout' | null>(null);
  const [tempDate,   setTempDate]   = useState(new Date());
  const nights = diffDays(checkin, checkout);

  const openPicker = (type: 'checkin' | 'checkout') => {
    setTempDate(type === 'checkin' ? checkin : checkout);
    setShowPicker(type);
  };

  const handleConfirm = () => {
    if (showPicker === 'checkin')  onCheckinChange(tempDate);
    if (showPicker === 'checkout') onCheckoutChange(tempDate);
    setShowPicker(null);
  };

  return (
    <>
      <View style={s.fechasBox}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={s.fechasTitle}>📅 Selecciona tus fechas</Text>
          <View style={s.nightsBadge}>
            <Text style={s.nightsText}>{nights} {nights === 1 ? 'noche' : 'noches'}</Text>
          </View>
        </View>

        <View style={s.fechasRow}>
          <TouchableOpacity
            style={[s.fechaBtn, showPicker === 'checkin' && s.fechaBtnActive]}
            onPress={() => openPicker('checkin')}
            activeOpacity={0.85}
          >
            <View style={s.fechaBtnInner}>
              <Text style={s.fechaBtnIcon}>🛬</Text>
              <View>
                <Text style={s.fechaBtnLabel}>CHECK-IN</Text>
                <Text style={s.fechaBtnValue}>{formatDate(checkin)}</Text>
              </View>
            </View>
          </TouchableOpacity>

          <Text style={s.fechaArrow}>→</Text>

          <TouchableOpacity
            style={[s.fechaBtn, showPicker === 'checkout' && s.fechaBtnActive]}
            onPress={() => openPicker('checkout')}
            activeOpacity={0.85}
          >
            <View style={s.fechaBtnInner}>
              <Text style={s.fechaBtnIcon}>🛫</Text>
              <View>
                <Text style={s.fechaBtnLabel}>CHECK-OUT</Text>
                <Text style={s.fechaBtnValue}>{formatDate(checkout)}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Android: picker nativo directo, sin Modal wrapper */}
      {showPicker && Platform.OS === 'android' && (
        <DateTimePicker
          value={tempDate}
          mode="date"
          display="default"
          minimumDate={showPicker === 'checkout' ? checkin : new Date()}
          onChange={(_, date) => {
            setShowPicker(null);
            if (date) {
              if (showPicker === 'checkin')  onCheckinChange(date);
              if (showPicker === 'checkout') onCheckoutChange(date);
            }
          }}
        />
      )}

      {/* iOS: modal custom */}
      {showPicker && Platform.OS === 'ios' && (
        <Modal transparent animationType="slide" onRequestClose={() => setShowPicker(null)}>
          <TouchableOpacity style={s.modalBackdrop} activeOpacity={1} onPress={() => setShowPicker(null)}>
            <TouchableOpacity activeOpacity={1}>
              <View style={s.modalCard}>
                <View style={s.modalHeader}>
                  <Text style={s.modalTitle}>
                    {showPicker === 'checkin' ? '🛬 Check-in' : '🛫 Check-out'}
                  </Text>
                  <Text style={s.modalSub}>
                    {showPicker === 'checkin' ? 'Fecha de llegada' : 'Fecha de salida'}
                  </Text>
                </View>

                <DateTimePicker
                  value={tempDate}
                  mode="date"
                  display="inline"
                  minimumDate={showPicker === 'checkout' ? checkin : new Date()}
                  onChange={(_, date) => { if (date) setTempDate(date); }}
                  themeVariant="dark"
                  accentColor={AQUA}
                  style={s.modalPicker}
                />

                <View style={s.modalBtns}>
                  <TouchableOpacity style={s.btnCancelar} onPress={() => setShowPicker(null)}>
                    <Text style={s.btnCancelarText}>Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={s.btnConfirmar} onPress={handleConfirm}>
                    <Text style={s.btnConfirmarText}>Confirmar →</Text>
                    <View style={s.btnShine} />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
      )}
    </>
  );
}

// ─── Pantalla ─────────────────────────────────────────────────────────────────
export default function PagoScreen() {
  const params = useLocalSearchParams<{
    hospedajeId: string; hospedajeNombre: string;
    monto: string; checkin: string; checkout: string;
  }>();

  const {
    form, update, loading,
    redSocial, nights, montoTotal,
    checkin, checkout,
    handleCheckinChange, handleCheckoutChange,
    handlePagar,
  } = usePago(params);

  const fadeAnim     = useRef(new Animated.Value(0)).current;
  const slideAnim    = useRef(new Animated.Value(30)).current;
  const btnScale     = useRef(new Animated.Value(1)).current;
  const resumenScale = useRef(new Animated.Value(0.95)).current;

  const numeroRef  = useRef<TextInput>(null);
  const titularRef = useRef<TextInput>(null);
  const expiryRef  = useRef<TextInput>(null);
  const cvvRef     = useRef<TextInput>(null);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim,     { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.spring(slideAnim,    { toValue: 0, tension: 60, friction: 10, useNativeDriver: true }),
      Animated.spring(resumenScale, { toValue: 1, tension: 60, friction: 8, delay: 150, useNativeDriver: true }),
    ]).start();
  }, []);


  return (
    <SafeAreaView style={s.safe}>
      <StatusBar barStyle="light-content" backgroundColor={BG} />
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

          {/* Selector de fechas */}
          <Animated.View style={{ opacity: fadeAnim }}>
            <DateSelector
              checkin={checkin}
              checkout={checkout}
              onCheckinChange={handleCheckinChange}
              onCheckoutChange={handleCheckoutChange}
            />
          </Animated.View>

          {/* Resumen */}
          <Animated.View style={[s.resumenBox, { transform: [{ scale: resumenScale }] }]}>
            <Text style={s.resumenLabel}>Hospedaje</Text>
            <Text style={s.resumenValue}>{params.hospedajeNombre ?? '—'}</Text>
            <View style={s.resumenRow}>
              <View>
                <Text style={s.resumenLabel}>Check-in</Text>
                <Text style={s.resumenValue}>{formatDate(checkin)}</Text>
              </View>
              <View>
                <Text style={s.resumenLabel}>Check-out</Text>
                <Text style={s.resumenValue}>{formatDate(checkout)}</Text>
              </View>
              <View>
                <Text style={s.resumenLabel}>{nights} {nights === 1 ? 'noche' : 'noches'}</Text>
                <Text style={[s.resumenValue, { color: AQUA }]}>${montoTotal}</Text>
              </View>
            </View>
          </Animated.View>

          {/* Formulario tarjeta */}
          <Animated.View style={[s.card, { opacity: fadeAnim }]}>
            <View style={s.cardGlow} />

            {/* Número */}
            <View style={s.field}>
              <Text style={s.label}>Número de tarjeta</Text>
              <View style={s.inputWrap}>
                <Text style={s.inputIcon}>{redSocial}</Text>
                <TextInput
                  ref={numeroRef}
                  style={s.input} placeholder="0000 0000 0000 0000" placeholderTextColor="#1a4a45"
                  value={form.numero} onChangeText={v => update('numero')(formatCardNumber(v))}
                  keyboardType="numeric" maxLength={19}
                  returnKeyType="next" onSubmitEditing={() => titularRef.current?.focus()}
                />
              </View>
            </View>
            
            {/* Titular */}
            <View style={s.field}>
              <Text style={s.label}>Titular</Text>
              <View style={s.inputWrap}>
                <Text style={s.inputIcon}>👤</Text>
                <TextInput
                  ref={titularRef}
                  style={s.input} placeholder="Nombre como aparece en la tarjeta" placeholderTextColor="#1a4a45"
                  value={form.titular} onChangeText={update('titular')} autoCapitalize="characters"
                  returnKeyType="next" onSubmitEditing={() => expiryRef.current?.focus()}
                />
              </View>
            </View>
            
            {/* Expiración + CVV */}
            <View style={s.row}>
              <View style={[s.field, { flex: 1 }]}>
                <Text style={s.label}>Expiración</Text>
                <View style={s.inputWrap}>
                  <Text style={s.inputIcon}>📅</Text>
                  <TextInput
                    ref={expiryRef}
                    style={s.input} placeholder="MM/AA" placeholderTextColor="#1a4a45"
                    value={form.expiry} onChangeText={v => update('expiry')(formatExpiry(v))}
                    keyboardType="numeric" maxLength={5}
                    returnKeyType="next" onSubmitEditing={() => cvvRef.current?.focus()}
                  />
                </View>
              </View>
              <View style={[s.field, { flex: 1 }]}>
                <Text style={s.label}>CVV</Text>
                <View style={s.inputWrap}>
                  <Text style={s.inputIcon}>🔐</Text>
                  <TextInput
                    ref={cvvRef}
                    style={s.input} placeholder="123" placeholderTextColor="#1a4a45"
                    value={form.cvv} onChangeText={v => update('cvv')(v.replace(/\D/g, '').slice(0, 4))}
                    keyboardType="numeric" maxLength={4} secureTextEntry
                    returnKeyType="done" onSubmitEditing={handlePagar}
                  />
                </View>
              </View>
            </View>

            {/* Botón */}
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
                    : <>
                        <Text style={s.btnText}>Pagar ${montoTotal}</Text>
                        <Text style={s.btnText}> →</Text>
                      </>
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