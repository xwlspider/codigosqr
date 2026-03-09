// components/RegisterForm.tsx
import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ActivityIndicator, Animated,
} from 'react-native';
import { FormData } from '../logic/Session/useRegister';
import { useRouter } from 'expo-router';

interface FieldProps {
  label: string;
  icon?: string;
  value: string;
  onChangeText: (val: string) => void;
  placeholder?: string;
  keyboardType?: any;
  secureTextEntry?: boolean;
  onToggleSecure?: () => void;
  showSecure?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

const Field = ({
  label, icon, value, onChangeText, placeholder,
  keyboardType, secureTextEntry, onToggleSecure, showSecure,
  autoCapitalize = 'none',
}: FieldProps) => {
  const [focused, setFocused] = useState(false);
  return (
    <View style={s.field}>
      <Text style={s.label}>{label}</Text>
      <View style={[s.inputWrap, focused && s.inputFocused]}>
        {icon && <Text style={s.inputIcon}>{icon}</Text>}
        <TextInput
          style={s.input}
          placeholder={placeholder}
          placeholderTextColor="#2a5a5a"
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType || 'default'}
          secureTextEntry={secureTextEntry}
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        {onToggleSecure && (
          <TouchableOpacity onPress={onToggleSecure} style={s.eyeBtn}>
            <Text style={s.eyeText}>{showSecure ? '🙈' : '👁'}</Text>
          </TouchableOpacity>
        )}
      </View>
      {focused && <View style={s.fieldUnderline} />}
    </View>
  );
};

interface RegisterFormProps {
  form: FormData;
  update: (key: keyof FormData) => (val: string) => void;
  loading: boolean;
  onSubmit: () => void;
  onNavigateLogin?: () => void;
}

export default function RegisterForm({
  form, update, loading, onSubmit,
}: Omit<RegisterFormProps, 'onNavigateLogin'>) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm,  setShowConfirm]  = useState(false);
  const router   = useRouter();
  const scaleBtn = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim= useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim,  { toValue: 1, duration: 600, delay: 100, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, tension: 60, friction: 10, delay: 100, useNativeDriver: true }),
    ]).start();
  }, []);

  const handlePressIn  = () => Animated.spring(scaleBtn, { toValue: 0.96, useNativeDriver: true }).start();
  const handlePressOut = () => Animated.spring(scaleBtn, { toValue: 1,    useNativeDriver: true }).start();

  return (
    <Animated.View style={[s.card, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
      <View style={s.glowTopRight} />
      <View style={s.glowBottomLeft} />

      {/* Nombre + Apellido */}
      <View style={s.row}>
        <View style={[s.field, s.half]}>
          <Text style={s.label}>NOMBRE</Text>
          <View style={s.inputWrap}>
            <TextInput style={s.input} placeholder="Juan" placeholderTextColor="#2a5a5a" value={form.nombre} onChangeText={update('nombre')} autoCapitalize="words" autoCorrect={false} />
          </View>
        </View>
        <View style={[s.field, s.half]}>
          <Text style={s.label}>APELLIDO</Text>
          <View style={s.inputWrap}>
            <TextInput style={s.input} placeholder="Pérez" placeholderTextColor="#2a5a5a" value={form.apellido} onChangeText={update('apellido')} autoCapitalize="words" autoCorrect={false} />
          </View>
        </View>
      </View>

      <Field label="CELULAR" icon="📱" value={form.celular} onChangeText={update('celular')} placeholder="+593 99 999 9999" keyboardType="phone-pad" />
      <Field label="CORREO ELECTRÓNICO" icon="✉" value={form.email} onChangeText={update('email')} placeholder="correo@ejemplo.com" keyboardType="email-address" />
      <Field label="CONTRASEÑA" icon="🔒" value={form.password} onChangeText={update('password')} placeholder="Mínimo 6 caracteres" secureTextEntry={!showPassword} onToggleSecure={() => setShowPassword(p => !p)} showSecure={showPassword} />
      <Field label="CONFIRMAR CONTRASEÑA" icon="🔑" value={form.confirmPassword} onChangeText={update('confirmPassword')} placeholder="Repite tu contraseña" secureTextEntry={!showConfirm} onToggleSecure={() => setShowConfirm(p => !p)} showSecure={showConfirm} />

      {/* Botón */}
      <Animated.View style={{ transform: [{ scale: scaleBtn }], marginTop: 8 }}>
        <TouchableOpacity
          style={[s.btn, loading && s.btnDisabled]}
          onPress={onSubmit}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          disabled={loading}
          activeOpacity={1}
        >
          <View style={s.btnInner}>
            {loading
              ? <ActivityIndicator color="#001a1a" />
              : <>
                  <Text style={s.btnText}>Crear cuenta</Text>
                  <Text style={s.btnArrow}>→</Text>
                </>
            }
          </View>
          <View style={s.btnShine} />
        </TouchableOpacity>
      </Animated.View>

      {/* Footer */}
      <View style={s.footer}>
        <Text style={s.footerText}>¿Ya tienes cuenta?  </Text>
        <TouchableOpacity onPress={() => router.push('/Login')}>
          <Text style={s.footerLink}>Inicia sesión</Text>
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
  card: { backgroundColor: CARD, borderRadius: 24, borderWidth: 1, borderColor: BORDER, padding: 24, gap: 16, overflow: 'hidden' },
  glowTopRight:  { position: 'absolute', top: -40, right: -40, width: 120, height: 120, borderRadius: 60, backgroundColor: AQUA, opacity: 0.06 },
  glowBottomLeft:{ position: 'absolute', bottom: -30, left: -30, width: 100, height: 100, borderRadius: 50, backgroundColor: AQUA2, opacity: 0.08 },
  row:          { flexDirection: 'row', gap: 12 },
  half:         { flex: 1 },
  field:        { gap: 6 },
  label:        { fontSize: 10, fontWeight: '800', color: AQUA2, letterSpacing: 2 },
  inputWrap:    { flexDirection: 'row', alignItems: 'center', backgroundColor: '#030f0e', borderRadius: 14, borderWidth: 1, borderColor: BORDER, paddingHorizontal: 14 },
  inputFocused: { borderColor: AQUA, shadowColor: AQUA, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 4 },
  inputIcon:    { fontSize: 14, marginRight: 10 },
  input:        { flex: 1, color: TEXT, fontSize: 15, paddingVertical: 13 },
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