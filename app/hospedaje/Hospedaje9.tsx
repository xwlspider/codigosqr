import HospedajeScreen, { HospedajeDetalle } from '../../components/HospedajeScreen';
import { router } from 'expo-router';

const data: HospedajeDetalle = {
  nombre: 'La Mochilera',
  ubicacion: 'Gran Colombia, cerca del terminal de buses',
  precio: '$10',
  descripcion: 'El punto de encuentro de los viajeros del mundo. Camas cómodas, cocina compartida y mucha vida social.',
  imagen: require('../../assets/images/hospedaje9_foto1.png'),
  tag: 'Hostal',
  tagColor: '#84cc16',
  habitaciones: 4,
  servicios: [
    { icono: '📶', nombre: 'WiFi gratis' },
    { icono: '🍽️', nombre: 'Cocina compartida' },
    { icono: '🧺', nombre: 'Lavandería' },
    { icono: '🔒', nombre: 'Casilleros' },
    { icono: '🗺️', nombre: 'Info turística' },
  ],
  contacto: '+593 98 678 9012',
  whatsapp: '98 678 9012',
  id: 9,
  onReservar: () => router.push({
    pathname: '/pago',
    params: {
      hospedajeId:     '9',
      hospedajeNombre: 'La Mochilera',
      monto:           '10',
      checkin:         new Date().toISOString().split('T')[0],
      checkout:        new Date(Date.now() + 86400000).toISOString().split('T')[0],
    },
  }),
};

export default function Hospedaje8() {
  return <HospedajeScreen data={data} />;
}