import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { useLogin } from '../logic/Session/useLogin';
import LoginForm from '../components/LoginForm';

interface Props {
  onNavigateRegister?: () => void;
  onLoginSuccess?: () => void;
}

export default function LoginScreen({ onNavigateRegister, onLoginSuccess }: Props) {
  const { form, update, loading, handleLogin } = useLogin({
    onSuccess: onLoginSuccess,
  });

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>↗</Text>
            </View>
            <Text style={styles.title}>Iniciar sesión</Text>
            <Text style={styles.subtitle}>Bienvenido de vuelta</Text>
          </View>

          {/* Formulario (UI pura) */}
          <LoginForm
            form={form}
            update={update}
            loading={loading}
            onSubmit={handleLogin}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const BG     = '#0c0c0e';
const TEXT   = '#fafafa';
const MUTED  = '#71717a';
const ACCENT = '#f97316';

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BG },
  flex: { flex: 1 },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  header: { alignItems: 'center', marginBottom: 32 },
  badge: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: ACCENT,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  badgeText: { fontSize: 24, color: '#fff', fontWeight: '800' },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: TEXT,
    letterSpacing: -0.8,
    marginBottom: 6,
  },
  subtitle: { fontSize: 15, color: MUTED },
});