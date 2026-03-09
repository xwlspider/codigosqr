export interface Hospedaje {
  id: number;
  nombre: string;
  ubicacion: string;
  precio: string;
  descripcion: string;
  imagen: any;
  ruta: string;
  tag: string;
  tagColor: string;
}

export const HOSPEDAJES: Hospedaje[] = [
  // ─── Hospedajes originales ────────────────────────────────────────────────
  {
    id: 1,
    nombre: 'Dreams',
    ubicacion: 'Simón Bolívar, junto a Dos Chorreras',
    precio: '$30',
    descripcion: 'Pasa aquí junto a las delicias más esperadas y una noche en tus sueños cerca al Parque Calderón de Cuenca.',
    imagen: require('../../assets/images/Hospedaje1FOTO1.png'),
    ruta: '/hospedaje/Hospedaje1',
    tag: 'Popular',
    tagColor: '#f97316',
  },
  {
    id: 2,
    nombre: 'Hotel Cuenca',
    ubicacion: 'Chola Cuencana, cerca de los Chorizos de la Abuela',
    precio: '$120',
    descripcion: 'Ven con cuidado de engordar y dormir como bebé.',
    imagen: require('../../assets/images/Hospedaje2FOTO1.png'),
    ruta: '/hospedaje/Hospedaje2',
    tag: 'Premium',
    tagColor: '#eab308',
  },
  {
    id: 3,
    nombre: 'El Río',
    ubicacion: 'Simón Bolívar, junto a Tutto Freddo',
    precio: '$12',
    descripcion: 'Te vamos a amar, elígenos.',
    imagen: require('../../assets/images/Hospedaje3FOTO1.png'),
    ruta: '/hospedaje/Hospedaje3',
    tag: 'Económico',
    tagColor: '#22c55e',
  },
  {
    id: 4,
    nombre: 'San Juan',
    ubicacion: 'Parque de la Madre',
    precio: '$90',
    descripcion: 'La mejor opción para elegir.',
    imagen: require('../../assets/images/Hospedaje4FOTO1.png'),
    ruta: '/hospedaje/Hospedaje4',
    tag: 'Destacado',
    tagColor: '#a855f7',
  },

  {
    id: 5,
    nombre: 'Casa Tomada',
    ubicacion: 'Calle Larga, frente al Museo del Sombrero',
    precio: '$45',
    descripcion: 'Una casona colonial restaurada con alma bohemia. Paredes de adobe, techos altos y un patio con buganvillas que te harán olvidar el reloj.',
    imagen: require('../../assets/images/Hospedaje5FOTO1.png'),
    ruta: '/hospedaje/Hospedaje5',
    tag: 'Boutique',
    tagColor: '#ec4899',
  },
  {
    id: 6,
    nombre: 'El Ventanal',
    ubicacion: 'Av. Solano, esquina con Remigio Crespo',
    precio: '$65',
    descripcion: 'Vistas panorámicas del Tomebamba desde cada habitación. Despierta con el sonido del río y el verde de los eucaliptos.',
    imagen: require('../../assets/images/Hospedaje6FOTO1.png'),
    ruta: '/hospedaje/Hospedaje6',
    tag: 'Vistas',
    tagColor: '#06b6d4',
  },
  {
    id: 7,
    nombre: 'Posada del Barranco',
    ubicacion: 'Bajada del Padrón, orillas del Tomebamba',
    precio: '$38',
    descripcion: 'Al borde del barranco más famoso de Cuenca. Silencio, naturaleza y una hospitalidad que te hace sentir como en casa.',
    imagen: require('../../assets/images/Hospedaje7FOTO1.png'),
    ruta: '/hospedaje/Hospedaje7',
    tag: 'Naturaleza',
    tagColor: '#16a34a',
  },
  {
    id: 8,
    nombre: 'Suite Turi',
    ubicacion: 'Mirador de Turi, vía a Baños',
    precio: '$150',
    descripcion: 'El único hospedaje con vista completa a toda la ciudad iluminada de noche. Una experiencia que no se repite.',
    imagen: require('../../assets/images/Hospedaje8FOTO1.png'),
    ruta: '/hospedaje/Hospedaje8',
    tag: 'Lujo',
    tagColor: '#f59e0b',
  },
  {
    id: 9,
    nombre: 'La Mochilera',
    ubicacion: 'Gran Colombia, cerca del terminal de buses',
    precio: '$10',
    descripcion: 'El punto de encuentro de los viajeros del mundo. Camas cómodas, cocina compartida y mucha vida social.',
    imagen: require('../../assets/images/Hospedaje9FOTO1.png'),
    ruta: '/hospedaje/Hospedaje9',
    tag: 'Hostal',
    tagColor: '#84cc16',
  },
  {
    id: 10,
    nombre: 'Hotel Yanuncay',
    ubicacion: 'Av. 12 de Abril, junto al río Yanuncay',
    precio: '$75',
    descripcion: 'Moderno y tranquilo, al costado del río que serpentea entre jardines. Ideal para familias y parejas que buscan calma.',
    imagen: require('../../assets/images/Hospedaje10FOTO1.png'),
    ruta: '/hospedaje/Hospedaje10',
    tag: 'Familiar',
    tagColor: '#3b82f6',
  },
];