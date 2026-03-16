// app/hospedaje/Hospedaje3.tsx
import { router } from 'expo-router';
import HospedajeScreen, { HospedajeDetalle } from '../../components/HospedajeScreen';

const data: HospedajeDetalle = {
  id: 3,
  nombre: 'El Río',
  ubicacion: 'Simón Bolívar, junto a Tutto Freddo',
  precio: '$12',
  descripcion: 'Te vamos a amar, elígenos. La opción más económica sin sacrificar comodidad. Ubicado en el corazón de Cuenca, ideal para mochileros y viajeros que buscan lo esencial con mucho cariño.',
  imagen: require('../../assets/images/hospedaje3_foto1.png'),
  tag: 'Económico',
  tagColor: '#22c55e',
  habitaciones: 6,
  servicios: [
    { icono: '📶', nombre: 'WiFi gratis' },
    { icono: '☕', nombre: 'Café incluido' },
    { icono: '🧺', nombre: 'Lavandería' },
    { icono: '🔒', nombre: 'Casilleros' },
  ],
  contacto: '+593 96 543 2109',
  whatsapp: '96 543 2109',
  onReservar: () => router.push({
    pathname: '/pago',
    params: {
      hospedajeId:     '3',
      hospedajeNombre: 'El Río',
      monto:           '12',
      checkin:         new Date().toISOString().split('T')[0],
      checkout:        new Date(Date.now() + 86400000).toISOString().split('T')[0],
    },
  }),
};

export default function Hospedaje3() {
  return <HospedajeScreen data={data} />;
}