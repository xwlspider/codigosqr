import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, Animated } from 'react-native';
import { CameraView } from 'expo-camera';
import { router } from 'expo-router';
import { useScanner, ScanEstado } from '../logic/scanner/useScanner';
import { s, BG, AQUA, GREEN, RED, YELLOW, TEXT } from '../components/scanner.styles';

const visorColors: Record<ScanEstado, string> = {
  idle: 'rgba(0,229,204,0.08)', loading: 'rgba(0,229,204,0.12)',
  valido: 'rgba(34,197,94,0.18)', invalido: 'rgba(239,68,68,0.18)', ya_usado: 'rgba(234,179,8,0.18)',
};

const cornerColors: Record<ScanEstado, string> = {
  idle: AQUA, loading: AQUA, valido: GREEN, invalido: RED, ya_usado: YELLOW,
};

export default function ScannerScreen() {
  const { 
    permission, requestPermission, scanned, estado, reservaInfo, 
    animations, validarQR, reiniciar 
  } = useScanner();

  if (!permission) return <SafeAreaView style={s.safe}><View style={s.center}><Text style={s.mutedText}>Cargando cámara...</Text></View></SafeAreaView>;

  if (!permission.granted) {
    return (
      <SafeAreaView style={s.safe}>
        <StatusBar barStyle="light-content" backgroundColor={BG} />
        <View style={s.center}>
          <View style={s.permBadge}><Text style={s.permBadgeIcon}>📷</Text></View>
          <Text style={s.permTitle}>Acceso a cámara requerido</Text>
          <TouchableOpacity style={s.btnPermiso} onPress={requestPermission}><Text style={s.btnPermisoText}>Dar permiso</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => router.back()} style={s.btnVolver}><Text style={s.btnVolverText}>← Volver</Text></TouchableOpacity>
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

      <View style={s.overlay}>
        <Animated.View style={[s.header, { opacity: animations.headerOpac }]}>
          <TouchableOpacity onPress={() => router.back()} style={s.backBtn}><Text style={s.backText}>← Volver</Text></TouchableOpacity>
          <Text style={s.title}>Escanear QR</Text>
        </Animated.View>

        <View style={s.viewfinderWrap}>
          <View style={[s.viewfinder, { backgroundColor: visorColors[estado] }]}>
            <View style={[s.corner, s.cTL, { borderColor: cornerColor }]} />
            <View style={[s.corner, s.cTR, { borderColor: cornerColor }]} />
            <View style={[s.corner, s.cBL, { borderColor: cornerColor }]} />
            <View style={[s.corner, s.cBR, { borderColor: cornerColor }]} />
            {estado === 'idle' && (
              <Animated.View style={[s.scanLine, { transform: [{ translateY: animations.scanLine.interpolate({ inputRange: [0, 1], outputRange: [-100, 100] }) }] }]} />
            )}
            {estado === 'valido' && <Text style={[s.estadoGrande, { color: GREEN }]}>✓</Text>}
            {estado === 'invalido' && <Text style={[s.estadoGrande, { color: RED }]}>✗</Text>}
          </View>
          <Text style={[s.hint, estado !== 'idle' && { color: cornerColor }]}>
  {estado === 'idle' && 'Centra el código QR en el recuadro'}
  {estado === 'loading' && 'Verificando comprobante...'}
  {estado === 'invalido' && 'Código no reconocido por Stayly'}
  {estado === 'ya_usado' && 'Esta reserva ya fue escaneada'}
</Text>
        </View>

        <Animated.View style={[s.resultCard, { opacity: animations.resultOpac, transform: [{ translateY: animations.resultSlide }] }]}>
          {reservaInfo && (
            <View style={s.reservaInfo}>
              <Text style={s.reservaNombre}>{reservaInfo.hospedajeNombre}</Text>
              <View style={s.reservaRow}>
                <DatoBox label="Check-in" value={reservaInfo.checkin} />
                <DatoBox label="Total" value={`$${reservaInfo.monto}`} accent />
              </View>
            </View>
          )}
          <TouchableOpacity style={s.btnReiniciar} onPress={reiniciar}><Text style={s.btnReinText}>Escanear otro →</Text></TouchableOpacity>
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