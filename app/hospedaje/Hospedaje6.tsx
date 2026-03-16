import HospedajeScreen, { HospedajeDetalle } from '../../components/HospedajeScreen';
import { router } from 'expo-router';

const data: HospedajeDetalle = {
  nombre: 'El Ventanal',
  ubicacion: 'Av. Solano, esquina con Remigio Crespo',
  precio: '$65',
  descripcion: 'Vistas panorámicas del Tomebamba desde cada habitación. Despierta con el sonido del río y el verde de los eucaliptos.',
  imagen: require('../../assets/images/hospedaje6_foto1.png'),
  tag: 'Vistas',
  tagColor: '#06b6d4',
  habitaciones: 10,
  servicios: [
    { icono: '📶', nombre: 'WiFi gratis' },
    { icono: '🍳', nombre: 'Desayuno' },
    { icono: '❄️', nombre: 'Aire acondicionado' },
    { icono: '🅿️', nombre: 'Parqueadero' },
    { icono: '🌊', nombre: 'Vista al río' },
    { icono: '📺', nombre: 'TV cable' },
  ],
  contacto: '+593 99 345 6789',
  whatsapp: '99 345 6789',
  id: 6,
  onReservar: () => router.push({
    pathname: '/pago',
    params: {
      hospedajeId:     '6',
      hospedajeNombre: 'El Ventanal',
      monto:           '65',
      checkin:         new Date().toISOString().split('T')[0],
      checkout:        new Date(Date.now() + 86400000).toISOString().split('T')[0],
    },
  }),
};

export default function Hospedaje5() {
  return <HospedajeScreen data={data} />;
}