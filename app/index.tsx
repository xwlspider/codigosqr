// app/index.tsx
import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  Image, SafeAreaView, StatusBar, Animated,
} from 'react-native';
import { router } from 'expo-router';
import { HOSPEDAJES, Hospedaje } from '../logic/data/hospedajes.data';
import { styles, AQUA, MUTED, TEXT } from '../components/index.styles';
import Perfil from '../app/perfil';

type Tab = 'hospedajes' | 'scanner' | 'perfil';

// ─── Card de hospedaje con animación de entrada ───────────────────────────────
function HospedajeCard({ item, index }: { item: Hospedaje; index: number }) {
  const fadeAnim  = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim,  { toValue: 1, duration: 400, delay: index * 100, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 400, delay: index * 100, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push(item.ruta as any)}
        activeOpacity={0.85}
      >
        <View style={styles.imageContainer}>
          <Image source={item.imagen} style={styles.image} resizeMode="cover" />
          <View style={styles.imageOverlay} />
          <View style={[styles.tag, { backgroundColor: item.tagColor }]}>
            <Text style={styles.tagText}>{item.tag}</Text>
          </View>
          <View style={styles.priceBadge}>
            <Text style={styles.priceText}>{item.precio}</Text>
            <Text style={styles.priceNight}>/noche</Text>
          </View>
        </View>
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
    </Animated.View>
  );
}

// ─── Tab: Hospedajes ──────────────────────────────────────────────────────────
function TabHospedajes() {
  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View>
          <Text style={styles.appName}>Stayly</Text>
          <Text style={styles.headerSub}>Encuentra tu hospedaje ideal</Text>
        </View>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>🏠</Text>
        </View>
      </View>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Hospedajes disponibles</Text>
        <View style={styles.sectionBadge}>
          <Text style={styles.sectionCount}>{HOSPEDAJES.length} lugares</Text>
        </View>
      </View>
      <View style={styles.list}>
        {HOSPEDAJES.map((item, i) => (
          <HospedajeCard key={item.id} item={item} index={i} />
        ))}
      </View>
    </ScrollView>
  );
}

// ─── Tab: Escanear ────────────────────────────────────────────────────────────
function TabScanner() {
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const opacAnim  = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, { toValue: 1, tension: 50, friction: 8, useNativeDriver: true }),
      Animated.timing(opacAnim,  { toValue: 1, duration: 400, useNativeDriver: true }),
    ]).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.12, duration: 1500, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1,    duration: 1500, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.centerTab}>
      <Animated.View style={{ opacity: opacAnim, transform: [{ scale: scaleAnim }], alignItems: 'center', gap: 24 }}>
        <View style={styles.scanIconWrap}>
          <Animated.View style={[styles.scanRing, { transform: [{ scale: pulseAnim }] }]} />
          <View style={styles.scanIconBadge}>
            <Text style={styles.scanIconText}>📷</Text>
          </View>
        </View>
        <View style={{ alignItems: 'center', gap: 8 }}>
          <Text style={styles.scanTitle}>Escanear comprobante</Text>
          <Text style={styles.scanSub}>Valida el QR de una reserva{'\n'}en cualquier momento</Text>
        </View>
        <View style={styles.viewfinderDeco}>
          <View style={[styles.cornerDeco, styles.cornerTL]} />
          <View style={[styles.cornerDeco, styles.cornerTR]} />
          <View style={[styles.cornerDeco, styles.cornerBL]} />
          <View style={[styles.cornerDeco, styles.cornerBR]} />
          <Text style={styles.viewfinderText}>QR</Text>
        </View>
        <TouchableOpacity style={styles.btnScan} onPress={() => router.push('/scanner' as any)} activeOpacity={0.88}>
          <Text style={styles.btnScanText}>Abrir escáner →</Text>
          <View style={styles.btnShine} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

// ─── Tab: Perfil ──────────────────────────────────────────────────────────────
function TabPerfil() {
  return <Perfil />;
}

// ─── Botón de tab ─────────────────────────────────────────────────────────────
function TabBtn({ icon, label, active, onPress }: {
  icon: string; label: string; active: boolean; onPress: () => void;
}) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.85, duration: 80, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, tension: 200, friction: 8, useNativeDriver: true }),
    ]).start();
    onPress();
  };
  return (
    <TouchableOpacity style={styles.tabBtn} onPress={handlePress} activeOpacity={1}>
      <Animated.View style={[styles.tabBtnInner, { transform: [{ scale: scaleAnim }] }]}>
        <Text style={styles.tabIcon}>{icon}</Text>
        <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>{label}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

// ─── Pantalla principal ───────────────────────────────────────────────────────
export default function Index() {
  const [activeTab, setActiveTab] = useState<Tab>('hospedajes');
  const tabIndicator = useRef(new Animated.Value(0)).current;

  const switchTab = (tab: Tab) => {
    const pos = { hospedajes: 0, scanner: 1, perfil: 2 };
    setActiveTab(tab);
    Animated.spring(tabIndicator, { toValue: pos[tab], tension: 70, friction: 10, useNativeDriver: true }).start();
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#010a09" />
      <View style={{ flex: 1 }}>
        {activeTab === 'hospedajes' && <TabHospedajes />}
        {activeTab === 'scanner'    && <TabScanner />}
        {activeTab === 'perfil'     && <TabPerfil />}
      </View>

      {/* Barra de tabs */}
      <View style={styles.tabBar}>
        <Animated.View style={[
          styles.tabIndicator,
          { transform: [{ translateX: tabIndicator.interpolate({ inputRange: [0, 1, 2], outputRange: [0, 110, 220] }) }] },
        ]} />
        <TabBtn icon="🏠" label="Hospedajes" active={activeTab === 'hospedajes'} onPress={() => switchTab('hospedajes')} />
        <TabBtn icon="📷" label="Escanear"   active={activeTab === 'scanner'}    onPress={() => switchTab('scanner')} />
        <TabBtn icon="👤" label="Perfil"     active={activeTab === 'perfil'}     onPress={() => switchTab('perfil')} />
      </View>
    </SafeAreaView>
  );
}