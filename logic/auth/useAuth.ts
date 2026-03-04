import { supabase } from '../supabase/supabase';

// ─── Tipos compartidos ────────────────────────────────────────────────────────
export interface AuthError {
  message: string;
}

export interface AuthResult {
  error: AuthError | null;
}

// ─── Login ────────────────────────────────────────────────────────────────────
export async function signIn(email: string, password: string): Promise<AuthResult> {
  const { error } = await supabase.auth.signInWithPassword({
    email: email.trim().toLowerCase(),
    password,
  });
  return { error: error ? { message: error.message } : null };
}

// ─── Register ─────────────────────────────────────────────────────────────────
export interface RegisterData {
  email: string;
  password: string;
  nombre: string;
  apellido: string;
  celular: string;
}

export async function signUp(data: RegisterData): Promise<AuthResult> {
  const { error } = await supabase.auth.signUp({
    email: data.email.trim().toLowerCase(),
    password: data.password,
    options: {
      data: {
        nombre:   data.nombre.trim(),
        apellido: data.apellido.trim(),
        celular:  data.celular.trim(),
      },
    },
  });
  return { error: error ? { message: error.message } : null };
}

// ─── Logout ───────────────────────────────────────────────────────────────────
export async function signOut(): Promise<AuthResult> {
  const { error } = await supabase.auth.signOut();
  return { error: error ? { message: error.message } : null };
}

// ─── Sesión actual ────────────────────────────────────────────────────────────
export async function getSession() {
  const { data, error } = await supabase.auth.getSession();
  return { session: data.session, error };
}