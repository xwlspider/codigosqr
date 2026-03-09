import { router } from 'expo-router';
import HospedajeScreen, { HospedajeDetalle } from '../../components/HospedajeScreen';

const data: HospedajeDetalle = {
  nombre: 'Casa Tomada',
  ubicacion: 'Calle Larga, frente al Museo del Sombrero',
  precio: '$45',
  descripcion: 'Una casona colonial restaurada con alma bohemia. Paredes de adobe, techos altos y un patio con buganvillas que te harán olvidar el reloj.',
  imagen: require('../../assets/images/Hospedaje5FOTO1.png'),
  tag: 'Boutique',
  tagColor: '#ec4899',
  habitaciones: 7,
  servicios: [
    { icono: '📶', nombre: 'WiFi gratis' },
    { icono: '☕', nombre: 'Café incluido' },
    { icono: '🌸', nombre: 'Patio colonial' },
    { icono: '📺', nombre: 'TV cable' },
    { icono: '🧹', nombre: 'Limpieza diaria' },
  ],
  contacto: '+593 98 234 5678',
  whatsapp: '98 234 5678',
  id: 5,
   onReservar: () => router.push({
      pathname: '/pago',
      params: {
        hospedajeId:     '5',
        hospedajeNombre: 'Casa Tomada',
        monto:           '45',
        checkin:         new Date().toISOString().split('T')[0],
        checkout:        new Date(Date.now() + 86400000).toISOString().split('T')[0],
      },
    }),
  };


export default function Hospedaje5() {
  return <HospedajeScreen data={data} />;
}