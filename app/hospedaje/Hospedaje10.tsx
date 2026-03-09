// app/hospedaje/Hospedaje10.tsx
import { router } from 'expo-router';
import HospedajeScreen, { HospedajeDetalle } from '../../components/HospedajeScreen';

const data: HospedajeDetalle = {
  id: 10,
  nombre: 'Refugio Andino',
  ubicacion: 'El Cajas, Azuay',
  precio: '$60',
  descripcion: 'Un refugio perfecto para amantes de la naturaleza. Disfruta del aire puro, paisajes andinos y tranquilidad total.',
  imagen: require('../../assets/images/hospedaje10.jpg'),
  tag: 'Aventura',
  tagColor: '#14b8a6',
  habitaciones: 7,
  servicios: [
    { icono: '🔥', nombre: 'Chimenea' },
    { icono: '📶', nombre: 'WiFi gratis' },
    { icono: '🍳', nombre: 'Desayuno' },
    { icono: '🌄', nombre: 'Vista montaña' },
    { icono: '🚿', nombre: 'Baño privado' },
    { icono: '🅿️', nombre: 'Parqueadero' },
  ],
  contacto: '+593 94 333 2211',
  whatsapp: '94 333 2211',
  onReservar: () => router.push({
    pathname: '/pago',
    params: {
      hospedajeId: '10',
      hospedajeNombre: 'Refugio Andino',
      monto: '55',
      checkin: new Date().toISOString().split('T')[0],
      checkout: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    },
  }),
};

export default function Hospedaje10() {
  return <HospedajeScreen data={data} />;
}