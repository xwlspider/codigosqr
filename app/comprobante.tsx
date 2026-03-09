// app/comprobante.tsx
import React, { useMemo, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, StatusBar,
  ScrollView, TouchableOpacity, Animated,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import QRCode from 'react-native-qrcode-svg';

const BG    = '#010a09';
const CARD  = '#0d1f1d';
const BORDER= '#0a3530';
const TEXT  = '#e0fffc';
const MUTED = '#3a8a80';
const AQUA  = '#00e5cc';
const AQUA2 = '#00b4a0';
const GREEN = '#22c55e';

export default function ComprobanteScreen() {
  const params = useLocalSearchParams<{
    transactionId: string; hospedajeNombre: string;
    monto: string; checkin: string; checkout: string; ultimos4: string;
  }>();

  const qrData = useMemo(() => JSON.stringify({
    tx: params.transactionId, hotel: params.hospedajeNombre,
    checkin: params.checkin, checkout: params.checkout, monto: params.monto,
  }), [params]);

  const fechaEmision = new Date().toLocaleDateString('es-EC', {
    day: '2-digit', month: 'long', year: 'numeric',
  });

  // Animaciones
  const checkScale  = useRef(new Animated.Value(0)).current;
  const checkOpac   = useRef(new Animated.Value(0)).current;
  const ticketSlide = useRef(new Animated.Value(60)).current;
  const ticketOpac  = useRef(new Animated.Value(0)).current;
  const btnsOpac    = useRef(new Animated.Value(0)).current;
  const pulseAnim   = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      // 1. Check aparece con rebote
      Animated.parallel([
        Animated.spring(checkScale, { toValue: 1, tension: 50, friction: 5, useNativeDriver: true }),
        Animated.timing(checkOpac,  { toValue: 1, duration: 300, useNativeDriver: true }),
      ]),
      // 2. Ticket sube
      Animated.parallel([
        Animated.spring(ticketSlide, { toValue: 0, tension: 55, friction: 10, useNativeDriver: true }),
        Animated.timing(ticketOpac,  { toValue: 1, duration: 400, useNativeDriver: true }),
      ]),
      // 3. Botones aparecen
      Animated.timing(btnsOpac, { toValue: 1, duration: 300, useNativeDriver: true }),
    ]).start();

    // Pulso continuo del check
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.06, duration: 1500, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1,    duration: 1500, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <SafeAreaView style={s.safe}>
      <StatusBar barStyle="light-content" backgroundColor={BG} />
      {/* Orbes de fondo */}
      <View style={s.glowTop} />
      <View style={s.glowBottom} />

      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>

        {/* Check animado */}
        <Animated.View style={[s.checkWrap, { opacity: checkOpac, transform: [{ scale: checkScale }] }]}>
          <Animated.View style={[s.checkRing, { transform: [{ scale: pulseAnim }] }]} />
          <View style={s.checkBadge}>
            <Text style={s.checkIcon}>✓</Text>
          </View>
        </Animated.View>

        <Animated.View style={{ opacity: checkOpac, alignItems: 'center', gap: 4, marginBottom: 28 }}>
          <Text style={s.successTitle}>¡Reserva confirmada!</Text>
          <Text style={s.successSub}>Tu comprobante digital está listo</Text>
        </Animated.View>

        {/* Ticket */}
        <Animated.View style={[s.ticket, { opacity: ticketOpac, transform: [{ translateY: ticketSlide }] }]}>

          <View style={s.zigzagTop} />

          <View style={s.ticketHeader}>
            <Text style={s.ticketAppName}>Stayly</Text>
            <Text style={s.ticketLabel}>COMPROBANTE DE RESERVA</Text>
          </View>

          <View style={s.divider} />

          <View style={s.ticketBody}>
            <TicketRow label="Hospedaje" value={params.hospedajeNombre ?? '—'} />
            <TicketRow label="Check-in"  value={params.checkin  ?? '—'} />
            <TicketRow label="Check-out" value={params.checkout ?? '—'} />
            <TicketRow label="Total"     value={`$${params.monto ?? '0'}`} accent />
            <TicketRow label="Tarjeta"   value={`**** **** **** ${params.ultimos4 ?? '????'}`} />
            <TicketRow label="Emitido"   value={fechaEmision} />
          </View>

          <View style={s.divider} />

          <View style={s.txBox}>
            <Text style={s.txLabel}>ID DE TRANSACCIÓN</Text>
            <Text style={s.txValue}>{params.transactionId ?? '—'}</Text>
          </View>

          <View style={s.divider} />

          <View style={s.qrContainer}>
            <Text style={s.qrLabel}>Escanea para validar</Text>
            <View style={s.qrWrapper}>
              <QRCode value={qrData} size={180} color="#000000" backgroundColor="#ffffff" />
            </View>
            <Text style={s.qrHint}>Presenta este código en el hospedaje</Text>
          </View>

          <View style={s.zigzagBottom} />
        </Animated.View>

        {/* Botones */}
        <Animated.View style={[s.btns, { opacity: btnsOpac }]}>
          <TouchableOpacity
            style={s.btnScan}
            onPress={() => router.push({ pathname: '/scanner', params: { expectedTx: params.transactionId } } as any)}
            activeOpacity={0.88}
          >
            <Text style={s.btnScanText}>📷  Escanear comprobante</Text>
            <View style={s.btnShine} />
          </TouchableOpacity>

          <TouchableOpacity style={s.btnHome} onPress={() => router.replace('/')} activeOpacity={0.88}>
            <Text style={s.btnHomeText}>Volver al inicio</Text>
          </TouchableOpacity>
        </Animated.View>

      </ScrollView>
    </SafeAreaView>
  );
}

function TicketRow({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <View style={s.ticketRow}>
      <Text style={s.ticketRowLabel}>{label}</Text>
      <Text style={[s.ticketRowValue, accent && { color: AQUA }]}>{value}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  safe:   { flex: 1, backgroundColor: BG },
  scroll: { paddingHorizontal: 20, paddingBottom: 48, alignItems: 'center' },

  // Orbes
  glowTop:    { position: 'absolute', top: -60, left: -60, width: 200, height: 200, borderRadius: 100, backgroundColor: AQUA, opacity: 0.04 },
  glowBottom: { position: 'absolute', bottom: 100, right: -60, width: 180, height: 180, borderRadius: 90, backgroundColor: AQUA2, opacity: 0.05 },

  // Check
  checkWrap:  { alignItems: 'center', justifyContent: 'center', width: 90, height: 90, marginTop: 32, marginBottom: 12 },
  checkRing:  { position: 'absolute', width: 90, height: 90, borderRadius: 45, borderWidth: 1.5, borderColor: AQUA, opacity: 0.4 },
  checkBadge: { width: 68, height: 68, borderRadius: 34, backgroundColor: AQUA, alignItems: 'center', justifyContent: 'center', shadowColor: AQUA, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.6, shadowRadius: 16, elevation: 12 },
  checkIcon:  { fontSize: 32, color: '#001a1a', fontWeight: '900' },

  successTitle: { fontSize: 22, fontWeight: '900', color: TEXT, letterSpacing: -0.5 },
  successSub:   { fontSize: 13, color: MUTED },

  // Ticket
  ticket:        { width: '100%', backgroundColor: CARD, borderWidth: 1, borderColor: BORDER, borderRadius: 20, overflow: 'hidden' },
  zigzagTop:     { height: 12, backgroundColor: BG, borderBottomWidth: 1, borderBottomColor: BORDER },
  zigzagBottom:  { height: 12, backgroundColor: BG, borderTopWidth: 1, borderTopColor: BORDER },
  ticketHeader:  { alignItems: 'center', paddingVertical: 20, gap: 4 },
  ticketAppName: { fontSize: 26, fontWeight: '900', color: TEXT, letterSpacing: -0.8 },
  ticketLabel:   { fontSize: 10, color: MUTED, letterSpacing: 2, textTransform: 'uppercase' },
  divider:       { borderTopWidth: 1, borderTopColor: BORDER, marginHorizontal: 20 },
  ticketBody:    { paddingHorizontal: 20, paddingVertical: 16, gap: 12 },
  ticketRow:     { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  ticketRowLabel:{ fontSize: 12, color: MUTED },
  ticketRowValue:{ fontSize: 13, color: TEXT, fontWeight: '700', maxWidth: '60%', textAlign: 'right' },
  txBox:         { paddingHorizontal: 20, paddingVertical: 14, alignItems: 'center', gap: 4 },
  txLabel:       { fontSize: 10, color: MUTED, letterSpacing: 1.5, textTransform: 'uppercase' },
  txValue:       { fontSize: 12, color: AQUA, fontWeight: '700' },
  qrContainer:   { alignItems: 'center', paddingVertical: 24, gap: 10 },
  qrLabel:       { fontSize: 11, color: MUTED, textTransform: 'uppercase', letterSpacing: 1.5 },
  qrWrapper:     { padding: 16, backgroundColor: '#ffffff', borderRadius: 16, shadowColor: AQUA, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.3, shadowRadius: 12, elevation: 6 },
  qrHint:        { fontSize: 11, color: MUTED, textAlign: 'center' },

  // Botones
  btns:        { width: '100%', gap: 12, marginTop: 24 },
  btnScan:     { backgroundColor: AQUA, borderRadius: 16, paddingVertical: 16, alignItems: 'center', overflow: 'hidden', shadowColor: AQUA, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 12, elevation: 8 },
  btnScanText: { color: '#001a1a', fontWeight: '900', fontSize: 15 },
  btnShine:    { position: 'absolute', top: 0, left: 0, right: 0, height: '50%', backgroundColor: 'rgba(255,255,255,0.12)', borderTopLeftRadius: 16, borderTopRightRadius: 16 },
  btnHome:     { backgroundColor: CARD, borderRadius: 16, paddingVertical: 16, alignItems: 'center', borderWidth: 1, borderColor: BORDER },
  btnHomeText: { color: MUTED, fontWeight: '600', fontSize: 15 },
});