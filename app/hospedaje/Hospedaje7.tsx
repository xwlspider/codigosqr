// app/hospedaje/Hospedaje7.tsx
import { router } from 'expo-router';
import HospedajeScreen, { HospedajeDetalle } from '../../components/HospedajeScreen';

const data: HospedajeDetalle = {
  id: 7,
  nombre: 'Rosamia Hotel',
  ubicacion: 'Centro Histórico de Cuenca',
  precio: '$45',
  descripcion: 'Hotel moderno ubicado en el corazón de Cuenca, cerca de restaurantes, museos y lugares turísticos.',
  imagen: require('../../assets/images/hospedaje7.jpg'),
  tag: 'Centro',
  tagColor: '#f59e0b',
  habitaciones: 12,
  servicios: [
    { icono: '📶', nombre: 'WiFi gratis' },
    { icono: '🍳', nombre: 'Desayuno incluido' },
    { icono: '📺', nombre: 'TV cable' },
    { icono: '🛎️', nombre: 'Recepción 24h' },
    { icono: '🚿', nombre: 'Baño privado' },
    { icono: '🧹', nombre: 'Limpieza diaria' },
  ],
  contacto: '+593 97 888 4455',
  whatsapp: '97 888 4455',
  onReservar: () => router.push({
    pathname: '/pago',
    params: {
      hospedajeId: '7',
      hospedajeNombre: 'Rosamia Hotel',
      monto: '45',
      checkin: new Date().toISOString().split('T')[0],
      checkout: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    },
  }),
};

export default function Hospedaje7() {
  return <HospedajeScreen data={data} />;
}