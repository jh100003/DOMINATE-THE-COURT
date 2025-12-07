import { Category, Product } from './types';

// Helper to generate search URL
const getSearchUrl = (query: string) => `https://www.google.com/search?q=${encodeURIComponent(query + ' 구매')}&tbm=shop`;

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Nike LeBron XXI',
    brand: 'Nike',
    category: Category.SHOES,
    price: 229000,
    rating: 4.8,
    description: '최상의 쿠셔닝과 지지력을 제공하는 르브론 제임스의 21번째 시그니처. 줌 터보와 쿠실론 2.0의 조합으로 폭발적인 에너지를 지원합니다.',
    imageUrl: 'https://m.media-amazon.com/images/I/71J1k7-8lmL._AC_SX695_.jpg',
    buyUrl: getSearchUrl('Nike LeBron XXI'),
    specs: { traction: 9, cushion: 10, support: 9, weight: 7, durability: 8 },
    reviews: [
      { id: 'r1', userName: 'KingJamesFan', rating: 5, comment: '쿠셔닝이 진짜 미쳤습니다. 무릎 아프신 분들 강추!', date: '2024-03-10' },
      { id: 'r2', userName: 'Baller123', rating: 4, comment: '발목 지지는 좋은데 약간 무거운 감이 있네요.', date: '2024-03-12' }
    ]
  },
  {
    id: '2',
    name: 'Under Armour Curry 11',
    brand: 'Under Armour',
    category: Category.SHOES,
    price: 199000,
    rating: 4.7,
    description: 'UA Flow 기술이 적용되어 고무 아웃솔 없이 미친듯한 접지력을 제공합니다. 커리의 움직임에 최적화된 경량성과 접지력을 자랑합니다.',
    imageUrl: 'https://m.media-amazon.com/images/I/61Kq-g+-DYL._AC_SY695_.jpg',
    buyUrl: getSearchUrl('Under Armour Curry 11'),
    specs: { traction: 10, cushion: 8, support: 7, weight: 10, durability: 6 },
    reviews: [
      { id: 'r3', userName: 'ThreePointShooter', rating: 5, comment: '접지력 하나는 역대급입니다. 삑삑 소리부터 다름.', date: '2024-02-28' }
    ]
  },
  {
    id: '3',
    name: 'Adidas AE 1',
    brand: 'Adidas',
    category: Category.SHOES,
    price: 169000,
    rating: 4.9,
    description: '앤서니 에드워즈의 첫 시그니처. JET BOOST 기술과 미래지향적인 허니콤 디자인으로 최고의 통기성과 지지력을 제공합니다.',
    imageUrl: 'https://m.media-amazon.com/images/I/71+2+1t+LBL._AC_SY695_.jpg',
    buyUrl: getSearchUrl('Adidas AE 1 Basketball'),
    specs: { traction: 9, cushion: 9, support: 9, weight: 6, durability: 9 },
    reviews: [
      { id: 'r4', userName: 'AntMan', rating: 5, comment: '디자인이 너무 예뻐서 샀는데 성능도 좋네요.', date: '2024-03-15' },
      { id: 'r5', userName: 'HoopsLife', rating: 5, comment: '무게가 좀 있지만 핏팅감이 예술입니다.', date: '2024-03-18' }
    ]
  },
  {
    id: '4',
    name: 'Nike Kobe 6 Protro',
    brand: 'Nike',
    category: Category.SHOES,
    price: 259000,
    rating: 5.0,
    description: '전설적인 코비 6의 복각판. 맘바 멘탈리티를 상징하며, 로우컷 농구화 중 최고의 퍼포먼스와 핏을 자랑합니다.',
    imageUrl: 'https://m.media-amazon.com/images/I/61-A7Y5WcLL._AC_UY1000_.jpg',
    buyUrl: getSearchUrl('Nike Kobe 6 Protro'),
    specs: { traction: 10, cushion: 8, support: 8, weight: 9, durability: 7 },
    reviews: [
      { id: 'r6', userName: 'MambaForever', rating: 5, comment: '설명이 필요 없는 명기. 비싸지만 값어치 합니다.', date: '2024-01-20' }
    ]
  },
  {
    id: '5',
    name: 'Wilson Evolution',
    brand: 'Wilson',
    category: Category.BALL,
    price: 85000,
    rating: 4.9,
    description: '실내 농구공의 표준. 마이크로파이버 복합 가죽으로 제작되어 부드러운 터치감과 일관된 그립을 제공합니다.',
    imageUrl: 'https://m.media-amazon.com/images/I/91M-1E-C6EL._AC_SL1500_.jpg',
    buyUrl: getSearchUrl('Wilson Evolution Basketball')
  },
  {
    id: '6',
    name: 'Jordan Luka 2',
    brand: 'Jordan',
    category: Category.SHOES,
    price: 159000,
    rating: 4.6,
    description: '루카 돈치치의 스텝백을 위한 설계. 횡방향 움직임을 강력하게 제어하는 IsoPlate 기술이 적용되었습니다.',
    imageUrl: 'https://m.media-amazon.com/images/I/71j+6qE+mIL._AC_SX695_.jpg',
    buyUrl: getSearchUrl('Jordan Luka 2'),
    specs: { traction: 8, cushion: 7, support: 10, weight: 7, durability: 8 }
  },
  {
    id: '7',
    name: 'Way of Wade 10',
    brand: 'Li-Ning',
    category: Category.SHOES,
    price: 289000,
    rating: 4.9,
    description: '드웨인 웨이드의 브랜드 리닝의 역작. 카본 플레이트와 붐 쿠셔닝으로 폭발적인 탄성을 제공하는 하이엔드 모델입니다.',
    imageUrl: 'https://m.media-amazon.com/images/I/71X8NdnCs+L._AC_SL1200_.jpg',
    buyUrl: getSearchUrl('Li-Ning Way of Wade 10'),
    specs: { traction: 10, cushion: 10, support: 9, weight: 10, durability: 7 }
  },
  {
    id: '8',
    name: 'Jordan Tatum 1',
    brand: 'Jordan',
    category: Category.SHOES,
    price: 139000,
    rating: 4.5,
    description: '제이슨 테이텀의 첫 시그니처. 조던 브랜드 라인업 중 가장 가벼운 무게를 자랑하며 경쾌한 플레이를 지원합니다.',
    imageUrl: 'https://m.media-amazon.com/images/I/61M0-i4yLqL._AC_SX695_.jpg',
    buyUrl: getSearchUrl('Jordan Tatum 1'),
    specs: { traction: 8, cushion: 7, support: 6, weight: 10, durability: 5 }
  },
  {
    id: '9',
    name: 'Nike KD 16',
    brand: 'Nike',
    category: Category.SHOES,
    price: 189000,
    rating: 4.7,
    description: '케빈 듀란트를 위한 다재다능한 신발. 에어 줌 스트로벨과 줌 에어의 조합으로 푹신하면서도 반발력이 좋습니다.',
    imageUrl: 'https://m.media-amazon.com/images/I/71gXj2A+RlL._AC_SX695_.jpg',
    buyUrl: getSearchUrl('Nike KD 16'),
    specs: { traction: 9, cushion: 9, support: 8, weight: 8, durability: 7 }
  },
  {
    id: '10',
    name: 'Adidas Harden Vol. 8',
    brand: 'Adidas',
    category: Category.SHOES,
    price: 209000,
    rating: 4.6,
    description: '제임스 하든의 유니크한 스타일. 풀 렝스 JET BOOST가 적용되어 충격 흡수와 에너지 리턴이 뛰어납니다.',
    imageUrl: 'https://m.media-amazon.com/images/I/61S-M4+y+gL._AC_SX695_.jpg',
    buyUrl: getSearchUrl('Adidas Harden Vol 8'),
    specs: { traction: 8, cushion: 10, support: 9, weight: 5, durability: 8 }
  },
  {
    id: '11',
    name: 'McDavid Hex Knee Pad',
    brand: 'McDavid',
    category: Category.ACCESSORY,
    price: 45000,
    rating: 4.6,
    description: '프로 선수들이 가장 많이 사용하는 무릎 보호대. 벌집 모양의 헥스 패드가 충격을 효과적으로 분산시킵니다.',
    imageUrl: 'https://m.media-amazon.com/images/I/71I6o3e3+XL._AC_SL1500_.jpg',
    buyUrl: getSearchUrl('McDavid Hex Knee Pad')
  },
  {
    id: '12',
    name: 'Molten BG4500',
    brand: 'Molten',
    category: Category.BALL,
    price: 95000,
    rating: 4.8,
    description: 'FIBA 공식 경기구 라인업. 천연 가죽의 질감을 재현한 프리미엄 합성 가죽과 12조각 패턴의 그립감.',
    imageUrl: 'https://m.media-amazon.com/images/I/81k1kX-A+KL._AC_SL1500_.jpg',
    buyUrl: getSearchUrl('Molten BG4500')
  },
  {
    id: '13',
    name: 'Nike G.T. Cut 3',
    brand: 'Nike',
    category: Category.SHOES,
    price: 209000,
    rating: 4.8,
    description: '줌X 폼이 적용된 최초의 농구화. 코트 필과 에너지 리턴의 완벽한 조화를 이루며, 빠른 컷 동작에 최적화되었습니다.',
    imageUrl: 'https://m.media-amazon.com/images/I/61s7T8+0yBL._AC_SY695_.jpg',
    buyUrl: getSearchUrl('Nike GT Cut 3'),
    specs: { traction: 10, cushion: 9, support: 8, weight: 9, durability: 7 }
  },
  {
    id: '14',
    name: 'Puma MB.03',
    brand: 'Puma',
    category: Category.SHOES,
    price: 169000,
    rating: 4.7,
    description: '라멜로 볼의 시그니처. 외계인 같은 디자인과 Nitro 폼의 폭발적인 반발력으로 창의적인 플레이를 지원합니다.',
    imageUrl: 'https://m.media-amazon.com/images/I/71S8-W-p+lL._AC_SY695_.jpg',
    buyUrl: getSearchUrl('Puma MB.03'),
    specs: { traction: 9, cushion: 8, support: 8, weight: 8, durability: 8 }
  },
  {
    id: '15',
    name: 'Nike Sabrina 1',
    brand: 'Nike',
    category: Category.SHOES,
    price: 139000,
    rating: 4.9,
    description: '사브리나 이오네스쿠의 첫 시그니처. 리액트 폼과 줌 에어의 조합으로 남녀 모두에게 사랑받는 가성비 최고의 모델.',
    imageUrl: 'https://m.media-amazon.com/images/I/71K1j-y+N0L._AC_SY695_.jpg',
    buyUrl: getSearchUrl('Nike Sabrina 1'),
    specs: { traction: 9, cushion: 7, support: 7, weight: 10, durability: 8 }
  },
  {
    id: '16',
    name: 'New Balance TWO WXY v4',
    brand: 'New Balance',
    category: Category.SHOES,
    price: 159000,
    rating: 4.7,
    description: '포지션리스 농구를 위한 최적의 선택. FuelCell과 Fresh Foam의 하이브리드 쿠셔닝으로 모든 움직임을 커버합니다.',
    imageUrl: 'https://m.media-amazon.com/images/I/71I+F2WfBBL._AC_SX695_.jpg',
    buyUrl: getSearchUrl('New Balance TWO WXY v4'),
    specs: { traction: 9, cushion: 8, support: 9, weight: 8, durability: 8 }
  },
  {
    id: '17',
    name: 'Nike Ja 1',
    brand: 'Nike',
    category: Category.SHOES,
    price: 119000,
    rating: 4.6,
    description: '자 모란트의 폭발적인 점프를 위한 줌 에어 탑재. 미니멀한 디자인과 뛰어난 접지력으로 가드들에게 인기가 높습니다.',
    imageUrl: 'https://m.media-amazon.com/images/I/71Y-1-A+k+L._AC_SX695_.jpg',
    buyUrl: getSearchUrl('Nike Ja 1'),
    specs: { traction: 9, cushion: 6, support: 7, weight: 9, durability: 7 }
  },
  {
    id: '18',
    name: 'Nike Book 1',
    brand: 'Nike',
    category: Category.SHOES,
    price: 169000,
    rating: 4.5,
    description: '데빈 부커의 첫 시그니처. 라이프스타일 슈즈 같은 클래식한 디자인 내부에 쿠실론 2.0과 줌 에어 퍼포먼스가 숨겨져 있습니다.',
    imageUrl: 'https://m.media-amazon.com/images/I/61r+X2+LgL._AC_SY695_.jpg',
    buyUrl: getSearchUrl('Nike Book 1'),
    specs: { traction: 8, cushion: 8, support: 7, weight: 8, durability: 8 }
  },
  {
    id: '19',
    name: 'Spalding TF-1000 Legacy',
    brand: 'Spalding',
    category: Category.BALL,
    price: 75000,
    rating: 4.7,
    description: '실내 농구공의 클래식. 땀이 날수록 그립이 좋아지는 습도 조절 기능이 탁월하여 오랫동안 사랑받아온 모델입니다.',
    imageUrl: 'https://m.media-amazon.com/images/I/81+f8+k+L._AC_SL1500_.jpg',
    buyUrl: getSearchUrl('Spalding TF-1000 Legacy')
  },
  {
    id: '20',
    name: 'Zamst A2-DX Ankle Brace',
    brand: 'Zamst',
    category: Category.ACCESSORY,
    price: 89000,
    rating: 4.9,
    description: '스테판 커리가 사용하여 유명해진 발목 보호대. 발목 꺾임을 물리적으로 방지하는 강력한 가드가 특징입니다.',
    imageUrl: 'https://m.media-amazon.com/images/I/71X8+L+k+L._AC_SL1500_.jpg',
    buyUrl: getSearchUrl('Zamst A2-DX')
  },
  {
    id: '21',
    name: 'Nike Elite Crew Socks',
    brand: 'Nike',
    category: Category.ACCESSORY,
    price: 18000,
    rating: 4.8,
    description: '농구인들의 필수품. 발바닥 쿠셔닝과 흡습속건 기능으로 물집을 방지하고 장시간 플레이에도 편안함을 제공합니다.',
    imageUrl: 'https://m.media-amazon.com/images/I/71+f8+k+L._AC_SL1500_.jpg',
    buyUrl: getSearchUrl('Nike Elite Crew Socks')
  },
  {
    id: '22',
    name: 'Rigorer AR1',
    brand: 'Rigorer',
    category: Category.SHOES,
    price: 129000,
    rating: 4.7,
    description: '오스틴 리브스의 시그니처. 뛰어난 가성비와 독특한 고치(Cocoon) 갑피 디자인으로 발을 포근하게 감싸줍니다.',
    imageUrl: 'https://m.media-amazon.com/images/I/61+f8+k+L._AC_SY695_.jpg',
    buyUrl: getSearchUrl('Rigorer AR1'),
    specs: { traction: 8, cushion: 8, support: 8, weight: 8, durability: 8 }
  },
  {
    id: '23',
    name: 'Nike LeBron NXXT Gen',
    brand: 'Nike',
    category: Category.SHOES,
    price: 189000,
    rating: 4.8,
    description: '르브론 21보다 가볍고 날렵한 파생 모델. 줌 터보 유닛이 탑재되어 더 빠른 움직임을 선호하는 포워드들에게 적합합니다.',
    imageUrl: 'https://m.media-amazon.com/images/I/71J+k7-8lmL._AC_SX695_.jpg',
    buyUrl: getSearchUrl('Nike LeBron NXXT Gen'),
    specs: { traction: 9, cushion: 9, support: 8, weight: 8, durability: 7 }
  },
  {
    id: '24',
    name: 'Shock Doctor Gel Max',
    brand: 'Shock Doctor',
    category: Category.ACCESSORY,
    price: 15000,
    rating: 4.5,
    description: '격렬한 플레이 중 치아와 턱을 보호하는 필수 안전 장비. 열 성형으로 개인 치아에 딱 맞는 핏을 제공합니다.',
    imageUrl: 'https://m.media-amazon.com/images/I/61+f8+k+L._AC_SL1500_.jpg',
    buyUrl: getSearchUrl('Shock Doctor Gel Max Mouthguard')
  }
];

export const POSITIONS = [
  '가드 (Point Guard / Shooting Guard)',
  '포워드 (Small Forward / Power Forward)',
  '센터 (Center)',
  '올라운더 (All-Rounder)'
];