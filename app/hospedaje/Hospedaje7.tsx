import HospedajeScreen, { HospedajeDetalle } from '../../components/HospedajeScreen';
import { router } from 'expo-router';

const data: HospedajeDetalle = {
  nombre: 'Posada del Barranco',
  ubicacion: 'Bajada del Padrón, orillas del Tomebamba',
  precio: '$38',
  descripcion: 'Al borde del barranco más famoso de Cuenca. Silencio, naturaleza y una hospitalidad que te hace sentir como en casa.',
  imagen: require('../../assets/images/hospedaje7_foto1.png'),
  tag: 'Naturaleza',
  tagColor: '#16a34a',
  habitaciones: 6,
  servicios: [
    { icono: '📶', nombre: 'WiFi gratis' },
    { icono: '🌿', nombre: 'Jardín natural' },
    { icono: '☕', nombre: 'Café incluido' },
    { icono: '🔒', nombre: 'Seguridad 24h' },
  ],
  contacto: '+593 96 456 7890',
  whatsapp: '96 456 7890',
  id: 7,
  onReservar: () => router.push({
    pathname: '/pago',
    params: {
      hospedajeId:     '7',
      hospedajeNombre: 'Posada del Barranco',
      monto:           '38',
      checkin:         new Date().toISOString().split('T')[0],
      checkout:        new Date(Date.now() + 86400000).toISOString().split('T')[0],
    },
  }),
};

export default function Hospedaje7() {
  return <HospedajeScreen data={data} />;
}