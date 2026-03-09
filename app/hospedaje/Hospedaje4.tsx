// app/hospedaje/Hospedaje4.tsx
import { router } from 'expo-router';
import HospedajeScreen, { HospedajeDetalle } from '../../components/HospedajeScreen';

const data: HospedajeDetalle = {
  id: 4,
  nombre: 'San Juan',
  ubicacion: 'Parque de la Madre',
  precio: '$90',
  descripcion: 'La mejor opción para elegir. Frente al Parque de la Madre, con vistas increíbles y una atención personalizada que te hará sentir como en casa. Perfecto para familias y parejas.',
  imagen: require('../../assets/images/Hospedaje4FOTO1.png'),
  tag: 'Destacado',
  tagColor: '#a855f7',
  habitaciones: 15,
  servicios: [
    { icono: '📶', nombre: 'WiFi gratis' },
    { icono: '🍳', nombre: 'Desayuno' },
    { icono: '🅿️', nombre: 'Parqueadero' },
    { icono: '❄️', nombre: 'Aire acondicionado' },
    { icono: '🌿', nombre: 'Jardín' },
    { icono: '📺', nombre: 'TV cable' },
  ],
  contacto: '+593 97 321 6548',
  whatsapp: '97 321 6548',
  onReservar: () => router.push({
    pathname: '/pago',
    params: {
      hospedajeId:     '4',
      hospedajeNombre: 'San Juan',
      monto:           '90',
      checkin:         new Date().toISOString().split('T')[0],
      checkout:        new Date(Date.now() + 86400000).toISOString().split('T')[0],
    },
  }),
};

export default function Hospedaje4() {
  return <HospedajeScreen data={data} />;
}