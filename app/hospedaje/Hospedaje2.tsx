import HospedajeScreen, { HospedajeDetalle } from '../../components/HospedajeScreen';

const data: HospedajeDetalle = {
  nombre: 'Hotel Cuenca',
  ubicacion: 'Chola Cuencana, cerca de los Chorizos de la Abuela',
  precio: '$120',
  descripcion: 'Ven con cuidado de engordar y dormir como bebé. Un hotel de primera categoría rodeado de los mejores sabores de Cuenca. Habitaciones amplias, lujosas y con todo lo que necesitas para una estadía perfecta.',
  imagen: require('../../assets/images/Hospedaje2FOTO1.png'),
  tag: 'Premium',
  tagColor: '#eab308',
  habitaciones: 24,
  servicios: [
    { icono: '📶', nombre: 'WiFi gratis' },
    { icono: '🏊', nombre: 'Piscina' },
    { icono: '🍳', nombre: 'Desayuno buffet' },
    { icono: '🅿️', nombre: 'Parqueadero' },
    { icono: '💆', nombre: 'Spa' },
    { icono: '❄️', nombre: 'Aire acondicionado' },
    { icono: '🛎️', nombre: 'Room service' },
    { icono: '🏋️', nombre: 'Gimnasio' },
  ],
  contacto: '+593 99 876 5432',
  whatsapp: '99 876 5432',
};

export default function Hospedaje2() {
  return <HospedajeScreen data={data} />;
}