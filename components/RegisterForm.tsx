import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { FormData } from '../logic/Session/useRegister';
import { useRouter } from 'expo-router';

// ─── Field helper ─────────────────────────────────────────────────────────────
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
}: FieldProps) => (
  <View style={styles.fieldGroup}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.inputWrap}>
      {icon && <Text style={styles.icon}>{icon}</Text>}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#9ca3af"
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType || 'default'}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
        autoCorrect={false}
      />
      {onToggleSecure && (
        <TouchableOpacity onPress={onToggleSecure} style={styles.eyeBtn}>
          <Text style={styles.eyeText}>{showSecure ? '🙈' : '👁'}</Text>
        </TouchableOpacity>
      )}
    </View>
  </View>
);

// ─── RegisterForm ─────────────────────────────────────────────────────────────
interface RegisterFormProps {
  form: FormData;
  update: (key: keyof FormData) => (val: string) => void;
  loading: boolean;
  onSubmit: () => void;
  onNavigateLogin?: () => void;
}

export default function RegisterForm({
    form, update, loading, onSubmit, // Quitamos onNavigateLogin de los argumentos
  }: Omit<RegisterFormProps, 'onNavigateLogin'>) {
    
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm]   = useState(false);
    const router = useRouter(); // 2. Inicializar el router

    const handleGoToLogin = () => {
        // Si tu login es la pantalla principal en app/login.tsx o app/index.tsx
        router.push('/Login'); 
      };

  return (
    <View style={styles.card}>
      {/* Nombre + Apellido */}
      <View style={styles.row}>
        <View style={[styles.fieldGroup, styles.halfField]}>
          <Text style={styles.label}>Nombre</Text>
          <View style={styles.inputWrap}>
            <TextInput
              style={styles.input}
              placeholder="Juan"
              placeholderTextColor="#9ca3af"
              value={form.nombre}
              onChangeText={update('nombre')}
              autoCapitalize="words"
              autoCorrect={false}
            />
          </View>
        </View>
        <View style={[styles.fieldGroup, styles.halfField]}>
          <Text style={styles.label}>Apellido</Text>
          <View style={styles.inputWrap}>
            <TextInput
              style={styles.input}
              placeholder="Pérez"
              placeholderTextColor="#9ca3af"
              value={form.apellido}
              onChangeText={update('apellido')}
              autoCapitalize="words"
              autoCorrect={false}
            />
          </View>
        </View>
      </View>

      <Field
        label="Celular"
        icon="📱"
        value={form.celular}
        onChangeText={update('celular')}
        placeholder="+593 99 999 9999"
        keyboardType="phone-pad"
      />
      <Field
        label="Correo electrónico"
        icon="✉"
        value={form.email}
        onChangeText={update('email')}
        placeholder="correo@ejemplo.com"
        keyboardType="email-address"
      />
      <Field
        label="Contraseña"
        icon="🔒"
        value={form.password}
        onChangeText={update('password')}
        placeholder="Mínimo 6 caracteres"
        secureTextEntry={!showPassword}
        onToggleSecure={() => setShowPassword(p => !p)}
        showSecure={showPassword}
      />
      <Field
        label="Confirmar contraseña"
        icon="🔑"
        value={form.confirmPassword}
        onChangeText={update('confirmPassword')}
        placeholder="Repite tu contraseña"
        secureTextEntry={!showConfirm}
        onToggleSecure={() => setShowConfirm(p => !p)}
        showSecure={showConfirm}
      />

      {/* Botón */}
      <TouchableOpacity
        style={[styles.btn, loading && styles.btnDisabled]}
        onPress={onSubmit}
        disabled={loading}
        activeOpacity={0.88}
      >
        {loading
          ? <ActivityIndicator color="#fff" />
          : <Text style={styles.btnText}>Crear cuenta →</Text>
        }
      </TouchableOpacity> 

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>¿Ya tienes cuenta? </Text>
        {/* 4. Cambiamos la acción aquí */}
        <TouchableOpacity onPress={handleGoToLogin}>
          <Text style={styles.footerLink}>Inicia sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const ACCENT = '#f97316';
const CARD   = '#18181b';
const BORDER = '#27272a';
const TEXT   = '#fafafa';
const MUTED  = '#71717a';

const styles = StyleSheet.create({
  card: {
    backgroundColor: CARD,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 24,
    gap: 16,
  },
  row: { flexDirection: 'row', gap: 12 },
  halfField: { flex: 1 },
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
  input: { flex: 1, color: TEXT, fontSize: 15, paddingVertical: 13 },
  eyeBtn: { padding: 4 },
  eyeText: { fontSize: 15 },
  btn: {
    backgroundColor: ACCENT,
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 6,
  },
  btnDisabled: { opacity: 0.55 },
  btnText: { color: '#fff', fontWeight: '800', fontSize: 16, letterSpacing: 0.3 },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 4 },
  footerText: { color: MUTED, fontSize: 14 },
  footerLink: { color: ACCENT, fontSize: 14, fontWeight: '700' },
});