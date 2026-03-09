//logic/data/hospedajes.data.ts

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
  ];