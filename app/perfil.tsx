// app/Perfil.tsx
import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, Animated,
} from 'react-native';
import { router } from 'expo-router';
import { supabase } from '../logic/supabase/supabase';

export default function Perfil() {
  const [nombre,   setNombre]   = useState('');
  const [apellido, setApellido] = useState('');
  const [email,    setEmail]    = useState('');
  const [celular,  setCelular]  = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();

    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setEmail(user.email ?? '');
        setNombre(user.user_metadata?.nombre    ?? '');
        setApellido(user.user_metadata?.apellido ?? '');
        setCelular(user.user_metadata?.celular   ?? '');
      }
    });
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace('/Login' as any);
  };

  const initial = nombre ? nombre[0].toUpperCase() : '?';

  return (
    <ScrollView
      style={s.scroll}
      contentContainerStyle={s.container}
      showsVerticalScrollIndicator={false}
    >
      <Animated.View style={{ opacity: fadeAnim, gap: 24 }}>

        {/* Avatar */}
        <View style={s.header}>
          <View style={s.avatarWrap}>
            <View style={s.avatarRing} />
            <View style={s.avatar}>
              <Text style={s.avatarText}>{initial}</Text>
            </View>
          </View>
          <Text style={s.nombre}>{nombre} {apellido}</Text>
          <Text style={s.email}>{email}</Text>
          <View style={s.memberBadge}>
            <Text style={s.memberText}>✦  Miembro Stayly</Text>
          </View>
        </View>

        {/* Info */}
        <View style={s.card}>
          <Text style={s.cardTitle}>Información personal</Text>
          <InfoRow icon="👤" label="Nombre"   value={nombre   || '—'} />
          <InfoRow icon="📋" label="Apellido" value={apellido || '—'} />
          <InfoRow icon="📱" label="Celular"  value={celular  || '—'} last />
        </View>

        <View style={s.card}>
          <Text style={s.cardTitle}>Cuenta</Text>
          <InfoRow icon="✉" label="Correo" value={email || '—'} last />
        </View>

        {/* Acciones */}
        <View style={s.acciones}>
          <TouchableOpacity
            style={s.btnScanner}
            onPress={() => router.push('/scanner' as any)}
            activeOpacity={0.88}
          >
            <Text style={s.btnScannerText}>📷  Escanear QR</Text>
          </TouchableOpacity>

          <TouchableOpacity style={s.btnLogout} onPress={handleLogout} activeOpacity={0.88}>
            <Text style={s.btnLogoutText}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>

      </Animated.View>
    </ScrollView>
  );
}

// ─── Fila de info ─────────────────────────────────────────────────────────────
function InfoRow({ icon, label, value, last }: {
  icon: string; label: string; value: string; last?: boolean;
}) {
  return (
    <View style={[s.infoRow, !last && s.infoRowBorder]}>
      <Text style={s.infoIcon}>{icon}</Text>
      <View style={{ flex: 1 }}>
        <Text style={s.infoLabel}>{label}</Text>
        <Text style={s.infoValue}>{value}</Text>
      </View>
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
  scroll:    { flex: 1, backgroundColor: BG },
  container: { paddingHorizontal: 20, paddingBottom: 32, paddingTop: 12, gap: 24 },

  // Header / Avatar
  header:      { alignItems: 'center', paddingVertical: 20, gap: 8 },
  avatarWrap:  { width: 100, height: 100, alignItems: 'center', justifyContent: 'center', marginBottom: 4 },
  avatarRing:  { position: 'absolute', width: 100, height: 100, borderRadius: 50, borderWidth: 1.5, borderColor: AQUA, opacity: 0.4 },
  avatar:      { width: 76, height: 76, borderRadius: 38, backgroundColor: AQUA, alignItems: 'center', justifyContent: 'center', shadowColor: AQUA, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 14, elevation: 10 },
  avatarText:  { fontSize: 32, fontWeight: '900', color: '#001a1a' },
  nombre:      { fontSize: 22, fontWeight: '900', color: TEXT, letterSpacing: -0.5 },
  email:       { fontSize: 13, color: MUTED },
  memberBadge: { backgroundColor: CARD, borderWidth: 1, borderColor: BORDER, paddingHorizontal: 14, paddingVertical: 5, borderRadius: 20, marginTop: 4 },
  memberText:  { fontSize: 11, color: AQUA2, fontWeight: '700', letterSpacing: 1 },

  // Card
  card:      { backgroundColor: CARD, borderRadius: 20, borderWidth: 1, borderColor: BORDER, overflow: 'hidden' },
  cardTitle: { fontSize: 11, color: MUTED, fontWeight: '800', letterSpacing: 2, textTransform: 'uppercase', paddingHorizontal: 16, paddingTop: 14, paddingBottom: 4 },

  // Fila
  infoRow:       { flexDirection: 'row', alignItems: 'center', gap: 14, paddingHorizontal: 16, paddingVertical: 14 },
  infoRowBorder: { borderBottomWidth: 1, borderBottomColor: BORDER },
  infoIcon:      { fontSize: 18, width: 28, textAlign: 'center' },
  infoLabel:     { fontSize: 10, color: MUTED, fontWeight: '700', letterSpacing: 1.5, textTransform: 'uppercase' },
  infoValue:     { fontSize: 15, color: TEXT, fontWeight: '600', marginTop: 2 },

  // Botones
  acciones:       { gap: 12 },
  btnScanner:     { backgroundColor: CARD, borderRadius: 16, paddingVertical: 16, alignItems: 'center', borderWidth: 1, borderColor: AQUA2 },
  btnScannerText: { color: AQUA, fontWeight: '700', fontSize: 15 },
  btnLogout:      { backgroundColor: '#1a0505', borderRadius: 16, paddingVertical: 16, alignItems: 'center', borderWidth: 1, borderColor: '#3a1010' },
  btnLogoutText:  { color: '#ef4444', fontWeight: '700', fontSize: 15 },
});