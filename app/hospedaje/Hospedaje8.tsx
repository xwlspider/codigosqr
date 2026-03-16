import HospedajeScreen, { HospedajeDetalle } from '../../components/HospedajeScreen';
import { router } from 'expo-router';

const data: HospedajeDetalle = {
  nombre: 'Suite Turi',
  ubicacion: 'Mirador de Turi, vía a Baños',
  precio: '$150',
  descripcion: 'El único hospedaje con vista completa a toda la ciudad iluminada de noche. Una experiencia que no se repite.',
  imagen: require('../../assets/images/hospedaje8_foto1.png'),
  tag: 'Lujo',
  tagColor: '#f59e0b',
  habitaciones: 5,
  servicios: [
    { icono: '📶', nombre: 'WiFi gratis' },
    { icono: '🍳', nombre: 'Desayuno buffet' },
    { icono: '🅿️', nombre: 'Parqueadero' },
    { icono: '❄️', nombre: 'Aire acondicionado' },
    { icono: '💆', nombre: 'Spa' },
    { icono: '🛎️', nombre: 'Room service' },
    { icono: '🌆', nombre: 'Vista panorámica' },
  ],
  contacto: '+593 97 567 8901',
  whatsapp: '97 567 8901',
  id: 8,
  onReservar: () => router.push({
    pathname: '/pago',
    params: {
      hospedajeId:     '8',
      hospedajeNombre: 'Suite Turi',
      monto:           '150',
      checkin:         new Date().toISOString().split('T')[0],
      checkout:        new Date(Date.now() + 86400000).toISOString().split('T')[0],
    },
  }),
};

export default function Hospedaje8() {
  return <HospedajeScreen data={data} />;
}