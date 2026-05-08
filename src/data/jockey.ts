export interface JockeyFacetValue {
  value: string;
  numberOfResults: number;
}

export const JOCKEY_FABRICATIONS: JockeyFacetValue[] = [
  { value: 'Cotton', numberOfResults: 412 },
  { value: 'Microfiber', numberOfResults: 287 },
  { value: 'Modal', numberOfResults: 156 },
  { value: 'Mesh', numberOfResults: 98 },
  { value: 'Bamboo', numberOfResults: 54 },
  { value: 'Spandex', numberOfResults: 134 },
  { value: 'Polyester', numberOfResults: 203 },
  { value: 'Lycra', numberOfResults: 88 },
];

export const JOCKEY_COLLECTIONS: JockeyFacetValue[] = [
  { value: 'EverActive', numberOfResults: 180 },
  { value: 'Seamfree', numberOfResults: 165 },
  { value: 'StayCool+', numberOfResults: 140 },
  { value: 'Heatwick', numberOfResults: 95 },
  { value: 'VentraCool Air', numberOfResults: 110 },
  { value: 'Classic', numberOfResults: 200 },
  { value: 'Sport', numberOfResults: 150 },
  { value: 'Sleep', numberOfResults: 92 },
];

export const JOCKEY_TOTAL_PRODUCTS = 1032;

export interface JockeyProduct {
  id: string;
  name: string;
  price: string;
  chips: string[];
  image: string;
}

export const JOCKEY_PRODUCTS: JockeyProduct[] = [
  // Men's
  {
    id: 'm-htw-ls',
    name: "Men's Heatwick Compression Long Sleeve",
    price: '$54.00',
    chips: ['Heatwick', 'Polyester', 'Activewear'],
    image: '/products/13.jpg',
  },
  {
    id: 'm-bam-flannel',
    name: "Men's Bamboo Flannel Lounge Shirt",
    price: '$58.00',
    chips: ['Bamboo', 'Sleep'],
    image: '/products/133.jpg',
  },
  {
    id: 'm-cot-vneck-3pk',
    name: "Men's Cotton V-Neck Tee - 3 Pack",
    price: '$36.00',
    chips: ['Cotton', 'Classic', 'Tee'],
    image: '/products/LDF.jpg',
  },
  {
    id: 'm-mod-vest',
    name: "Men's Modal Corduroy Lounge Vest",
    price: '$62.00',
    chips: ['Modal', 'Sleep'],
    image: '/products/O3131MB.jpg',
  },
  {
    id: 'm-stc-print-bb',
    name: "Men's StayCool+ Print Boxer Brief",
    price: '$24.00',
    chips: ['StayCool+', 'Microfiber', 'Boxer Brief', 'Cooling'],
    image: '/products/O3MF.jpg',
  },
  {
    id: 'm-sport-trunk-2pk',
    name: "Men's Sport Trunk - 2 Pack",
    price: '$32.00',
    chips: ['Sport', 'Cotton', 'Trunk'],
    image: '/products/OM2B.jpg',
  },
  {
    id: 'm-mic-brief-5pk',
    name: "Men's Microfiber Brief - 5 Pack",
    price: '$29.99',
    chips: ['Microfiber', 'Brief'],
    image: '/products/OM2F.jpg',
  },
  {
    id: 'm-msh-ath-bb',
    name: "Men's Mesh Athletic Boxer Brief",
    price: '$26.00',
    chips: ['Mesh', 'Boxer Brief', 'Cooling'],
    image: '/products/OMF.jpg',
  },
  {
    id: 'm-cls-boxer-4pk',
    name: "Men's Classic Boxer - 4 Pack",
    price: '$42.00',
    chips: ['Classic', 'Cotton', 'Boxer'],
    image: '/products/OMF1.jpg',
  },

  // Women's
  {
    id: 'w-mod-cami-bra',
    name: "Women's Modal Cami Bralette",
    price: '$24.50',
    chips: ['Modal', 'Bralette'],
    image: '/products/DT01.jpg',
  },
  {
    id: 'w-slp-print-bra',
    name: "Women's Sleep Print Bralette",
    price: '$22.00',
    chips: ['Sleep', 'Bralette', 'Cotton'],
    image: '/products/O31MB.jpg',
  },
  {
    id: 'w-eva-tank',
    name: "Women's EverActive Tank",
    price: '$30.00',
    chips: ['EverActive', 'Polyester', 'Tank', 'Activewear'],
    image: '/products/OM12B.jpg',
  },
  {
    id: 'w-htw-bra',
    name: "Women's Heatwick Sports Bra",
    price: '$42.00',
    chips: ['Heatwick', 'Lycra', 'Activewear', 'Bra'],
    image: '/products/OM1B.jpg',
  },
  {
    id: 'w-sf-bralette',
    name: "Women's Seamfree Bralette",
    price: '$24.00',
    chips: ['Seamfree', 'Microfiber', 'Bralette'],
    image: '/products/OM21B.jpg',
  },
  {
    id: 'w-stc-mesh-bra',
    name: "Women's StayCool+ Mesh Bralette",
    price: '$28.00',
    chips: ['StayCool+', 'Mesh', 'Bralette', 'Cooling'],
    image: '/products/OM23B.jpg',
  },
  {
    id: 'w-lyc-yoga-leg',
    name: "Women's Lycra Yoga Legging",
    price: '$58.00',
    chips: ['Lycra', 'Spandex', 'Activewear'],
    image: '/products/OM313B.jpg',
  },
  {
    id: 'w-spx-thong',
    name: "Women's Spandex Invisible Thong",
    price: '$16.00',
    chips: ['Spandex', 'Seamfree', 'Thong'],
    image: '/products/OMB.jpg',
  },
  {
    id: 'w-cot-hipster-set',
    name: "Women's Cotton Bralette & Hipster Set",
    price: '$38.00',
    chips: ['Cotton', 'Bralette', 'Hipster'],
    image: '/products/OMB1.jpg',
  },
  {
    id: 'w-bam-lace-bra',
    name: "Women's Bamboo Lace Bralette",
    price: '$32.00',
    chips: ['Bamboo', 'Bralette'],
    image: '/products/OMB2.jpg',
  },
  {
    id: 'w-mic-thong-4pk',
    name: "Women's Microfiber Thong - 4 Pack",
    price: '$26.99',
    chips: ['Microfiber', 'Thong'],
    image: '/products/OMB3.jpg',
  },
  {
    id: 'w-vca-hipster',
    name: "Women's VentraCool Air Lace Hipster",
    price: '$19.99',
    chips: ['VentraCool Air', 'Polyester', 'Hipster', 'Cooling'],
    image: '/products/OMB4.jpg',
  },
];

export function imageUrlFor(product: JockeyProduct): string {
  return product.image;
}
