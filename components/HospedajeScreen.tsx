// components/HospedajeScreen.tsx
import React, { useRef, useEffect } from 'react';
import { router } from 'expo-router';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Image, SafeAreaView, StatusBar, Linking, Alert, Animated,
} from 'react-native';

export interface Servicio { icono: string; nombre: string; }

export interface HospedajeDetalle {
  id: number;
  nombre: string;
  ubicacion: string;
  precio: string;
  descripcion: string;
  imagen: any;
  tag: string;
  tagColor: string;
  habitaciones: number;
  servicios: Servicio[];
  contacto: string;
  whatsapp?: string;
  onReservar?: () => void;
}

export default function HospedajeScreen({ data }: { data: HospedajeDetalle }) {
  // Animaciones de entrada
  const heroScale   = useRef(new Animated.Value(1.08)).current;
  const contentSlide= useRef(new Animated.Value(50)).current;
  const contentOpac = useRef(new Animated.Value(0)).current;
  const btnScale    = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(heroScale,    { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(contentSlide, { toValue: 0, duration: 500, delay: 200, useNativeDriver: true }),
      Animated.timing(contentOpac,  { toValue: 1, duration: 500, delay: 200, useNativeDriver: true }),
    ]).start();
  }, []);

  const handleWhatsApp = () => {
    const numero  = data.whatsapp ?? data.contacto.replace(/\D/g, '');
    const mensaje = encodeURIComponent(`Hola, estoy interesado en el hospedaje ${data.nombre} que vi en Stayly. ¿Tienen disponibilidad?`);
    Linking.openURL(`https://wa.me/593${numero}?text=${mensaje}`)
      .catch(() => Alert.alert('Error', 'No se pudo abrir WhatsApp.'));
  };

  const handleLlamar = () => {
    Linking.openURL(`tel:${data.contacto}`)
      .catch(() => Alert.alert('Error', 'No se pudo realizar la llamada.'));
  };

  const handleReservarPressIn  = () => Animated.spring(btnScale, { toValue: 0.96, useNativeDriver: true }).start();
  const handleReservarPressOut = () => Animated.spring(btnScale, { toValue: 1,    useNativeDriver: true }).start();

  return (
    <SafeAreaView style={s.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#010a09" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scrollContent}>

        {/* ── Hero con zoom-in ── */}
        <View style={s.heroContainer}>
          <Animated.Image
            source={data.imagen}
            style={[s.hero, { transform: [{ scale: heroScale }] }]}
            resizeMode="cover"
          />
          {/* Gradiente simulado */}
          <View style={s.heroGradient} />
          <View style={s.heroOverlay} />

          {/* Volver */}
          <TouchableOpacity style={s.backBtn} onPress={() => router.back()}>
            <Text style={s.backText}>← Volver</Text>
          </TouchableOpacity>

          {/* Tag */}
          <View style={[s.tag, { backgroundColor: data.tagColor }]}>
            <Text style={s.tagText}>{data.tag}</Text>
          </View>

          {/* Info sobre la imagen */}
          <View style={s.heroInfo}>
            <Text style={s.heroNombre}>{data.nombre}</Text>
            <View style={s.heroUbicacionRow}>
              <Text style={s.heroPin}>📍</Text>
              <Text style={s.heroUbicacion}>{data.ubicacion}</Text>
            </View>
          </View>
        </View>

        {/* ── Contenido animado ── */}
        <Animated.View style={[s.content, { opacity: contentOpac, transform: [{ translateY: contentSlide }] }]}>

          {/* Stats */}
          <View style={s.statsRow}>
            <StatBox value={data.precio}              label="por noche"    accent />
            <View style={s.statDivider} />
            <StatBox value={String(data.habitaciones)} label="habitaciones" />
            <View style={s.statDivider} />
            <StatBox value={String(data.servicios.length)} label="servicios" />
          </View>

          {/* Descripción */}
          <Section title="Sobre el hospedaje">
            <Text style={s.descripcion}>{data.descripcion}</Text>
          </Section>

          {/* Servicios */}
          <Section title="Servicios incluidos">
            <View style={s.serviciosGrid}>
              {data.servicios.map((sv, i) => (
                <View key={i} style={s.servicioChip}>
                  <Text style={s.servicioIcono}>{sv.icono}</Text>
                  <Text style={s.servicioNombre}>{sv.nombre}</Text>
                </View>
              ))}
            </View>
          </Section>

          {/* Contacto */}
          <Section title="Contacto">
            <View style={s.contactoBox}>
              <Text style={s.contactoIcono}>📞</Text>
              <Text style={s.contactoNumero}>{data.contacto}</Text>
            </View>
          </Section>

          {/* Llamar + WhatsApp */}
          <View style={s.botonesRow}>
            <TouchableOpacity style={s.btnLlamar} onPress={handleLlamar} activeOpacity={0.85}>
              <Text style={s.btnLlamarText}>📞  Llamar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.btnWhatsapp} onPress={handleWhatsApp} activeOpacity={0.85}>
              <Text style={s.btnWhatsappText}>💬  WhatsApp</Text>
            </TouchableOpacity>
          </View>

          {/* Reservar */}
          <Animated.View style={{ transform: [{ scale: btnScale }] }}>
            <TouchableOpacity
              style={s.btnReservar}
              onPress={data.onReservar}
              onPressIn={handleReservarPressIn}
              onPressOut={handleReservarPressOut}
              activeOpacity={1}
            >
              <Text style={s.btnReservarText}>Reservar ahora →</Text>
              <View style={s.btnReservarShine} />
            </TouchableOpacity>
          </Animated.View>

        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function StatBox({ value, label, accent }: { value: string; label: string; accent?: boolean }) {
  return (
    <View style={s.statBox}>
      <Text style={[s.statValue, accent && s.statValueAccent]}>{value}</Text>
      <Text style={s.statLabel}>{label}</Text>
    </View>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={s.section}>
      <View style={s.sectionTitleRow}>
        <View style={s.sectionAccentBar} />
        <Text style={s.sectionTitle}>{title}</Text>
      </View>
      {children}
    </View>
  );
}

// ─── Estilos ──────────────────────────────────────────────────────────────────
const BG    = '#010a09';
const CARD  = '#0d1f1d';
const BORDER= '#0a3530';
const TEXT  = '#e0fffc';
const MUTED = '#3a8a80';
const AQUA  = '#00e5cc';
const AQUA2 = '#00b4a0';

const s = StyleSheet.create({
  safe:          { flex: 1, backgroundColor: BG },
  scrollContent: { paddingBottom: 48 },

  // Hero
  heroContainer: { height: 300, position: 'relative', overflow: 'hidden' },
  hero:          { width: '100%', height: '100%' },
  heroGradient:  { position: 'absolute', bottom: 0, left: 0, right: 0, height: 160, backgroundColor: 'transparent',
    // gradiente simulado con múltiples capas
  },
  heroOverlay:   { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(1,10,9,0.55)' },
  backBtn:       { position: 'absolute', top: 16, left: 16, backgroundColor: 'rgba(1,10,9,0.65)', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(0,229,204,0.2)' },
  backText:      { color: AQUA, fontWeight: '700', fontSize: 13 },
  tag:           { position: 'absolute', top: 16, right: 16, paddingHorizontal: 12, paddingVertical: 5, borderRadius: 20 },
  tagText:       { color: '#fff', fontSize: 11, fontWeight: '800', letterSpacing: 0.5 },
  heroInfo:      { position: 'absolute', bottom: 20, left: 20, right: 20 },
  heroNombre:    { fontSize: 30, fontWeight: '900', color: '#fff', letterSpacing: -0.8, marginBottom: 6 },
  heroUbicacionRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  heroPin:       { fontSize: 13 },
  heroUbicacion: { fontSize: 13, color: 'rgba(255,255,255,0.75)' },

  // Contenido
  content: { paddingHorizontal: 20, paddingTop: 24, gap: 28 },

  // Stats
  statsRow:       { flexDirection: 'row', backgroundColor: CARD, borderRadius: 18, borderWidth: 1, borderColor: BORDER, paddingVertical: 20 },
  statBox:        { flex: 1, alignItems: 'center', gap: 4 },
  statValue:      { fontSize: 20, fontWeight: '900', color: TEXT },
  statValueAccent:{ color: AQUA },
  statLabel:      { fontSize: 10, color: MUTED, textTransform: 'uppercase', letterSpacing: 0.8 },
  statDivider:    { width: 1, backgroundColor: BORDER },

  // Sección
  section:         { gap: 14 },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  sectionAccentBar:{ width: 3, height: 16, backgroundColor: AQUA, borderRadius: 2 },
  sectionTitle:    { fontSize: 15, fontWeight: '800', color: TEXT, letterSpacing: -0.3 },
  descripcion:     { fontSize: 14, color: '#5a9a94', lineHeight: 22 },

  // Servicios
  serviciosGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  servicioChip:  { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: CARD, borderWidth: 1, borderColor: BORDER, paddingHorizontal: 12, paddingVertical: 9, borderRadius: 12 },
  servicioIcono: { fontSize: 15 },
  servicioNombre:{ fontSize: 13, color: TEXT, fontWeight: '600' },

  // Contacto
  contactoBox:    { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: CARD, borderWidth: 1, borderColor: BORDER, padding: 16, borderRadius: 16 },
  contactoIcono:  { fontSize: 20 },
  contactoNumero: { fontSize: 16, color: TEXT, fontWeight: '700' },

  // Botones secundarios
  botonesRow:      { flexDirection: 'row', gap: 12 },
  btnLlamar:       { flex: 1, backgroundColor: CARD, borderWidth: 1, borderColor: BORDER, borderRadius: 14, paddingVertical: 15, alignItems: 'center' },
  btnLlamarText:   { color: TEXT, fontWeight: '700', fontSize: 15 },
  btnWhatsapp:     { flex: 1, backgroundColor: '#064d2a', borderWidth: 1, borderColor: '#0a7a40', borderRadius: 14, paddingVertical: 15, alignItems: 'center' },
  btnWhatsappText: { color: '#22c55e', fontWeight: '800', fontSize: 15 },

  // Botón reservar
  btnReservar:      { borderRadius: 16, overflow: 'hidden', backgroundColor: AQUA, shadowColor: AQUA, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 14, elevation: 10, paddingVertical: 17, alignItems: 'center' },
  btnReservarText:  { color: '#001a1a', fontWeight: '900', fontSize: 17, letterSpacing: 0.3 },
  btnReservarShine: { position: 'absolute', top: 0, left: 0, right: 0, height: '50%', backgroundColor: 'rgba(255,255,255,0.15)', borderTopLeftRadius: 16, borderTopRightRadius: 16 },
});