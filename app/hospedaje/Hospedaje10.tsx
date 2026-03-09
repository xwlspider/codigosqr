import HospedajeScreen, { HospedajeDetalle } from '../../components/HospedajeScreen';
import { router } from 'expo-router';

const data: HospedajeDetalle = {
  nombre: 'Hotel Yanuncay',
  ubicacion: 'Av. 12 de Abril, junto al río Yanuncay',
  precio: '$75',
  descripcion: 'Moderno y tranquilo, al costado del río que serpentea entre jardines. Ideal para familias y parejas que buscan calma.',
  imagen: require('../../assets/images/Hospedaje10FOTO1.png'),
  tag: 'Familiar',
  tagColor: '#3b82f6',
  habitaciones: 18,
  servicios: [
    { icono: '📶', nombre: 'WiFi gratis' },
    { icono: '🍳', nombre: 'Desayuno' },
    { icono: '🅿️', nombre: 'Parqueadero' },
    { icono: '❄️', nombre: 'Aire acondicionado' },
    { icono: '🌿', nombre: 'Jardín' },
    { icono: '👶', nombre: 'Apto familias' },
    { icono: '📺', nombre: 'TV cable' },
  ],
  contacto: '+593 98 467 2753',
  whatsapp: '98 467 2753',
  id: 10,
  onReservar: () => router.push({
    pathname: '/pago',
    params: {
      hospedajeId:     '10',
      hospedajeNombre: 'Hotel Yanuncay',
      monto:           '75',
      checkin:         new Date().toISOString().split('T')[0],
      checkout:        new Date(Date.now() + 86400000).toISOString().split('T')[0],
    },
  }),
};

export default function Hospedaje10() {
  return <HospedajeScreen data={data} />;
}