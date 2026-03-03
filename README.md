
# 🏠 Stayly - Aplicación de Hospedajes Exclusivos

Stayly es una plataforma móvil diseñada para la gestión de reservas de hospedajes seleccionados. A diferencia de aplicaciones masivas, Stayly ofrece una experiencia curada con acceso a 4 propiedades exclusivas, cada una con su propia lógica independiente, integración de mapas y un sistema de check-in basado en códigos QR.

## 🚀 Propósito de la Aplicación

El objetivo principal de Stayly es ofrecer un flujo de usuario lineal y seguro:

### **Autenticación**: Acceso protegido mediante login vinculado a Supabase.

### **Navegación Selectiva**: Un catálogo principal que deriva a archivos independientes por cada hospedaje.

### **Geolocalización**: Pantalla dedicada para la visualización de mapas y rutas.

### **Transacción Digital**: Formulario de pago con tarjeta y registro en base de datos.

### **Validación QR**: Generación de un comprobante digital único con los datos del registro.

## 🛠️ Herramientas y Stack Tecnológico

### Frontend: 
React Native / Expo con TypeScript (.ts y .tsx).

### Navegación: 
Expo Router (uso de router.push para flujo entre pantallas).

### **Backend y Auth**: 
Supabase (Base de datos y gestión de sesiones).

### Mapas: 
React Native Maps (Pantalla de ubicación independiente).

### Generación QR: 
react-native-qrcode-svg (Lógica de comprobantes).

## 🏗️ Estructura del Proyecto (Arquitectura)
Para mantener la coherencia entre la interfaz y la lógica de negocio, el proyecto se organiza de la siguiente manera:

### /api (Capa de Datos)
Aquí reside la configuración de Supabase y las funciones de comunicación con el backend (Login, Registro de reservas y consultas).

### /logic (Lógica de Negocio)
Contiene los "Hooks" y funciones puras que no tienen interfaz, como la lógica para procesar los datos del QR y la gestión de coordenadas para el mapa.

### /ui (Componentes de Interfaz)
Componentes visuales reutilizables como botones, inputs, visores de mapas y contenedores de códigos QR (UI Pura).

### /app (Pantallas y Navegación)
login.tsx: Pantalla de entrada y validación de usuario.

index.tsx: Dashboard principal con información breve de los 4 lugares.

mapa.tsx: Pantalla independiente que carga la ubicación del hospedaje seleccionado.

hospedajes/: Directorio con 4 archivos independientes (.tsx) para cada estancia.

pago.tsx: Formulario para procesar el pago con tarjeta.

comprobante.tsx: Pantalla de cierre que muestra el QR generado tras la reserva.