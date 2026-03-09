// app/hospedaje/Hospedaje9.tsx
import { router } from 'expo-router';
import HospedajeScreen, { HospedajeDetalle } from '../../components/HospedajeScreen';

const data: HospedajeDetalle = {
  id: 9,
  nombre: 'Loft Moderno',
  ubicacion: 'Av. Remigio Crespo, Cuenca',
  precio: '$38',
  descripcion: 'Un loft moderno con diseño minimalista y todas las comodidades para una estadía cómoda y elegante.',
  imagen: require('../../assets/images/hospedaje9.jpg'),
  tag: 'Moderno',
  tagColor: '#6366f1',
  habitaciones: 4,
  servicios: [
    { icono: '📶', nombre: 'WiFi rápido' },
    { icono: '📺', nombre: 'Smart TV' },
    { icono: '🍳', nombre: 'Cocina equipada' },
    { icono: '🚿', nombre: 'Baño privado' },
    { icono: '🧹', nombre: 'Limpieza diaria' },
  ],
  contacto: '+593 95 444 7890',
  whatsapp: '95 444 7890',
  onReservar: () => router.push({
    pathname: '/pago',
    params: {
      hospedajeId: '9',
      hospedajeNombre: 'Loft Moderno',
      monto: '38',
      checkin: new Date().toISOString().split('T')[0],
      checkout: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    },
  }),
};

export default function Hospedaje9() {
  return <HospedajeScreen data={data} />;
}