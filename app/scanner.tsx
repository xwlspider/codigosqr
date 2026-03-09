// app/scanner.tsx
import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, StatusBar,
  TouchableOpacity, Animated,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { supabase } from '../logic/supabase/supabase';

const BG    = '#010a09';
const CARD  = '#0d1f1d';
const BORDER= '#0a3530';
const TEXT  = '#e0fffc';
const MUTED = '#3a8a80';
const AQUA  = '#00e5cc';
const GREEN = '#22c55e';
const RED   = '#ef4444';
const YELLOW= '#eab308';

type ScanEstado = 'idle' | 'loading' | 'valido' | 'invalido' | 'ya_usado';

// Color del visor según estado
const visorColors: Record<ScanEstado, string> = {
  idle:     'rgba(0,229,204,0.08)',
  loading:  'rgba(0,229,204,0.12)',
  valido:   'rgba(34,197,94,0.18)',
  invalido: 'rgba(239,68,68,0.18)',
  ya_usado: 'rgba(234,179,8,0.18)',
};

const cornerColors: Record<ScanEstado, string> = {
  idle:     AQUA,
  loading:  AQUA,
  valido:   GREEN,
  invalido: RED,
  ya_usado: YELLOW,
};

export default function ScannerScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned,    setScanned]    = useState(false);
  const [estado,     setEstado]     = useState<ScanEstado>('idle');
  const [reservaInfo, setReservaInfo] = useState<{
    hospedajeNombre: string; checkin: string; checkout: string; monto: string;
  } | null>(null);

  // Animaciones
  const resultSlide = useRef(new Animated.Value(100)).current;
  const resultOpac  = useRef(new Animated.Value(0)).current;
  const scanLine    = useRef(new Animated.Value(0)).current;
  const headerOpac  = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(headerOpac, { toValue: 1, duration: 500, useNativeDriver: true }).start();

    // Línea de escaneo animada (solo en idle)
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanLine, { toValue: 1, duration: 1800, useNativeDriver: true }),
        Animated.timing(scanLine, { toValue: 0, duration: 1800, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const mostrarResultado = () => {
    Animated.parallel([
      Animated.spring(resultSlide, { toValue: 0, tension: 60, friction: 10, useNativeDriver: true }),
      Animated.timing(resultOpac,  { toValue: 1, duration: 300, useNativeDriver: true }),
    ]).start();
  };

  const ocultarResultado = () => {
    Animated.parallel([
      Animated.timing(resultSlide, { toValue: 100, duration: 200, useNativeDriver: true }),
      Animated.timing(resultOpac,  { toValue: 0, duration: 200, useNativeDriver: true }),
    ]).start();
  };

  const validarQR = async (data: string) => {
    setScanned(true);
    setEstado('loading');
    try {
      let parsed: { tx: string; hotel: string; checkin: string; checkout: string; monto: string };
      try { parsed = JSON.parse(data); }
      catch {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        setEstado('invalido'); mostrarResultado(); return;
      }
      if (!parsed.tx) {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        setEstado('invalido'); mostrarResultado(); return;
      }
      const { data: reserva, error } = await supabase
        .from('reservas')
        .select('id, hospedaje_nombre, fecha_checkin, fecha_checkout, monto')
        .eq('transaction_id', parsed.tx)
        .single();

      if (error || !reserva) {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        setEstado('invalido'); mostrarResultado(); return;
      }
      const { data: scansAnteriores } = await supabase
        .from('qr_scans').select('id').eq('reserva_id', reserva.id);

      if (scansAnteriores && scansAnteriores.length > 0) {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        setEstado('ya_usado');
      } else {
        await supabase.from('qr_scans').insert({ reserva_id: reserva.id, resultado: 'valido' });
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        setEstado('valido');
      }
      setReservaInfo({
        hospedajeNombre: reserva.hospedaje_nombre,
        checkin: reserva.fecha_checkin,
        checkout: reserva.fecha_checkout,
        monto: String(reserva.monto),
      });
      mostrarResultado();
    } catch {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      setEstado('invalido'); mostrarResultado();
    }
  };

  const reiniciar = () => {
    ocultarResultado();
    setTimeout(() => {
      setScanned(false);
      setEstado('idle');
      setReservaInfo(null);
    }, 220);
  };

  if (!permission) {
    return (
      <SafeAreaView style={s.safe}>
        <View style={s.center}><Text style={s.mutedText}>Cargando cámara...</Text></View>
      </SafeAreaView>
    );
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={s.safe}>
        <StatusBar barStyle="light-content" backgroundColor={BG} />
        <View style={s.center}>
          <View style={s.permBadge}><Text style={s.permBadgeIcon}>📷</Text></View>
          <Text style={s.permTitle}>Acceso a cámara requerido</Text>
          <Text style={s.permSub}>Necesitamos la cámara para{'\n'}escanear el comprobante QR</Text>
          <TouchableOpacity style={s.btnPermiso} onPress={requestPermission} activeOpacity={0.88}>
            <Text style={s.btnPermisoText}>Dar permiso</Text>
            <View style={s.btnShine} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.back()} style={s.btnVolver}>
            <Text style={s.btnVolverText}>← Volver</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const cornerColor = cornerColors[estado];

  return (
    <SafeAreaView style={s.safe}>
      <StatusBar barStyle="light-content" backgroundColor={BG} />

      <CameraView
        style={StyleSheet.absoluteFillObject}
        onBarcodeScanned={scanned ? undefined : ({ data }) => validarQR(data)}
        barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
      />

      {/* Overlay */}
      <View style={s.overlay}>

        {/* Header */}
        <Animated.View style={[s.header, { opacity: headerOpac }]}>
          <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
            <Text style={s.backText}>← Volver</Text>
          </TouchableOpacity>
          <Text style={s.title}>Escanear QR</Text>
          <Text style={s.subtitle}>Apunta al código del comprobante</Text>
        </Animated.View>

        {/* Visor */}
        <View style={s.viewfinderWrap}>
          <View style={[s.viewfinder, { backgroundColor: visorColors[estado] }]}>
            {/* Esquinas con color dinámico */}
            <View style={[s.corner, s.cTL, { borderColor: cornerColor }]} />
            <View style={[s.corner, s.cTR, { borderColor: cornerColor }]} />
            <View style={[s.corner, s.cBL, { borderColor: cornerColor }]} />
            <View style={[s.corner, s.cBR, { borderColor: cornerColor }]} />

            {/* Línea de escaneo (solo idle) */}
            {estado === 'idle' && (
              <Animated.View style={[s.scanLine, {
                transform: [{ translateY: scanLine.interpolate({ inputRange: [0, 1], outputRange: [-100, 100] }) }],
              }]} />
            )}

            {/* Estado en el centro */}
            {estado === 'loading' && (
              <View style={s.estadoCenter}>
                <Text style={s.estadoEmoji}>⏳</Text>
                <Text style={[s.estadoMsg, { color: AQUA }]}>Validando...</Text>
              </View>
            )}
            {estado === 'valido' && (
              <Text style={[s.estadoGrande, { color: GREEN }]}>✓</Text>
            )}
            {estado === 'invalido' && (
              <Text style={[s.estadoGrande, { color: RED }]}>✗</Text>
            )}
            {estado === 'ya_usado' && (
              <Text style={[s.estadoGrande, { color: YELLOW }]}>⚠</Text>
            )}
          </View>

          {/* Hint debajo del visor */}
          <Text style={[s.hint, estado !== 'idle' && { color: cornerColor }]}>
            {estado === 'idle'     && 'Centra el código QR en el recuadro'}
            {estado === 'loading'  && 'Verificando comprobante...'}
            {estado === 'valido'   && '✓ Comprobante válido'}
            {estado === 'invalido' && '✗ Código no válido'}
            {estado === 'ya_usado' && '⚠ Este QR ya fue utilizado'}
          </Text>
        </View>

        {/* Resultado */}
        <Animated.View style={[s.resultCard, { opacity: resultOpac, transform: [{ translateY: resultSlide }] }]}>
          {reservaInfo && (
            <View style={s.reservaInfo}>
              <View style={[s.reservaEstadoBadge, {
                backgroundColor: estado === 'valido' ? 'rgba(34,197,94,0.12)' : estado === 'ya_usado' ? 'rgba(234,179,8,0.12)' : 'rgba(239,68,68,0.12)',
                borderColor: cornerColor,
              }]}>
                <Text style={[s.reservaEstadoText, { color: cornerColor }]}>
                  {estado === 'valido' ? '✓ Válido' : estado === 'ya_usado' ? '⚠ Ya usado' : '✗ Inválido'}
                </Text>
              </View>
              <Text style={s.reservaNombre}>{reservaInfo.hospedajeNombre}</Text>
              <View style={s.reservaRow}>
                <DatoBox label="Check-in"  value={reservaInfo.checkin} />
                <DatoBox label="Check-out" value={reservaInfo.checkout} />
                <DatoBox label="Total"     value={`$${reservaInfo.monto}`} accent />
              </View>
            </View>
          )}
          {estado === 'invalido' && !reservaInfo && (
            <Text style={s.errorMsg}>Este código no está registrado en el sistema.</Text>
          )}
          <TouchableOpacity style={s.btnReiniciar} onPress={reiniciar} activeOpacity={0.88}>
            <Text style={s.btnReinText}>Escanear otro →</Text>
            <View style={s.btnShine} />
          </TouchableOpacity>
        </Animated.View>

      </View>
    </SafeAreaView>
  );
}

function DatoBox({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <View style={s.datoBox}>
      <Text style={s.datoLabel}>{label}</Text>
      <Text style={[s.datoValue, accent && { color: AQUA }]}>{value}</Text>
    </View>
  );
}

const CW = 22; const CB = 3;

const s = StyleSheet.create({
  safe:    { flex: 1, backgroundColor: BG },
  center:  { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16, paddingHorizontal: 32 },
  overlay: { flex: 1, backgroundColor: 'rgba(1,10,9,0.6)', justifyContent: 'space-between', paddingBottom: 28 },

  // Header
  header:   { paddingTop: 16, paddingHorizontal: 20, gap: 4 },
  backBtn:  { alignSelf: 'flex-start', marginBottom: 8, backgroundColor: 'rgba(0,229,204,0.1)', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(0,229,204,0.2)' },
  backText: { color: AQUA, fontWeight: '700', fontSize: 13 },
  title:    { fontSize: 24, fontWeight: '900', color: TEXT, letterSpacing: -0.5 },
  subtitle: { fontSize: 13, color: MUTED },

  // Visor
  viewfinderWrap: { alignItems: 'center', gap: 16 },
  viewfinder:     { width: 240, height: 240, borderRadius: 16, justifyContent: 'center', alignItems: 'center', overflow: 'hidden' },
  corner:         { position: 'absolute', width: CW, height: CW },
  cTL: { top: 0, left: 0, borderTopWidth: CB, borderLeftWidth: CB, borderTopLeftRadius: 6 },
  cTR: { top: 0, right: 0, borderTopWidth: CB, borderRightWidth: CB, borderTopRightRadius: 6 },
  cBL: { bottom: 0, left: 0, borderBottomWidth: CB, borderLeftWidth: CB, borderBottomLeftRadius: 6 },
  cBR: { bottom: 0, right: 0, borderBottomWidth: CB, borderRightWidth: CB, borderBottomRightRadius: 6 },
  scanLine:    { position: 'absolute', left: 0, right: 0, height: 2, backgroundColor: AQUA, opacity: 0.7, shadowColor: AQUA, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 1, shadowRadius: 6 },
  estadoCenter:{ alignItems: 'center', gap: 6 },
  estadoEmoji: { fontSize: 36 },
  estadoMsg:   { fontWeight: '700', fontSize: 14 },
  estadoGrande:{ fontSize: 72, fontWeight: '900' },
  hint:        { color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: '600', textAlign: 'center' },

  // Resultado
  resultCard:       { marginHorizontal: 16, backgroundColor: CARD, borderRadius: 22, borderWidth: 1, borderColor: BORDER, padding: 20, gap: 14 },
  reservaInfo:      { gap: 10 },
  reservaEstadoBadge:{ alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 20, borderWidth: 1 },
  reservaEstadoText: { fontSize: 12, fontWeight: '800', letterSpacing: 0.5 },
  reservaNombre:    { fontSize: 17, fontWeight: '900', color: TEXT, letterSpacing: -0.3 },
  reservaRow:       { flexDirection: 'row', justifyContent: 'space-between' },
  datoBox:          { gap: 2 },
  datoLabel:        { fontSize: 9, color: MUTED, textTransform: 'uppercase', letterSpacing: 1 },
  datoValue:        { fontSize: 13, color: TEXT, fontWeight: '700' },
  errorMsg:         { fontSize: 14, color: RED, textAlign: 'center' },
  btnReiniciar:     { backgroundColor: AQUA, borderRadius: 14, paddingVertical: 14, alignItems: 'center', overflow: 'hidden', shadowColor: AQUA, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.35, shadowRadius: 10, elevation: 6 },
  btnReinText:      { color: '#001a1a', fontWeight: '900', fontSize: 15 },
  btnShine:         { position: 'absolute', top: 0, left: 0, right: 0, height: '50%', backgroundColor: 'rgba(255,255,255,0.12)', borderTopLeftRadius: 14, borderTopRightRadius: 14 },

  // Permisos
  permBadge:     { width: 80, height: 80, borderRadius: 24, backgroundColor: AQUA, alignItems: 'center', justifyContent: 'center', shadowColor: AQUA, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 14, elevation: 10 },
  permBadgeIcon: { fontSize: 36 },
  permTitle:     { fontSize: 20, fontWeight: '800', color: TEXT, textAlign: 'center' },
  permSub:       { fontSize: 14, color: MUTED, textAlign: 'center', lineHeight: 22 },
  btnPermiso:    { backgroundColor: AQUA, borderRadius: 16, paddingVertical: 14, paddingHorizontal: 36, overflow: 'hidden', shadowColor: AQUA, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 12, elevation: 8 },
  btnPermisoText:{ color: '#001a1a', fontWeight: '900', fontSize: 15 },
  btnVolver:     { paddingVertical: 10 },
  btnVolverText: { color: MUTED, fontSize: 14, fontWeight: '600' },
  mutedText:     { color: MUTED, fontSize: 14 },
});