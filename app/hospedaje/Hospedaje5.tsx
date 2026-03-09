// app/hospedaje/Hospedaje5.tsx
import { router } from 'expo-router';
import HospedajeScreen, { HospedajeDetalle } from '../../components/HospedajeScreen';

const data: HospedajeDetalle = {
  id: 5,
  nombre: 'Casa Jardín',
  ubicacion: 'Sector Yanuncay, Cuenca',
  precio: '$35',
  descripcion: 'Un hospedaje rodeado de naturaleza y tranquilidad. Perfecto para desconectarse del ruido de la ciudad y disfrutar de un ambiente relajante con amplios jardines.',
  imagen: require('../../assets/images/hospedaje5.jpg'),
  tag: 'Naturaleza',
  tagColor: '#22c55e',
  habitaciones: 6,
  servicios: [
    { icono: '📶', nombre: 'WiFi gratis' },
    { icono: '🌳', nombre: 'Jardín amplio' },
    { icono: '🍳', nombre: 'Desayuno' },
    { icono: '🚿', nombre: 'Baño privado' },
    { icono: '🧹', nombre: 'Limpieza diaria' },
    { icono: '🅿️', nombre: 'Parqueadero' },
  ],
  contacto: '+593 99 456 1234',
  whatsapp: '99 456 1234',
  onReservar: () => router.push({
    pathname: '/pago',
    params: {
      hospedajeId: '5',
      hospedajeNombre: 'Casa Jardín',
      monto: '35',
      checkin: new Date().toISOString().split('T')[0],
      checkout: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    },
  }),
};

export default function Hospedaje5() {
  return <HospedajeScreen data={data} />;
}