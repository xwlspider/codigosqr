import React from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import RegisterForm from '../components/RegisterForm';
import { useRegister } from '../logic/Session/useRegister';

interface Props {
  onNavigateLogin?: () => void;
}

export default function RegisterScreen({ onNavigateLogin }: Props) {
  const { form, update, loading, handleRegister } = useRegister({
    onSuccess: onNavigateLogin,
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
              <Text style={styles.badgeText}>✦</Text>
            </View>
            <Text style={styles.title}>Crear cuenta</Text>
            <Text style={styles.subtitle}>Completa tus datos para registrarte</Text>
          </View>

          {/* Formulario (UI pura) */}
          <RegisterForm
            form={form}
            update={update}
            loading={loading}
            onSubmit={handleRegister}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const BG   = '#0c0c0e';
const TEXT = '#fafafa';
const MUTED = '#71717a';
const ACCENT = '#f97316';

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BG },
  flex: { flex: 1 },
  container: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  header: { alignItems: 'center', marginBottom: 28 },
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
    fontSize: 28,
    fontWeight: '800',
    color: TEXT,
    letterSpacing: -0.8,
    marginBottom: 6,
  },
  subtitle: { fontSize: 14, color: MUTED, textAlign: 'center' },
});