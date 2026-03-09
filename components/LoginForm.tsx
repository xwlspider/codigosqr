// components/LoginForm.tsx
import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ActivityIndicator, Animated,
} from 'react-native';
import { LoginForm as LoginFormData } from '../logic/Session/useLogin';
import { useRouter } from 'expo-router';

interface LoginFormProps {
  form: LoginFormData;
  update: (key: keyof LoginFormData) => (val: string) => void;
  loading: boolean;
  onSubmit: () => void;
  onNavigateRegister?: () => void;
}

export default function LoginForm({
  form, update, loading, onSubmit,
}: Omit<LoginFormProps, 'onNavigateRegister'>) {
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const router = useRouter();

  const fadeAnim  = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const scaleBtn  = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim,  { toValue: 1, duration: 600, delay: 200, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, tension: 60, friction: 10, delay: 200, useNativeDriver: true }),
    ]).start();
  }, []);

  const handlePressIn  = () => Animated.spring(scaleBtn, { toValue: 0.96, useNativeDriver: true }).start();
  const handlePressOut = () => Animated.spring(scaleBtn, { toValue: 1,    useNativeDriver: true }).start();

  const handleLoginClick = () => {
    onSubmit();
    router.replace('/');
  };

  return (
    <Animated.View style={[s.card, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
      <View style={s.glowTopRight} />
      <View style={s.glowBottomLeft} />

      {/* Email */}
      <View style={s.field}>
        <Text style={s.label}>CORREO ELECTRÓNICO</Text>
        <View style={[s.inputWrap, focusedField === 'email' && s.inputFocused]}>
          <Text style={s.inputIcon}>✉</Text>
          <TextInput
            style={s.input}
            placeholder="correo@ejemplo.com"
            placeholderTextColor="#2a5a5a"
            value={form.email}
            onChangeText={update('email')}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            onFocus={() => setFocusedField('email')}
            onBlur={() => setFocusedField(null)}
          />
        </View>
        {focusedField === 'email' && <View style={s.fieldUnderline} />}
      </View>

      {/* Contraseña */}
      <View style={s.field}>
        <Text style={s.label}>CONTRASEÑA</Text>
        <View style={[s.inputWrap, focusedField === 'pass' && s.inputFocused]}>
          <Text style={s.inputIcon}>🔒</Text>
          <TextInput
            style={s.input}
            placeholder="Tu contraseña"
            placeholderTextColor="#2a5a5a"
            value={form.password}
            onChangeText={update('password')}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            autoCorrect={false}
            onFocus={() => setFocusedField('pass')}
            onBlur={() => setFocusedField(null)}
          />
          <TouchableOpacity onPress={() => setShowPassword(p => !p)} style={s.eyeBtn}>
            <Text style={s.eyeText}>{showPassword ? '🙈' : '👁'}</Text>
          </TouchableOpacity>
        </View>
        {focusedField === 'pass' && <View style={s.fieldUnderline} />}
      </View>

      {/* Botón */}
      <Animated.View style={{ transform: [{ scale: scaleBtn }], marginTop: 8 }}>
        <TouchableOpacity
          style={[s.btn, loading && s.btnDisabled]}
          onPress={handleLoginClick}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          disabled={loading}
          activeOpacity={1}
        >
          <View style={s.btnInner}>
            {loading
              ? <ActivityIndicator color="#001a1a" />
              : <>
                  <Text style={s.btnText}>Entrar</Text>
                  <Text style={s.btnArrow}>→</Text>
                </>
            }
          </View>
          <View style={s.btnShine} />
        </TouchableOpacity>
      </Animated.View>

      {/* Footer */}
      <View style={s.footer}>
        <Text style={s.footerText}>¿No tienes cuenta?  </Text>
        <TouchableOpacity onPress={() => router.push('/Registre')}>
          <Text style={s.footerLink}>Regístrate aquí</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const AQUA  = '#00e5cc';
const AQUA2 = '#00b4a0';
const CARD  = '#020f0e';
const BORDER = '#0a3530';
const TEXT  = '#e0fffc';
const MUTED = '#3a8a80';

const s = StyleSheet.create({
  card: { backgroundColor: CARD, borderRadius: 24, borderWidth: 1, borderColor: BORDER, padding: 24, gap: 20, overflow: 'hidden' },
  glowTopRight:  { position: 'absolute', top: -40, right: -40, width: 120, height: 120, borderRadius: 60, backgroundColor: AQUA, opacity: 0.06 },
  glowBottomLeft:{ position: 'absolute', bottom: -30, left: -30, width: 100, height: 100, borderRadius: 50, backgroundColor: AQUA2, opacity: 0.08 },
  field:        { gap: 8 },
  label:        { fontSize: 10, fontWeight: '800', color: AQUA2, letterSpacing: 2 },
  inputWrap:    { flexDirection: 'row', alignItems: 'center', backgroundColor: '#030f0e', borderRadius: 14, borderWidth: 1, borderColor: BORDER, paddingHorizontal: 14 },
  inputFocused: { borderColor: AQUA, shadowColor: AQUA, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 4 },
  inputIcon:    { fontSize: 14, marginRight: 10 },
  input:        { flex: 1, color: TEXT, fontSize: 15, paddingVertical: 15 },
  eyeBtn:       { padding: 4 },
  eyeText:      { fontSize: 15 },
  fieldUnderline: { height: 1, backgroundColor: AQUA, borderRadius: 1, opacity: 0.6 },
  btn:          { borderRadius: 16, overflow: 'hidden', backgroundColor: AQUA, shadowColor: AQUA, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 12, elevation: 8 },
  btnDisabled:  { opacity: 0.5 },
  btnInner:     { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 16, gap: 8 },
  btnText:      { color: '#001a1a', fontWeight: '900', fontSize: 16, letterSpacing: 0.5 },
  btnArrow:     { color: '#001a1a', fontWeight: '900', fontSize: 18 },
  btnShine:     { position: 'absolute', top: 0, left: 0, right: 0, height: '50%', backgroundColor: 'rgba(255,255,255,0.12)', borderTopLeftRadius: 16, borderTopRightRadius: 16 },
  footer:       { flexDirection: 'row', justifyContent: 'center', marginTop: 4 },
  footerText:   { color: MUTED, fontSize: 14 },
  footerLink:   { color: AQUA, fontSize: 14, fontWeight: '800' },
});