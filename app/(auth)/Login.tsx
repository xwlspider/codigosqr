import React, { useRef, useEffect } from 'react';
import {
  SafeAreaView, StyleSheet, Text, View, Animated,
  KeyboardAvoidingView, ScrollView, Platform, Image,
} from 'react-native';
import { router } from 'expo-router';
import LoginForm from '../../components/LoginForm';
import { useLogin } from '../../logic/Session/useLogin';



export default function LoginScreen() {
  const { form, updateEmail, updatePassword, loading, handleLogin } = useLogin({
    onSuccess: () => router.replace('/'),
  });

  // Solo esta animación — el título que entra desde arriba
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleSlide   = useRef(new Animated.Value(-20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(titleOpacity, { toValue: 1, duration: 600, delay: 200, useNativeDriver: true }),
      Animated.timing(titleSlide,   { toValue: 0, duration: 600, delay: 200, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={s.safe}>

      <View pointerEvents="none" style={StyleSheet.absoluteFill}>
        <View style={s.bgTop} />
        <View style={s.bgOrb1} />
        <View style={s.bgOrb2} />
      </View>

      <KeyboardAvoidingView
        style={s.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={s.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
        {/* Header */}
        <View style={s.header}>
          <Image 
            source={require('../../assets/images/staylyLogo.png')} 
            style={s.logoImage} // <-- Usamos este nuevo estilo
            resizeMode="contain" // <-- Importante para que no se deforme
          />
        
          <Animated.View style={{ opacity: titleOpacity, transform: [{ translateY: titleSlide }] }}>
            <Text style={s.appName}>STAYLY</Text>
            <Text style={s.title}>Iniciar sesión</Text>
            <Text style={s.subtitle}>Bienvenido de vuelta</Text>
          </Animated.View>
        </View>

          <LoginForm
            form={form}
            updateEmail={updateEmail}
            updatePassword={updatePassword}
            loading={loading}
            onSubmit={handleLogin}
          />
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
  safe: { flex: 1, backgroundColor: BG },
  flex: { flex: 1 },

  bgTop:  { position: 'absolute', top: 0, left: 0, right: 0, height: 320, backgroundColor: '#001a18', borderBottomLeftRadius: 60, borderBottomRightRadius: 60 },
  bgOrb1: { position: 'absolute', top: -60, left: -60, width: 220, height: 220, borderRadius: 110, backgroundColor: AQUA, opacity: 0.05 },
  bgOrb2: { position: 'absolute', top: 120, right: -80, width: 260, height: 260, borderRadius: 130, backgroundColor: AQUA2, opacity: 0.04 },

  scroll: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24, paddingVertical: 48 },

  header:    { alignItems: 'center', marginBottom: 36 },
  logoImage: { 
    width: 100, // Hacemos la imagen más grande (antes el badge era 60)
    height: 100, 
    marginBottom: 16, // Espacio entre el logo y el texto "STAYLY"
  },
  appName:   { fontSize: 11, fontWeight: '900', color: AQUA2, letterSpacing: 5, textAlign: 'center', marginBottom: 8 },
  title:     { fontSize: 30, fontWeight: '900', color: TEXT, letterSpacing: -0.5, textAlign: 'center', marginBottom: 6 },
  subtitle:  { fontSize: 14, color: MUTED, textAlign: 'center' },
});