// app/Registre.tsx
import React, { useRef, useEffect } from 'react';
import {
  KeyboardAvoidingView, Platform, SafeAreaView,
  ScrollView, StyleSheet, Text, View, Animated,
} from 'react-native';
import { router } from 'expo-router';
import RegisterForm from '../../components/RegisterForm';
import { useRegister } from '../../logic/Session/useRegister';

export default function RegisterScreen() {
  const { form, update, loading, handleRegister } = useRegister({
    onSuccess: () => router.replace('/Login' as any),
  });

  const logoScale    = useRef(new Animated.Value(0.5)).current;
  const logoOpacity  = useRef(new Animated.Value(0)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleSlide   = useRef(new Animated.Value(-20)).current;
  const pulse        = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(logoScale,    { toValue: 1, tension: 50, friction: 7, useNativeDriver: true }),
      Animated.timing(logoOpacity,  { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(titleSlide,   { toValue: 0, duration: 600, delay: 200, useNativeDriver: true }),
      Animated.timing(titleOpacity, { toValue: 1, duration: 600, delay: 200, useNativeDriver: true }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1.08, duration: 2000, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1,    duration: 2000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <SafeAreaView style={s.safe}>
      <View style={s.bgTop} />
      <View style={s.bgOrb1} />
      <View style={s.bgOrb2} />

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={s.flex}>
        <ScrollView
          contentContainerStyle={s.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={s.header}>
            <Animated.View style={[s.logoWrap, { opacity: logoOpacity, transform: [{ scale: logoScale }] }]}>
              <Animated.View style={[s.logoRing, { transform: [{ scale: pulse }] }]} />
              <View style={s.logoBadge}>
                <Text style={s.logoText}>✦</Text>
              </View>
            </Animated.View>

            <Animated.View style={{ opacity: titleOpacity, transform: [{ translateY: titleSlide }] }}>
              <Text style={s.appName}>Stayly</Text>
              <Text style={s.title}>Crear cuenta</Text>
              <Text style={s.subtitle}>Completa tus datos para registrarte</Text>
            </Animated.View>
          </View>

          <RegisterForm form={form} update={update} loading={loading} onSubmit={handleRegister} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const AQUA  = '#00e5cc';
const AQUA2 = '#00b4a0';
const BG    = '#010a09';
const TEXT  = '#e0fffc';
const MUTED = '#3a8a80';

const s = StyleSheet.create({
  safe:      { flex: 1, backgroundColor: BG },
  flex:      { flex: 1 },
  bgTop:     { position: 'absolute', top: 0, left: 0, right: 0, height: 260, backgroundColor: '#001a18', borderBottomLeftRadius: 60, borderBottomRightRadius: 60 },
  bgOrb1:    { position: 'absolute', top: -60, left: -60, width: 200, height: 200, borderRadius: 100, backgroundColor: AQUA, opacity: 0.05 },
  bgOrb2:    { position: 'absolute', top: 80, right: -80, width: 220, height: 220, borderRadius: 110, backgroundColor: AQUA2, opacity: 0.04 },
  container: { flexGrow: 1, paddingHorizontal: 24, paddingVertical: 40 },
  header:    { alignItems: 'center', marginBottom: 28 },
  logoWrap:  { alignItems: 'center', justifyContent: 'center', marginBottom: 20, width: 80, height: 80 },
  logoRing:  { position: 'absolute', width: 80, height: 80, borderRadius: 40, borderWidth: 1.5, borderColor: AQUA, opacity: 0.4 },
  logoBadge: { width: 60, height: 60, borderRadius: 18, backgroundColor: AQUA, alignItems: 'center', justifyContent: 'center', shadowColor: AQUA, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.6, shadowRadius: 16, elevation: 12 },
  logoText:  { fontSize: 26, fontWeight: '900', color: '#001a1a' },
  appName:   { fontSize: 13, fontWeight: '800', color: AQUA2, letterSpacing: 4, textAlign: 'center', textTransform: 'uppercase', marginBottom: 6 },
  title:     { fontSize: 28, fontWeight: '900', color: TEXT, letterSpacing: -0.8, textAlign: 'center', marginBottom: 4 },
  subtitle:  { fontSize: 13, color: MUTED, textAlign: 'center' },
});