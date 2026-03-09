// app/hospedaje/Hospedaje8.tsx
import { router } from 'expo-router';
import HospedajeScreen, { HospedajeDetalle } from '../../components/HospedajeScreen';

const data: HospedajeDetalle = {
  id: 8,
  nombre: 'Casa Colonial',
  ubicacion: 'Parque Calderón, Cuenca',
  precio: '$50',
  descripcion: 'Una casa colonial con arquitectura tradicional cuencana, ubicada cerca de los principales atractivos turísticos.',
  imagen: require('../../assets/images/hospedaje8.jpg'),
  tag: 'Histórico',
  tagColor: '#ef4444',
  habitaciones: 10,
  servicios: [
    { icono: '📶', nombre: 'WiFi gratis' },
    { icono: '🍳', nombre: 'Desayuno' },
    { icono: '📺', nombre: 'TV cable' },
    { icono: '🚿', nombre: 'Baño privado' },
    { icono: '🛎️', nombre: 'Recepción' },
    { icono: '🧹', nombre: 'Limpieza diaria' },
  ],
  contacto: '+593 96 222 1144',
  whatsapp: '96 222 1144',
  onReservar: () => router.push({
    pathname: '/pago',
    params: {
      hospedajeId: '8',
      hospedajeNombre: 'Casa Colonial',
      monto: '50',
      checkin: new Date().toISOString().split('T')[0],
      checkout: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    },
  }),
};

export default function Hospedaje8() {
  return <HospedajeScreen data={data} />;
}