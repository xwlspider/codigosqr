
//logic/Session/useLogin.ts
import { useState } from 'react';
import { Alert } from 'react-native';
import { signIn } from '../auth/useAuth';

export interface LoginForm {
  email: string;
  password: string;
}

const INITIAL_FORM: LoginForm = {
  email: '',
  password: '',
};

const validate = (form: LoginForm): string | null => {
  if (!form.email.trim())    return 'El correo es requerido.';
  if (!/\S+@\S+\.\S+/.test(form.email)) return 'Ingresa un correo válido.';
  if (!form.password.trim()) return 'La contraseña es requerida.';
  return null;
};

interface UseLoginOptions {
  onSuccess?: () => void;
}

export function useLogin({ onSuccess }: UseLoginOptions = {}) {
  const [form, setForm] = useState<LoginForm>(INITIAL_FORM);
  const [loading, setLoading] = useState(false);

  const update = (key: keyof LoginForm) => (val: string) =>
    setForm(prev => ({ ...prev, [key]: val }));

  const handleLogin = async () => {
    const error = validate(form);
    if (error) {
      Alert.alert('Error', error);
      return;
    }

    setLoading(true);
    const { error: authError } = await signIn(form.email, form.password);
    setLoading(false);

    if (authError) {
      Alert.alert('Error al iniciar sesión', authError.message);
    } else {
      onSuccess?.();
    }
  };

  return { form, update, loading, handleLogin };
}