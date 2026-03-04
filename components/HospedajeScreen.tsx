import { router } from 'expo-router';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  Linking,
  Alert,
} from 'react-native';

// ─── Tipos ────────────────────────────────────────────────────────────────────
export interface Servicio {
  icono: string;
  nombre: string;
}

export interface HospedajeDetalle {
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
}

// ─── Componente base ──────────────────────────────────────────────────────────
export default function HospedajeScreen({ data }: { data: HospedajeDetalle }) {

  const handleWhatsApp = () => {
    const numero = data.whatsapp ?? data.contacto.replace(/\D/g, '');
    const mensaje = encodeURIComponent(`Hola, estoy interesado en el hospedaje ${data.nombre} que vi en Spyly. ¿Tienen disponibilidad?`);
    const url = `https://wa.me/593${numero}?text=${mensaje}`;
    Linking.openURL(url).catch(() =>
      Alert.alert('Error', 'No se pudo abrir WhatsApp.')
    );
  };

  const handleLlamar = () => {
    Linking.openURL(`tel:${data.contacto}`).catch(() =>
      Alert.alert('Error', 'No se pudo realizar la llamada.')
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ── Imagen hero ── */}
        <View style={styles.heroContainer}>
          <Image source={data.imagen} style={styles.hero} resizeMode="cover" />

          {/* Overlay oscuro */}
          <View style={styles.heroOverlay} />

          {/* Botón volver */}
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Text style={styles.backText}>← Volver</Text>
          </TouchableOpacity>

          {/* Tag */}
          <View style={[styles.tag, { backgroundColor: data.tagColor }]}>
            <Text style={styles.tagText}>{data.tag}</Text>
          </View>

          {/* Nombre sobre imagen */}
          <View style={styles.heroInfo}>
            <Text style={styles.heroNombre}>{data.nombre}</Text>
            <View style={styles.heroUbicacionRow}>
              <Text style={styles.heroPin}>📍</Text>
              <Text style={styles.heroUbicacion}>{data.ubicacion}</Text>
            </View>
          </View>
        </View>

        {/* ── Contenido ── */}
        <View style={styles.content}>

          {/* Precio + habitaciones */}
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{data.precio}</Text>
              <Text style={styles.statLabel}>por noche</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{data.habitaciones}</Text>
              <Text style={styles.statLabel}>habitaciones</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{data.servicios.length}</Text>
              <Text style={styles.statLabel}>servicios</Text>
            </View>
          </View>

          {/* Descripción */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Sobre el hospedaje</Text>
            <Text style={styles.descripcion}>{data.descripcion}</Text>
          </View>

          {/* Servicios */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Servicios incluidos</Text>
            <View style={styles.serviciosGrid}>
              {data.servicios.map((s, i) => (
                <View key={i} style={styles.servicioChip}>
                  <Text style={styles.servicioIcono}>{s.icono}</Text>
                  <Text style={styles.servicioNombre}>{s.nombre}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Contacto */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contacto</Text>
            <View style={styles.contactoBox}>
              <Text style={styles.contactoIcono}>📞</Text>
              <Text style={styles.contactoNumero}>{data.contacto}</Text>
            </View>
          </View>

          {/* Botones de acción */}
          <View style={styles.botonesRow}>
            <TouchableOpacity
              style={styles.btnLlamar}
              onPress={handleLlamar}
              activeOpacity={0.85}
            >
              <Text style={styles.btnLlamarText}>📞 Llamar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnWhatsapp}
              onPress={handleWhatsApp}
              activeOpacity={0.85}
            >
              <Text style={styles.btnWhatsappText}>💬 WhatsApp</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Estilos ──────────────────────────────────────────────────────────────────
const BG     = '#0a0a0a';
const CARD   = '#141414';
const BORDER = '#222222';
const TEXT   = '#f5f5f5';
const MUTED  = '#737373';
const ACCENT = '#f97316';

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BG },
  scrollContent: { paddingBottom: 40 },

  // Hero
  heroContainer: {
    height: 280,
    position: 'relative',
  },
  hero: { width: '100%', height: '100%' },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  backBtn: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(0,0,0,0.55)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  backText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  tag: {
    position: 'absolute',
    top: 16,
    right: 16,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  tagText: { color: '#fff', fontSize: 11, fontWeight: '800', letterSpacing: 0.5 },
  heroInfo: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  heroNombre: {
    fontSize: 28,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: -0.8,
    marginBottom: 4,
  },
  heroUbicacionRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  heroPin: { fontSize: 13 },
  heroUbicacion: { fontSize: 13, color: 'rgba(255,255,255,0.8)' },

  // Contenido
  content: { paddingHorizontal: 20, paddingTop: 24, gap: 28 },

  // Stats
  statsRow: {
    flexDirection: 'row',
    backgroundColor: CARD,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: BORDER,
    paddingVertical: 18,
  },
  statBox: { flex: 1, alignItems: 'center', gap: 4 },
  statValue: { fontSize: 20, fontWeight: '900', color: TEXT },
  statLabel: { fontSize: 11, color: MUTED, textTransform: 'uppercase', letterSpacing: 0.5 },
  divider: { width: 1, backgroundColor: BORDER },

  // Sección
  section: { gap: 12 },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: TEXT,
    letterSpacing: -0.3,
  },
  descripcion: {
    fontSize: 14,
    color: '#a3a3a3',
    lineHeight: 22,
  },

  // Servicios
  serviciosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  servicioChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: CARD,
    borderWidth: 1,
    borderColor: BORDER,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  servicioIcono: { fontSize: 15 },
  servicioNombre: { fontSize: 13, color: TEXT, fontWeight: '600' },

  // Contacto
  contactoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: CARD,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 16,
    borderRadius: 14,
  },
  contactoIcono: { fontSize: 18 },
  contactoNumero: { fontSize: 16, color: TEXT, fontWeight: '700' },

  // Botones
  botonesRow: { flexDirection: 'row', gap: 12 },
  btnLlamar: {
    flex: 1,
    backgroundColor: CARD,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
  },
  btnLlamarText: { color: TEXT, fontWeight: '700', fontSize: 15 },
  btnWhatsapp: {
    flex: 1,
    backgroundColor: '#22c55e',
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
  },
  btnWhatsappText: { color: '#fff', fontWeight: '800', fontSize: 15 },
});