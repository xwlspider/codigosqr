import { Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

export const NotificationAdapter = {

  // 1. Configuración Global ------------------------------------------
  setup: () => {
    // Definimos qué pasa si recibimos una notificación con la APP ABIERTA (Foreground)
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        // shouldShowAlert:
        // true = Permite mostrar alertas visuales en general.
        shouldShowAlert: true,

        // shouldPlaySound:
        // true = Reproduce el sonido o vibración del sistema.
        shouldPlaySound: true,

        // shouldSetBadge:
        // false = No altera el contador rojo de la app (Home Screen).
        shouldSetBadge: false,

        // shouldShowBanner (iOS Nuevo Standard):
        // true = Muestra el banner deslizable desde arriba (como un mensaje normal).
        shouldShowBanner: true,

        // shouldShowList (iOS Nuevo Standard):
        // true = Mantiene la notificación visible en el Centro de Notificaciones.
        shouldShowList: true,
      }),
    });
  },

  // 2. Pedir permisos y obtener token
  registerForPushNotificationsAsync: async (): Promise<string | null> => {
    let token;

    // A. Configuración específica para ANDROID
    // Canal 'pagos': se activa cuando el usuario completa una reserva en Spyly
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('pagos', {
        name: 'Confirmación de Pagos',        // 👈 Nombre visible en Ajustes del sistema
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#4F46E5',                // 👈 Color de marca Spyly
      });
    }

    // B. Verificación de Dispositivo Físico
    if (Device.isDevice) {

      // C. Gestión de Permisos
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        console.log('¡Permiso denegado por el usuario!');
        return null;
      }

      // D. Obtenemos el Token
      token = (await Notifications.getExpoPushTokenAsync({
        projectId: "07ba0a2c-c707-4a3d-a7e4-28753892dc80", 
      })).data;
      console.log('Debes usar un dispositivo físico para probar Push Notifications');
    }

    return token || null;
  },
};