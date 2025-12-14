
export enum Category {
  SHOES = '농구화',
  BALL = '농구공',
  ACCESSORY = '보호대/기어',
  JERSEY = '의류/저지'
}

export interface ProductSpecs {
  traction: number;      // 접지력
  cushion: number;       // 쿠셔닝
  support: number;       // 발목 지지
  weight: number;        // 경량성 (가벼울수록 점수 높음)
  durability: number;    // 내구성
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface PlayerInfo {
  name: string;
  team: string;
  comment: string;
  imageUrl?: string; // Add optional image url
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: Category;
  price: number; // approximate price in KRW
  imageUrl: string;
  rating: number; // 1-5
  description: string;
  buyUrl: string; // usually a search query url
  specs?: ProductSpecs; // Optional, mainly for shoes
  reviews?: Review[];
  relatedPlayers?: PlayerInfo[]; // Manually added player data to override/skip AI
}

export interface RecommendationParams {
  height: number;
  weight: number;
  position: string;
  playStyle: string;
  injuryHistory: string; // Added injury history field
}

export interface AIRecommendation {
  productId: string; // Added to link to internal DB
  productName: string;
  reason: string;
  suitableFor: string;
  matchPercentage: number; // Added for circular graph
  specs?: ProductSpecs; // Made optional as we might use the static product specs
}
