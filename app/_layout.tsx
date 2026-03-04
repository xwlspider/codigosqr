import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack initialRouteName="Login">
      <Stack.Screen name="Login" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="Registre" options={{ headerShown: false }} />
      <Stack.Screen name="Hospedaje/Hospedaje1" options={{ headerShown: false }} />
      <Stack.Screen name="Hospedaje/Hospedaje2" options={{ headerShown: false }} />
      <Stack.Screen name="Hospedaje/Hospedaje3" options={{ headerShown: false }} />
      <Stack.Screen name="Hospedaje/Hospedaje4" options={{ headerShown: false }} />
    </Stack>
  );
}