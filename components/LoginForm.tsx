import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
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
    form, update, loading, onSubmit, // Quitamos onNavigateRegister de aquí
  }: Omit<LoginFormProps, 'onNavigateRegister'>) { // Usamos Omit para evitar errores de tipo
    
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter(); 
  
    // 2. Esta función ahora sí es la que mandará al usuario a Registre.tsx
    const handleGoToRegister = () => {
      router.push('/Registre'); 
    }; 

  return (
    <View style={styles.card}>
      {/* Email */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Correo electrónico</Text>
        <View style={styles.inputWrap}>
          <Text style={styles.icon}>✉</Text>
          <TextInput
            style={styles.input}
            placeholder="correo@ejemplo.com"
            placeholderTextColor="#9ca3af"
            value={form.email}
            onChangeText={update('email')}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
      </View>

      {/* Contraseña */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Contraseña</Text>
        <View style={styles.inputWrap}>
          <Text style={styles.icon}>🔒</Text>
          <TextInput
            style={styles.input}
            placeholder="Tu contraseña"
            placeholderTextColor="#9ca3af"
            value={form.password}
            onChangeText={update('password')}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(p => !p)}
            style={styles.eyeBtn}
          >
            <Text style={styles.eyeText}>{showPassword ? '🙈' : '👁'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Botón */}
      <TouchableOpacity
        style={[styles.btn, loading && styles.btnDisabled]}
        onPress={onSubmit}
        disabled={loading}
        activeOpacity={0.88}
      >
        {loading
          ? <ActivityIndicator color="#fff" />
          : <Text style={styles.btnText}>Entrar →</Text>
        }
      </TouchableOpacity>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>¿No tienes cuenta? </Text>
        {/* 3. Cambiamos la llamada aquí */}
        <TouchableOpacity onPress={handleGoToRegister}>
          <Text style={styles.footerLink}>Regístrate aquí</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const ACCENT  = '#f97316';
const CARD    = '#18181b';
const BORDER  = '#27272a';
const TEXT    = '#fafafa';
const MUTED   = '#71717a';

const styles = StyleSheet.create({
  card: {
    backgroundColor: CARD,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 24,
    gap: 18,
  },
  fieldGroup: { gap: 6 },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: MUTED,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#09090b',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: BORDER,
    paddingHorizontal: 14,
  },
  icon: { fontSize: 15, marginRight: 10 },
  input: { flex: 1, color: TEXT, fontSize: 15, paddingVertical: 14 },
  eyeBtn: { padding: 4 },
  eyeText: { fontSize: 15 },
  btn: {
    backgroundColor: ACCENT,
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 4,
  },
  btnDisabled: { opacity: 0.55 },
  btnText: { color: '#fff', fontWeight: '800', fontSize: 16, letterSpacing: 0.3 },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 4 },
  footerText: { color: MUTED, fontSize: 14 },
  footerLink: { color: ACCENT, fontSize: 14, fontWeight: '700' },
});