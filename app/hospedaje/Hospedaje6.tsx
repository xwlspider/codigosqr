// app/hospedaje/Hospedaje6.tsx
import { router } from 'expo-router';
import HospedajeScreen, { HospedajeDetalle } from '../../components/HospedajeScreen';

const data: HospedajeDetalle = {
  id: 6,
  nombre: 'Montaña Lodge',
  ubicacion: 'Baños, Cuenca',
  precio: '$40',
  descripcion: 'Un hermoso lodge rodeado de montañas y aire puro. Ideal para escapadas románticas o para descansar en medio de la naturaleza.',
  imagen: require('../../assets/images/hospedaje6.jpg'),
  tag: 'Vista montaña',
  tagColor: '#0ea5e9',
  habitaciones: 5,
  servicios: [
    { icono: '🔥', nombre: 'Chimenea' },
    { icono: '📶', nombre: 'WiFi gratis' },
    { icono: '🍳', nombre: 'Desayuno' },
    { icono: '🚿', nombre: 'Baño privado' },
    { icono: '🌄', nombre: 'Vista panorámica' },
    { icono: '🅿️', nombre: 'Parqueadero' },
  ],
  contacto: '+593 98 654 3210',
  whatsapp: '98 654 3210',
  onReservar: () => router.push({
    pathname: '/pago',
    params: {
      hospedajeId: '6',
      hospedajeNombre: 'Montaña Lodge',
      monto: '40',
      checkin: new Date().toISOString().split('T')[0],
      checkout: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    },
  }),
};

export default function Hospedaje6() {
  return <HospedajeScreen data={data} />;
}