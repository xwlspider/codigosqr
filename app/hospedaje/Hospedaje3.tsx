import HospedajeScreen, { HospedajeDetalle } from '../../components/HospedajeScreen';

const data: HospedajeDetalle = {
  nombre: 'El Río',
  ubicacion: 'Simón Bolívar, junto a Tutto Freddo',
  precio: '$12',
  descripcion: 'Te vamos a amar, elígenos. La opción más económica sin sacrificar comodidad. Ubicado en el corazón de Cuenca, ideal para mochileros y viajeros que buscan lo esencial con mucho cariño.',
  imagen: require('../../assets/images/Hospedaje3FOTO1.png'),
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
};

export default function Hospedaje3() {
  return <HospedajeScreen data={data} />;
}