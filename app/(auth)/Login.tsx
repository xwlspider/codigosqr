import React, { useRef, useEffect } from 'react';
import {
  SafeAreaView, StyleSheet, Text, View, Animated,
} from 'react-native';
import { router } from 'expo-router';
import LoginForm from '../../components/LoginForm';
import { useLogin } from '../../logic/Session/useLogin';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default function LoginScreen() {
  const { form, update, loading, handleLogin } = useLogin({
    onSuccess: () => router.replace('/'),
  });

  // Animaciones del header
  const logoScale  = useRef(new Animated.Value(0.5)).current;
  const logoOpacity= useRef(new Animated.Value(0)).current;
  const titleSlide = useRef(new Animated.Value(-20)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;

  // Pulso continuo del logo
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Entrada
    Animated.parallel([
      Animated.spring(logoScale,   { toValue: 1, tension: 50, friction: 7, useNativeDriver: true }),
      Animated.timing(logoOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(titleSlide,  { toValue: 0, duration: 600, delay: 200, useNativeDriver: true }),
      Animated.timing(titleOpacity,{ toValue: 1, duration: 600, delay: 200, useNativeDriver: true }),
    ]).start();

    // Pulso infinito del logo
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1.08, duration: 1800, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1,    duration: 1800, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <SafeAreaView style={s.safe}>
    {/* Capas de fondo - Mantener aquí pero asegurar que no bloqueen */}
    <View pointerEvents="none" style={s.bgTop} />
    <View pointerEvents="none" style={s.bgOrb1} />
    <View pointerEvents="none" style={s.bgOrb2} />
    <View pointerEvents="none" style={s.bgGrid} />

      <KeyboardAwareScrollView
        contentContainerStyle={s.container}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid={true}
        extraScrollHeight={20}
        showsVerticalScrollIndicator={false}
      >

          {/* Header animado */}
          <View style={s.header}>

            {/* Logo con anillo */}
            <Animated.View style={[s.logoWrap, { opacity: logoOpacity, transform: [{ scale: logoScale }] }]}>
              <Animated.View style={[s.logoRing, { transform: [{ scale: pulse }] }]} />
              <View style={s.logoBadge}>
                <Text style={s.logoText}>S</Text>
              </View>
            </Animated.View>

            {/* Título */}
            <Animated.View style={{ opacity: titleOpacity, transform: [{ translateY: titleSlide }] }}>
              <Text style={s.appName}>Stayly</Text>
              <Text style={s.title}>Iniciar sesión</Text>
              <Text style={s.subtitle}>Bienvenido de vuelta</Text>
            </Animated.View>

          </View>

          {/* Formulario */}
          <LoginForm form={form} update={update} loading={loading} onSubmit={handleLogin} />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const AQUA  = '#00e5cc';
const AQUA2 = '#00b4a0';
const BG    = '#010a09';
const TEXT  = '#e0fffc';
const MUTED = '#3a8a80';

const s = StyleSheet.create({
  safe:  { flex: 1, backgroundColor: BG },
  flex:  { flex: 1 },

  // Fondo decorativo
  bgTop:  { position: 'absolute', top: 0, left: 0, right: 0, height: 300, backgroundColor: '#001a18', borderBottomLeftRadius: 60, borderBottomRightRadius: 60 },
  bgOrb1: { position: 'absolute', top: -60, left: -60, width: 200, height: 200, borderRadius: 100, backgroundColor: AQUA, opacity: 0.05 },
  bgOrb2: { position: 'absolute', top: 100, right: -80, width: 250, height: 250, borderRadius: 125, backgroundColor: AQUA2, opacity: 0.04 },
  bgGrid: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.02,
    // patrón visual simulado con border
    borderWidth: 0,
  },

  container: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24, paddingVertical: 48 },

  header: { alignItems: 'center', marginBottom: 36 },

  // Logo
  logoWrap:  { alignItems: 'center', justifyContent: 'center', marginBottom: 24, width: 80, height: 80 },
  logoRing:  { position: 'absolute', width: 80, height: 80, borderRadius: 40, borderWidth: 1.5, borderColor: AQUA, opacity: 0.4 },
  logoBadge: { width: 60, height: 60, borderRadius: 18, backgroundColor: AQUA, alignItems: 'center', justifyContent: 'center', shadowColor: AQUA, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.6, shadowRadius: 16, elevation: 12 },
  logoText:  { fontSize: 28, fontWeight: '900', color: '#001a1a' },

  appName:  { fontSize: 13, fontWeight: '800', color: AQUA2, letterSpacing: 4, textAlign: 'center', textTransform: 'uppercase', marginBottom: 8 },
  title:    { fontSize: 30, fontWeight: '900', color: TEXT, letterSpacing: -0.8, textAlign: 'center', marginBottom: 6 },
  subtitle: { fontSize: 14, color: MUTED, textAlign: 'center' },
});