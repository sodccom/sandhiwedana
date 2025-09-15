import { Product } from '../types';

export const sampleProducts: Product[] = [
  {
    id: '1',
    name_si: 'සන්ධි වේදනාහරණී',
    name_en: 'Sandhi Wedanaharanie',
    slug: 'sandhi-wedanaharanie',
    description_si: 'ස්වභාවික ආයුර්වේද ඖෂධයක් වන සන්ধි වේදනාහරණී සන්ධි වේදනාව සහ දැඩි බව ගිනි අවුලුවට සහන සපයයි.',
    description_en: 'A premium Ayurvedic formulation for natural joint pain relief and inflammation reduction. Made with carefully selected herbs following traditional recipes.',
    price_lkr: 3800,
    stock: 150,
    images: [
      'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/4207707/pexels-photo-4207707.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    created_at: '2024-01-01T00:00:00.000Z',
    updated_at: '2024-01-01T00:00:00.000Z',
    featured: true,
  }
];