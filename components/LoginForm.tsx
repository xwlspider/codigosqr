// components/LoginForm.tsx
import React, { useRef, useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ActivityIndicator,
} from 'react-native';
import { LoginForm as LoginFormData } from '../logic/Session/useLogin';
import { useRouter } from 'expo-router';

interface LoginFormProps {
  form: LoginFormData;
  updateEmail: (val: string) => void;
  updatePassword: (val: string) => void;
  loading: boolean;
  onSubmit: () => void;
}

export default function LoginForm({
  form, updateEmail, updatePassword, loading, onSubmit,
}: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const emailRef    = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  return (
    <View style={s.card}>
      <View pointerEvents="none" style={s.glowTopRight} />
      <View pointerEvents="none" style={s.glowBottomLeft} />

      {/* Email */}
      <View style={s.field}>
        <Text style={s.label}>CORREO ELECTRÓNICO</Text>
        <View style={s.inputWrap}>
          <Text style={s.inputIcon}>✉</Text>
          <TextInput
            ref={emailRef}
            style={s.input}
            placeholder="correo@ejemplo.com"
            placeholderTextColor="#2a5a5a"
            value={form.email}
            onChangeText={updateEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="email"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current?.focus()}
          />
        </View>
      </View>

      {/* Contraseña */}
      <View style={s.field}>
        <Text style={s.label}>CONTRASEÑA</Text>
        <View style={s.inputWrap}>
          <Text style={s.inputIcon}>🔒</Text>
          <TextInput
            ref={passwordRef}
            style={s.input}
            placeholder="Tu contraseña"
            placeholderTextColor="#2a5a5a"
            value={form.password}
            onChangeText={updatePassword}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="password"
            returnKeyType="done"
            onSubmitEditing={onSubmit}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(v => !v)}
            style={s.eyeBtn}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={s.eyeText}>{showPassword ? '🙈' : '👁'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Botón */}
      <TouchableOpacity
        style={[s.btn, loading && s.btnOff]}
        onPress={onSubmit}
        disabled={loading}
        activeOpacity={0.85}
      >
        <View style={s.btnShine} />
        {loading
          ? <ActivityIndicator color="#001a1a" />
          : <Text style={s.btnText}>Entrar  →</Text>
        }
      </TouchableOpacity>

      {/* Footer */}
      <View style={s.footer}>
        <Text style={s.footerText}>¿No tienes cuenta? </Text>
        <TouchableOpacity
          onPress={() => router.push('/Registre')}
          hitSlop={{ top: 8, bottom: 8, left: 4, right: 4 }}
        >
          <Text style={s.footerLink}>Regístrate aquí</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const AQUA   = '#00e5cc';
const AQUA2  = '#00b4a0';
const CARD   = '#020f0e';
const BORDER = '#0a3530';
const TEXT   = '#e0fffc';
const MUTED  = '#3a8a80';

const s = StyleSheet.create({
  card:           { backgroundColor: CARD, borderRadius: 24, borderWidth: 1, borderColor: BORDER, padding: 24, gap: 20, overflow: 'hidden' },
  glowTopRight:   { position: 'absolute', top: -40, right: -40, width: 120, height: 120, borderRadius: 60, backgroundColor: AQUA, opacity: 0.06 },
  glowBottomLeft: { position: 'absolute', bottom: -30, left: -30, width: 100, height: 100, borderRadius: 50, backgroundColor: AQUA2, opacity: 0.08 },

  // Campos — mismo estilo que Register
  field:     { gap: 8 },
  label:     { fontSize: 10, fontWeight: '800', color: AQUA2, letterSpacing: 2 },
  inputWrap: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#030f0e', borderRadius: 14, borderWidth: 1, borderColor: BORDER, paddingHorizontal: 14 },
  inputIcon: { fontSize: 15, marginRight: 8 },
  input:     { flex: 1, color: TEXT, fontSize: 15, paddingVertical: 15 },
  eyeBtn:    { paddingLeft: 8 },
  eyeText:   { fontSize: 15 },

  // Botón
  btn:      { borderRadius: 16, overflow: 'hidden', backgroundColor: AQUA, paddingVertical: 16, alignItems: 'center', justifyContent: 'center', shadowColor: AQUA, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.45, shadowRadius: 14, elevation: 10, marginTop: 4 },
  btnOff:   { opacity: 0.5 },
  btnShine: { position: 'absolute', top: 0, left: 0, right: 0, height: '50%', backgroundColor: 'rgba(255,255,255,0.13)', borderTopLeftRadius: 16, borderTopRightRadius: 16 },
  btnText:  { color: '#001a1a', fontWeight: '900', fontSize: 16, letterSpacing: 0.5 },

  // Footer
  footer:     { flexDirection: 'row', justifyContent: 'center', marginTop: 4 },
  footerText: { color: MUTED, fontSize: 14 },
  footerLink: { color: AQUA, fontSize: 14, fontWeight: '800' },
});