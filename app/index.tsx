import { router } from 'expo-router';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { HOSPEDAJES, Hospedaje } from '../logic/data/hospedajes.data';
import { styles } from '../components/index.styles';

// ─── Card ─────────────────────────────────────────────────────────────────────
function HospedajeCard({ item }: { item: Hospedaje }) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(item.ruta as any)}
      activeOpacity={0.85}
    >
      {/* Imagen */}
      <View style={styles.imageContainer}>
        <Image source={item.imagen} style={styles.image} resizeMode="cover" />
        <View style={[styles.tag, { backgroundColor: item.tagColor }]}>
          <Text style={styles.tagText}>{item.tag}</Text>
        </View>
        <View style={styles.priceBadge}>
          <Text style={styles.priceText}>{item.precio}</Text>
          <Text style={styles.priceNight}>/noche</Text>
        </View>
      </View>

      {/* Info */}
      <View style={styles.info}>
        <Text style={styles.nombre} numberOfLines={1}>{item.nombre}</Text>
        <View style={styles.ubicacionRow}>
          <Text style={styles.pin}>📍</Text>
          <Text style={styles.ubicacion} numberOfLines={1}>{item.ubicacion}</Text>
        </View>
        <Text style={styles.descripcion} numberOfLines={2}>{item.descripcion}</Text>
        <View style={styles.cta}>
          <Text style={styles.ctaText}>Ver hospedaje →</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

// ─── Pantalla ─────────────────────────────────────────────────────────────────
export default function Index() {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.appName}>Spyly</Text>
            <Text style={styles.headerSub}>Encuentra tu hospedaje ideal</Text>
          </View>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>🏠</Text>
          </View>
        </View>

        {/* Sección */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Hospedajes disponibles</Text>
          <Text style={styles.sectionCount}>{HOSPEDAJES.length} lugares</Text>
        </View>

        {/* Lista */}
        <View style={styles.list}>
          {HOSPEDAJES.map(item => (
            <HospedajeCard key={item.id} item={item} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}