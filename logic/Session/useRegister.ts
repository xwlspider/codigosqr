import { useState } from 'react';
import { Alert } from 'react-native';
import { signUp } from '../auth/useAuth';

export interface FormData {
  nombre: string;
  apellido: string;
  celular: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const INITIAL_FORM: FormData = {
  nombre: '',
  apellido: '',
  celular: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const validate = (form: FormData): string | null => {
  if (!form.nombre.trim())    return 'El nombre es requerido.';
  if (!form.apellido.trim())  return 'El apellido es requerido.';
  if (!form.celular.trim())   return 'El celular es requerido.';
  if (!/^\+?\d{7,15}$/.test(form.celular.replace(/\s/g, '')))
                              return 'Ingresa un número de celular válido.';
  if (!form.email.trim())     return 'El correo es requerido.';
  if (!/\S+@\S+\.\S+/.test(form.email)) return 'Ingresa un correo válido.';
  if (!form.password)         return 'La contraseña es requerida.';
  if (form.password.length < 6) return 'La contraseña debe tener al menos 6 caracteres.';
  if (form.password !== form.confirmPassword) return 'Las contraseñas no coinciden.';
  return null;
};

interface UseRegisterOptions {
  onSuccess?: () => void;
}

export function useRegister({ onSuccess }: UseRegisterOptions = {}) {
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [loading, setLoading] = useState(false);

  const update = (key: keyof FormData) => (val: string) =>
    setForm(prev => ({ ...prev, [key]: val }));

  const handleRegister = async () => {
    const error = validate(form);
    if (error) {
      Alert.alert('Error', error);
      return;
    }

    setLoading(true);
    const { error: authError } = await signUp({
      email:    form.email,
      password: form.password,
      nombre:   form.nombre,
      apellido: form.apellido,
      celular:  form.celular,
    });
    setLoading(false);

    if (authError) {
      Alert.alert('Error al registrarse', authError.message);
    } else {
      Alert.alert(
        '¡Cuenta creada! ✅',
        'Revisa tu correo para confirmar tu cuenta.',
        [{ text: 'Ok', onPress: onSuccess }]
      );
    }
  };

  return { form, update, loading, handleRegister };
}