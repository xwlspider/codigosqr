import { useEffect, useState } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import { supabase } from "../logic/supabase/supabase"; 

export default function RootLayout() {
  const [session, setSession] = useState<any>(null);
  const [initialized, setInitialized] = useState(false);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    // 1. Escuchar cambios en la sesión de Supabase
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setInitialized(true);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!initialized) return;

    // 2. Lógica de redirección
    const inAuthGroup = segments[0] === "(auth)";

    if (!session && !inAuthGroup) {
      // Si no hay sesión y no está en login, mándalo a (auth)/Login
      router.replace("/Login");
    } else if (session && inAuthGroup) {
      // Si ya inició sesión y está en el login, mándalo al index "/"
      router.replace("/");
    }
  }, [session, initialized, segments]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Definimos las rutas principales */}
      <Stack.Screen name="index" />
      <Stack.Screen name="(auth)/Login" />
      <Stack.Screen name="(auth)/Registre" />
    </Stack>
  );
}