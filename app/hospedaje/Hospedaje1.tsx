// app/hospedaje/Hospedaje1.tsx
import { router } from 'expo-router';
import HospedajeScreen, { HospedajeDetalle } from '../../components/HospedajeScreen';

const data: HospedajeDetalle = {
  id: 1,
  nombre: 'Dreams',
  ubicacion: 'Simón Bolívar, junto a Dos Chorreras',
  precio: '$30',
  descripcion: 'Pasa aquí junto a las delicias más esperadas y una noche en tus sueños cerca al Parque Calderón de Cuenca. Un ambiente acogedor, tranquilo y lleno de encanto para descansar como nunca.',
  imagen: require('../../assets/images/Hospedaje1FOTO1.png'),
  tag: 'Popular',
  tagColor: '#f97316',
  habitaciones: 8,
  servicios: [
    { icono: '📶', nombre: 'WiFi gratis' },
    { icono: '🍳', nombre: 'Desayuno' },
    { icono: '❄️', nombre: 'Aire acondicionado' },
    { icono: '🅿️', nombre: 'Parqueadero' },
    { icono: '🧹', nombre: 'Limpieza diaria' },
    { icono: '📺', nombre: 'TV cable' },
  ],
  contacto: '+593 98 123 4567',
  whatsapp: '98 123 4567',
  onReservar: () => router.push({
    pathname: '/pago',
    params: {
      hospedajeId:     '1',
      hospedajeNombre: 'Dreams',
      monto:           '30',
      checkin:         new Date().toISOString().split('T')[0],
      checkout:        new Date(Date.now() + 86400000).toISOString().split('T')[0],
    },
  }),
};

export default function Hospedaje1() {
  return <HospedajeScreen data={data} />;
}