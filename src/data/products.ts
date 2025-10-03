export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: 'men' | 'women' | 'kids';
  description: string;
  features: string[];
}

export const products: Product[] = [
  {
    id: 'precision-putter',
    name: 'Precision Putter',
    price: 249.99,
    image: '/Gemini_Generated_Image_9pmrtr9pmrtr9pmr.png',
    category: 'men',
    description: 'Engineered for accuracy and control, the Precision Putter features a matte black finish with optimal weight distribution for consistent putting performance.',
    features: [
      'CNC milled face for precise ball control',
      'Premium matte black finish',
      'Optimized weight distribution',
      'Tour-proven design',
      'Includes premium headcover'
    ]
  },
  {
    id: 'signature-driver-cover',
    name: 'Signature Driver Cover',
    price: 79.99,
    image: '/Gemini_Generated_Image_d1hrxcd1hrxcd1hr.png',
    category: 'men',
    description: 'Protect your most valuable club with our premium leather driver headcover. Features the iconic Lag Daddy Golf Co logo and superior padding.',
    features: [
      'Premium synthetic leather construction',
      'Plush interior lining',
      'Embroidered Lag Daddy Golf Co logo',
      'Easy on/off magnetic closure',
      'Water-resistant exterior'
    ]
  },
  {
    id: 'tour-stand-bag',
    name: 'Tour Stand Bag',
    price: 399.99,
    image: '/Gemini_Generated_Image_wsy8wjwsy8wjwsy8.png',
    category: 'men',
    description: 'The ultimate golf bag for serious players. Lightweight yet durable with 14-way top divider and premium organizational features.',
    features: [
      '14-way full-length dividers',
      'Lightweight carbon fiber stand',
      'Multiple insulated pockets',
      'Integrated cart strap system',
      'Premium waterproof fabric'
    ]
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: 'men' | 'women' | 'kids'): Product[] => {
  return products.filter(product => product.category === category);
};
