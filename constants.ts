import { Category, Product, Review } from './types';

// Helper to generate search URL
const getSearchUrl = (query: string) => `https://www.google.com/search?q=${encodeURIComponent(query + ' 구매')}&tbm=shop`;

// Helper to generate realistic filler reviews
const createReviews = (baseId: string, totalCount: number, featuredReviews: Review[]): Review[] => {
  const fillerComments = [
    "배송이 빠르고 상품이 좋습니다.",
    "생각보다 훨씬 편하네요. 강추합니다.",
    "사이즈가 딱 맞아요. 정사이즈 추천.",
    "접지력이 미쳤습니다. 코트에서 삑삑 소리 장난 아님.",
    "디자인이 실물 깡패네요. 사진보다 예뻐요.",
    "가격 대비 성능이 아주 만족스럽습니다.",
    "코트에서 신어봤는데 날아다니는 기분!",
    "발목을 잘 잡아줘서 안심하고 뜁니다.",
    "쿠션이 푹신해서 무릎이 안 아파요.",
    "색감이 너무 예뻐요. 다른 색도 사고 싶네요.",
    "농구는 장비빨이라더니 실력이 느는 것 같아요.",
    "내구성이 좋아서 오래 신을 것 같습니다.",
    "친구 추천으로 샀는데 후회 없네요.",
    "발볼이 넓은데도 편하게 잘 맞습니다.",
    "가볍고 통기성이 좋아서 쾌적해요.",
    "선물용으로 샀는데 너무 좋아하네요.",
    "역시 믿고 쓰는 브랜드입니다.",
    "마감 처리가 깔끔하고 퀄리티가 좋습니다.",
    "발을 꽉 잡아주는 핏팅감이 예술입니다.",
    "인생 농구화를 찾았습니다."
  ];

  const reviews = [...featuredReviews];
  const needed = totalCount - featuredReviews.length;

  for (let i = 0; i < needed; i++) {
    const randomDate = new Date(2024, Math.floor(Math.random() * 3), Math.floor(Math.random() * 28) + 1);
    reviews.push({
      id: `${baseId}-gen-${i}`,
      userName: `Baller${Math.floor(Math.random() * 9000) + 1000}`,
      rating: Math.random() > 0.2 ? 5 : 4, // Mostly 4 or 5 stars
      comment: fillerComments[Math.floor(Math.random() * fillerComments.length)],
      date: randomDate.toISOString().split('T')[0]
    });
  }
  return reviews;
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Nike LeBron XXI',
    brand: 'Nike',
    category: Category.SHOES,
    price: 229000,
    rating: 4.8,
    description: '최상의 쿠셔닝과 지지력을 제공하는 르브론 제임스의 21번째 시그니처. 줌 터보와 쿠실론 2.0의 조합으로 폭발적인 에너지를 지원합니다.',
    imageUrl: 'https://ginqsctaaomobkdhgcvt.supabase.co/storage/v1/object/public/DOMINATE%20THE%20COURT/shoes/Nike%20LeBron%20XXI.jpg',
    buyUrl: getSearchUrl('Nike LeBron XXI'),
    specs: { traction: 9, cushion: 10, support: 9, weight: 7, durability: 8 },
    reviews: createReviews('1', 52, [
      { id: 'r1', userName: 'KingJamesFan', rating: 5, comment: '쿠셔닝이 진짜 미쳤습니다. 무릎 아프신 분들 강추!', date: '2024-03-10' },
      { id: 'r2', userName: 'Baller123', rating: 4, comment: '발목 지지는 좋은데 약간 무거운 감이 있네요.', date: '2024-03-12' },
      { id: 'r1-3', userName: 'DunkMaster', rating: 5, comment: '점프 착지할 때 충격 흡수가 예술입니다. 20보다 훨씬 가벼워졌어요.', date: '2024-03-15' },
      { id: 'r1-4', userName: 'LakersNation', rating: 5, comment: '디자인, 성능 뭐 하나 빠지는 게 없습니다. 정사이즈 추천.', date: '2024-03-18' },
      { id: 'r1-5', userName: 'HoopsDad', rating: 4, comment: '가격이 좀 비싸긴 하지만 관절 보호를 위해 투자했습니다.', date: '2024-03-20' },
      { id: 'r1-6', userName: 'RimProtector', rating: 5, comment: '센터 포지션인데 이만한 신발 없습니다.', date: '2024-03-22' }
    ]),
    relatedPlayers: [
      {
        name: "LeBron James",
        team: "Los Angeles Lakers",
        comment: "본인의 21번째 시그니처를 착용하고 압도적인 퍼포먼스를 보여줍니다.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7a/LeBron_James_Lakers.jpg"
      },
      {
        name: "Bronny James",
        team: "USC / NBA Prospect",
        comment: "아버지의 시그니처 라인을 애용하며 대학 무대에서 활약 중입니다.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/23/Bronny_James_%2851966289902%29_%28cropped%29.jpg"
      },
      {
        name: "Jusuf Nurkić",
        team: "Phoenix Suns",
        comment: "강력한 골밑 싸움을 위해 르브론 시리즈의 쿠셔닝을 선호합니다.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Jusuf_Nurki%C4%87_2022.jpg"
      }
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
    imageUrl: 'https://ginqsctaaomobkdhgcvt.supabase.co/storage/v1/object/public/DOMINATE%20THE%20COURT/shoes/Under%20Armour%20Curry%2011.jpg',
    buyUrl: getSearchUrl('Under Armour Curry 11'),
    specs: { traction: 10, cushion: 8, support: 7, weight: 10, durability: 6 },
    reviews: createReviews('2', 48, [
      { id: 'r3', userName: 'ThreePointShooter', rating: 5, comment: '접지력 하나는 역대급입니다. 삑삑 소리부터 다름.', date: '2024-02-28' },
      { id: 'r2-2', userName: 'SplashBro', rating: 5, comment: '가벼워서 날아다니는 기분입니다. 내구성은 좀 아쉽네요.', date: '2024-03-01' },
      { id: 'r2-3', userName: 'GuardPlay', rating: 4, comment: '발볼이 좀 좁게 나온 것 같아요. 반업 추천합니다.', date: '2024-03-05' },
      { id: 'r2-4', userName: 'ChefCurry', rating: 5, comment: '컷인 동작할 때 밀림이 전혀 없습니다. 최고의 가드 농구화.', date: '2024-03-10' }
    ]),
    relatedPlayers: [
      {
        name: "Stephen Curry",
        team: "Golden State Warriors",
        comment: "전매특허인 3점슛과 빠른 오프더볼 무브를 위해 이 가벼운 신발을 착용합니다.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/bf/Stephen_Curry_2016_%28cropped%29.jpg"
      },
      {
        name: "De'Aaron Fox",
        team: "Sacramento Kings",
        comment: "커리 브랜드의 첫 번째 시그니처 선수로 합류하여 UA 모델을 착용합니다.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e0/De%27Aaron_Fox_2018.jpg"
      },
      {
        name: "Seth Curry",
        team: "Charlotte Hornets",
        comment: "형의 브랜드인 커리 라인업을 즐겨 신습니다.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/44/Seth_Curry_2016.jpg"
      }
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
    imageUrl: 'https://ginqsctaaomobkdhgcvt.supabase.co/storage/v1/object/public/DOMINATE%20THE%20COURT/shoes/Adidas%20AE%201.jpg',
    buyUrl: getSearchUrl('Adidas AE 1 Basketball'),
    specs: { traction: 9, cushion: 9, support: 9, weight: 6, durability: 9 },
    reviews: createReviews('3', 45, [
      { id: 'r4', userName: 'AntMan', rating: 5, comment: '디자인이 너무 예뻐서 샀는데 성능도 좋네요.', date: '2024-03-15' },
      { id: 'r5', userName: 'HoopsLife', rating: 5, comment: '무게가 좀 있지만 핏팅감이 예술입니다.', date: '2024-03-18' },
      { id: 'r3-3', userName: 'Addidict', rating: 5, comment: '아디다스가 오랜만에 일냈네요. 쿠션, 접지 모두 만족.', date: '2024-03-20' }
    ]),
    relatedPlayers: [
      {
        name: "Anthony Edwards",
        team: "Minnesota Timberwolves",
        comment: "그의 폭발적인 덩크와 돌파를 지탱해주는 첫 번째 시그니처 모델입니다.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Anthony_Edwards_2021.jpg"
      },
      {
        name: "Jaylen Brown",
        team: "Boston Celtics",
        comment: "아디다스 농구화를 자주 착용하며, AE 1의 퍼포먼스를 높게 평가합니다.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Jaylen_Brown_2021.jpg"
      },
      {
         name: "Trae Young",
         team: "Atlanta Hawks",
         comment: "같은 아디다스 라인업의 동료로서 종종 서로의 신발을 신기도 합니다.",
         imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/22/Trae_Young_2021.jpg"
      }
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
    imageUrl: 'https://ginqsctaaomobkdhgcvt.supabase.co/storage/v1/object/public/DOMINATE%20THE%20COURT/shoes/Nike%20Kobe%206%20Protro.jpg',
    buyUrl: getSearchUrl('Nike Kobe 6 Protro'),
    specs: { traction: 10, cushion: 8, support: 8, weight: 9, durability: 7 },
    reviews: createReviews('4', 42, [
      { id: 'r6', userName: 'MambaForever', rating: 5, comment: '설명이 필요 없는 명기. 비싸지만 값어치 합니다.', date: '2024-01-20' },
      { id: 'r4-2', userName: 'KobeFan824', rating: 5, comment: '구할 수만 있다면 무조건 사세요. 접지력은 타의 추종을 불허함.', date: '2024-02-15' },
      { id: 'r4-3', userName: 'SneakerHead', rating: 5, comment: '가볍고 발에 착 감기는 맛이 일품입니다.', date: '2024-03-01' }
    ]),
    relatedPlayers: [
      {
        name: "Kobe Bryant",
        team: "Los Angeles Lakers",
        comment: "그린치 컬러웨이와 함께 크리스마스 매치에서 전설을 썼습니다.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/56/Kobe_Bryant_2014.jpg"
      },
      {
        name: "DeMar DeRozan",
        team: "Chicago Bulls",
        comment: "리그에서 코비 시리즈를 가장 애용하는 선수 중 한 명입니다.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/DeMar_DeRozan_2022.jpg/440px-DeMar_DeRozan_2022.jpg"
      },
      {
        name: "P.J. Tucker",
        team: "Los Angeles Clippers",
        comment: "NBA 최고의 스니커헤드로, 수많은 희귀 코비 모델을 경기에서 착용합니다.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4f/P.J._Tucker_2021.jpg"
      },
      {
         name: "Caitlin Clark",
         team: "Iowa (NCAA) / WNBA",
         comment: "여자 농구의 슈퍼스타인 그녀도 코비 5와 6를 즐겨 신습니다.",
         imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Sabrina_Ionescu_2020.jpg" // Placeholder as Caitlin image is rare in commons, using Sabrina as similar style or generate generic
      }
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
    imageUrl: 'https://ginqsctaaomobkdhgcvt.supabase.co/storage/v1/object/public/DOMINATE%20THE%20COURT/ball/Wilson%20Evolution.webp',
    buyUrl: getSearchUrl('Wilson Evolution Basketball'),
    reviews: createReviews('5', 38, [
      { id: 'r5-1', userName: 'GymRat', rating: 5, comment: '체육관에서 이 공 꺼내면 다들 좋아합니다.', date: '2024-02-10' },
      { id: 'r5-2', userName: 'ShooterTouch', rating: 5, comment: '그립감이 너무 좋아서 슛이 잘 들어가요.', date: '2024-03-05' },
      { id: 'r5-3', userName: 'IndoorOnly', rating: 4, comment: '야외에서 쓰면 금방 상하니 꼭 실내에서만 쓰세요.', date: '2024-03-20' }
    ])
  },
  {
    id: '6',
    name: 'Jordan Luka 2',
    brand: 'Jordan',
    category: Category.SHOES,
    price: 159000,
    rating: 4.6,
    description: '루카 돈치치의 스텝백을 위한 설계. 횡방향 움직임을 강력하게 제어하는 IsoPlate 기술이 적용되었습니다.',
    imageUrl: 'https://ginqsctaaomobkdhgcvt.supabase.co/storage/v1/object/public/DOMINATE%20THE%20COURT/shoes/Jordan%20Luka%202.jpg',
    buyUrl: getSearchUrl('Jordan Luka 2'),
    specs: { traction: 8, cushion: 7, support: 10, weight: 7, durability: 8 },
    reviews: createReviews('6', 35, [
      { id: 'r6-1', userName: 'StepBackKing', rating: 5, comment: '발목 지지력이 진짜 좋습니다. 스텝백 쏠 때 안정감 굿.', date: '2024-03-01' },
      { id: 'r6-2', userName: 'SlowMo', rating: 4, comment: '쿠션은 조금 단단한 편입니다. 반발력 위주.', date: '2024-03-15' },
      { id: 'r6-3', userName: 'MavsFan', rating: 5, comment: '루카 팬이라 샀는데 디자인도 유니크하고 좋습니다.', date: '2024-03-22' }
    ]),
    relatedPlayers: [
        {
          name: "Luka Dončić",
          team: "Dallas Mavericks",
          comment: "특유의 스텝백과 템포 조절을 위해 발목 지지력이 강화된 모델을 신습니다.",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b8/Luka_Doncic_2021.jpg"
        },
        {
          name: "Grant Williams",
          team: "Charlotte Hornets",
          comment: "전 동료로서 루카의 시그니처를 자주 애용합니다.",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/52/Grant_Williams_2022.jpg"
        },
        {
          name: "Satou Sabally",
          team: "Dallas Wings (WNBA)",
          comment: "같은 댈러스 연고팀의 에이스로서 조던 브랜드를 대표합니다.",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Satou_Sabally.jpg"
        }
    ]
  },
  {
    id: '7',
    name: 'Way of Wade 10',
    brand: 'Li-Ning',
    category: Category.SHOES,
    price: 289000,
    rating: 4.9,
    description: '드웨인 웨이드의 브랜드 리닝의 역작. 카본 플레이트와 붐 쿠셔닝으로 폭발적인 탄성을 제공하는 하이엔드 모델입니다.',
    imageUrl: 'https://ginqsctaaomobkdhgcvt.supabase.co/storage/v1/object/public/DOMINATE%20THE%20COURT/shoes/Way%20of%20Wade%2010.webp',
    buyUrl: getSearchUrl('Li-Ning Way of Wade 10'),
    specs: { traction: 10, cushion: 10, support: 9, weight: 10, durability: 7 },
    reviews: createReviews('7', 30, [
      { id: 'r7-1', userName: 'Flash', rating: 5, comment: '중국 브랜드라고 무시했다가 큰코 다침. 성능은 현존 원탑급.', date: '2024-02-20' },
      { id: 'r7-2', userName: 'HighFlyer', rating: 5, comment: '카본 플레이트 탄성이 미쳤습니다. 점프가 더 잘되는 느낌.', date: '2024-03-05' }
    ]),
    relatedPlayers: [
        {
          name: "Dwyane Wade",
          team: "Retired / Li-Ning",
          comment: "은퇴 후에도 자신의 브랜드 최고 역작이라 칭송받는 모델입니다.",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/36/Dwyane_Wade_2015.jpg"
        },
        {
            name: "D'Angelo Russell",
            team: "Los Angeles Lakers",
            comment: "웨이드 브랜드의 메인 모델로서 WOW 10을 자주 착용합니다.",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/64/D%27Angelo_Russell_Lakers.jpg"
        },
        {
            name: "Jimmy Butler",
            team: "Miami Heat",
            comment: "과거 리닝 모델을 신었으며 웨이드와 절친한 사이입니다.",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Jimmy_Butler_2021.jpg"
        }
    ]
  },
  {
    id: '8',
    name: 'Jordan Tatum 1',
    brand: 'Jordan',
    category: Category.SHOES,
    price: 139000,
    rating: 4.5,
    description: '제이슨 테이텀의 첫 시그니처. 조던 브랜드 라인업 중 가장 가벼운 무게를 자랑하며 경쾌한 플레이를 지원합니다.',
    imageUrl: 'https://ginqsctaaomobkdhgcvt.supabase.co/storage/v1/object/public/DOMINATE%20THE%20COURT/shoes/Jordan%20Tatum%201.jpg',
    buyUrl: getSearchUrl('Jordan Tatum 1'),
    specs: { traction: 8, cushion: 7, support: 6, weight: 10, durability: 5 },
    reviews: createReviews('8', 28, [
      { id: 'r8-1', userName: 'CelticsPride', rating: 5, comment: '진짜 가볍습니다. 안 신은 것 같아요.', date: '2024-03-01' },
      { id: 'r8-2', userName: 'LightWeight', rating: 4, comment: '가벼운 만큼 내구성은 좀 약해 보입니다. 야외 비추.', date: '2024-03-12' }
    ]),
    relatedPlayers: [
        {
            name: "Jayson Tatum",
            team: "Boston Celtics",
            comment: "가벼운 무게를 활용해 코트 위를 날아다닙니다.",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/91/Jayson_Tatum_2021.jpg"
        },
        {
            name: "Paolo Banchero",
            team: "Orlando Magic",
            comment: "조던 브랜드의 신성으로서 테이텀 시리즈를 종종 착용합니다.",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/fc/Paolo_Banchero_2022.jpg"
        },
        {
            name: "Bradley Beal",
            team: "Phoenix Suns",
            comment: "같은 세인트루이스 출신으로 테이텀의 신발을 지지합니다.",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/07/Bradley_Beal_2021.jpg"
        }
    ]
  },
  {
    id: '9',
    name: 'Nike KD 16',
    brand: 'Nike',
    category: Category.SHOES,
    price: 189000,
    rating: 4.7,
    description: '케빈 듀란트를 위한 다재다능한 신발. 에어 줌 스트로벨과 줌 에어의 조합으로 푹신하면서도 반발력이 좋습니다.',
    imageUrl: 'https://ginqsctaaomobkdhgcvt.supabase.co/storage/v1/object/public/DOMINATE%20THE%20COURT/shoes/Nike%20KD%2016.jpg',
    buyUrl: getSearchUrl('Nike KD 16'),
    specs: { traction: 9, cushion: 9, support: 8, weight: 8, durability: 7 },
    reviews: createReviews('9', 25, [
      { id: 'r9-1', userName: 'SlimReaper', rating: 5, comment: '쿠션감이 너무 편안합니다. 오래 뛰어도 발이 안 아파요.', date: '2024-02-28' },
      { id: 'r9-2', userName: 'MidRangeGod', rating: 5, comment: 'KD 시리즈는 실망시키는 법이 없네요. 15보다 힐슬립 개선됨.', date: '2024-03-10' }
    ]),
    relatedPlayers: [
        {
            name: "Kevin Durant",
            team: "Phoenix Suns",
            comment: "편안한 쿠셔닝을 선호하는 그에게 최적화된 모델입니다.",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Kevin_Durant_2021.jpg"
        },
        {
            name: "Chet Holmgren",
            team: "Oklahoma City Thunder",
            comment: "비슷한 체형의 KD를 롤모델로 삼으며 그의 신발을 애용합니다.",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Chet_Holmgren_2022.jpg"
        },
        {
            name: "Mikal Bridges",
            team: "Brooklyn Nets",
            comment: "공수겸장인 그에게 KD 시리즈의 밸런스는 완벽합니다.",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8b/Mikal_Bridges_2021.jpg"
        }
    ]
  },
  {
    id: '10',
    name: 'Adidas Harden Vol. 8',
    brand: 'Adidas',
    category: Category.SHOES,
    price: 209000,
    rating: 4.6,
    description: '제임스 하든의 유니크한 스타일. 풀 렝스 JET BOOST가 적용되어 충격 흡수와 에너지 리턴이 뛰어납니다.',
    imageUrl: 'https://ginqsctaaomobkdhgcvt.supabase.co/storage/v1/object/public/DOMINATE%20THE%20COURT/shoes/Adidas%20Harden%20Vol.%208.jpg',
    buyUrl: getSearchUrl('Adidas Harden Vol 8'),
    specs: { traction: 8, cushion: 10, support: 9, weight: 5, durability: 8 },
    reviews: createReviews('10', 22, [
      { id: 'r10-1', userName: 'BeardGang', rating: 5, comment: '디자인 호불호 갈린다는데 저는 극호. 미래지향적임.', date: '2024-03-05' },
      { id: 'r10-2', userName: 'EuroStep', rating: 4, comment: '쿠션은 진짜 좋은데 통기성은 좀 떨어져요.', date: '2024-03-18' }
    ]),
    relatedPlayers: [
        {
            name: "James Harden",
            team: "Los Angeles Clippers",
            comment: "화려한 스텝백과 유로스텝을 위한 안정성을 제공합니다.",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c5/James_Harden_2021.jpg"
        },
        {
            name: "Jalen Williams",
            team: "Oklahoma City Thunder",
            comment: "떠오르는 신예 스타로 하든 시리즈를 즐겨 신습니다.",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/90/Jalen_Williams.jpg"
        }
    ]
  },
  {
    id: '11',
    name: 'McDavid Hex Knee Pad',
    brand: 'McDavid',
    category: Category.ACCESSORY,
    price: 45000,
    rating: 4.6,
    description: '프로 선수들이 가장 많이 사용하는 무릎 보호대. 벌집 모양의 헥스 패드가 충격을 효과적으로 분산시킵니다.',
    imageUrl: 'https://ginqsctaaomobkdhgcvt.supabase.co/storage/v1/object/public/DOMINATE%20THE%20COURT/accessory/McDavid%20Hex%20Knee%20Pad.jpg',
    buyUrl: getSearchUrl('McDavid Hex Knee Pad'),
    reviews: createReviews('11', 20, [
      { id: 'r11-1', userName: 'KneeSaver', rating: 5, comment: '무릎 꿇을 때 하나도 안 아파요. 필수템.', date: '2024-02-15' }
    ]),
    relatedPlayers: [
        {
            name: "NBA Players",
            team: "Various Teams",
            comment: "대부분의 NBA 선수들이 부상 방지를 위해 착용합니다.",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7a/LeBron_James_Lakers.jpg"
        },
        {
            name: "Dwyane Wade",
            team: "Retired",
            comment: "현역 시절 무릎 보호를 위해 항상 착용했습니다.",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/36/Dwyane_Wade_2015.jpg"
        }
    ]
  },
  {
    id: '12',
    name: 'Molten BG4500',
    brand: 'Molten',
    category: Category.BALL,
    price: 95000,
    rating: 4.8,
    description: 'FIBA 공식 경기구 라인업. 천연 가죽의 질감을 재현한 프리미엄 합성 가죽과 12조각 패턴의 그립감.',
    imageUrl: 'https://ginqsctaaomobkdhgcvt.supabase.co/storage/v1/object/public/DOMINATE%20THE%20COURT/ball/Molten%20BG4500.webp',
    buyUrl: getSearchUrl('Molten BG4500'),
    reviews: createReviews('12', 18, [
      { id: 'r12-1', userName: 'FIBARules', rating: 5, comment: '대회 공인구라 연습용으로 딱입니다.', date: '2024-03-01' }
    ])
  },
  {
    id: '13',
    name: 'Nike G.T. Cut 3',
    brand: 'Nike',
    category: Category.SHOES,
    price: 209000,
    rating: 4.8,
    description: '줌X 폼이 적용된 최초의 농구화. 코트 필과 에너지 리턴의 완벽한 조화를 이루며, 빠른 컷 동작에 최적화되었습니다.',
    imageUrl: 'https://ginqsctaaomobkdhgcvt.supabase.co/storage/v1/object/public/DOMINATE%20THE%20COURT/shoes/Nike%20G.T.%20Cut%203.jpg',
    buyUrl: getSearchUrl('Nike GT Cut 3'),
    specs: { traction: 10, cushion: 9, support: 8, weight: 9, durability: 7 },
    reviews: createReviews('13', 15, [
      { id: 'r13-1', userName: 'QuickCutter', rating: 5, comment: '줌X 폼 느낌이 러닝화처럼 통통 튀어요. 반발력 최고.', date: '2024-03-05' },
      { id: 'r13-2', userName: 'SpeedDemon', rating: 5, comment: '접지력이 1, 2편만큼 좋습니다. 가드분들 강추.', date: '2024-03-15' }
    ]),
    relatedPlayers: [
        {
            name: "Tyrese Haliburton",
            team: "Indiana Pacers",
            comment: "빠른 템포의 공격을 주도하는 그에게 완벽한 에너지 리턴을 제공합니다.",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c2/Tyrese_Haliburton_2022.jpg"
        },
        {
            name: "De'Aaron Fox",
            team: "Sacramento Kings",
            comment: "리그에서 가장 빠른 스피드를 살리기 위해 GT 컷 시리즈를 애용했습니다.",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e0/De%27Aaron_Fox_2018.jpg"
        },
        {
            name: "Jordan Poole",
            team: "Washington Wizards",
            comment: "화려한 드리블과 컷인을 위해 이 신발을 선택합니다.",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Jordan_Poole_2022.jpg"
        }
    ]
  },
  {
    id: '14',
    name: 'Puma MB.03',
    brand: 'Puma',
    category: Category.SHOES,
    price: 169000,
    rating: 4.7,
    description: '라멜로 볼의 시그니처. 외계인 같은 디자인과 Nitro 폼의 폭발적인 반발력으로 창의적인 플레이를 지원합니다.',
    imageUrl: 'https://ginqsctaaomobkdhgcvt.supabase.co/storage/v1/object/public/DOMINATE%20THE%20COURT/shoes/Puma%20MB.03.jpg',
    buyUrl: getSearchUrl('Puma MB.03'),
    specs: { traction: 9, cushion: 8, support: 8, weight: 8, durability: 8 },
    reviews: createReviews('14', 12, [
      { id: 'r14-1', userName: 'MeloBall1', rating: 5, comment: '디자인이 진짜 유니크함. 코트에서 제일 튐.', date: '2024-02-28' }
    ]),
    relatedPlayers: [
        {
            name: "LaMelo Ball",
            team: "Charlotte Hornets",
            comment: "코트 위에서 가장 눈에 띄는 플레이어와 가장 눈에 띄는 신발.",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/15/LaMelo_Ball_2021.jpg"
        },
        {
            name: "Scoot Henderson",
            team: "Portland Trail Blazers",
            comment: "푸마의 또 다른 메인 모델로 종종 MB 시리즈를 신기도 했습니다.",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/69/Scoot_Henderson.jpg"
        }
    ]
  },
  {
    id: '15',
    name: 'Nike Sabrina 1',
    brand: 'Nike',
    category: Category.SHOES,
    price: 139000,
    rating: 4.9,
    description: '사브리나 이오네스쿠의 첫 시그니처. 리액트 폼과 줌 에어의 조합으로 남녀 모두에게 사랑받는 가성비 최고의 모델.',
    imageUrl: 'https://ginqsctaaomobkdhgcvt.supabase.co/storage/v1/object/public/DOMINATE%20THE%20COURT/shoes/Nike%20Sabrina%201.jpg',
    buyUrl: getSearchUrl('Nike Sabrina 1'),
    specs: { traction: 9, cushion: 7, support: 7, weight: 10, durability: 8 },
    reviews: createReviews('15', 10, [
      { id: 'r15-1', userName: 'UnisexBball', rating: 5, comment: '코비 시리즈 느낌 납니다. 가성비 최고.', date: '2024-02-25' }
    ]),
    relatedPlayers: [
        {
            name: "Sabrina Ionescu",
            team: "New York Liberty",
            comment: "WNBA 최고의 슈터 중 한 명이 직접 디자인에 참여했습니다.",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Sabrina_Ionescu_2020.jpg"
        },
        {
            name: "Jrue Holiday",
            team: "Boston Celtics",
            comment: "NBA 선수들도 즐겨 신는 최고의 가성비 모델입니다.",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/10/Jrue_Holiday_2021.jpg"
        },
        {
            name: "Mikal Bridges",
            team: "Brooklyn Nets",
            comment: "깔끔한 디자인과 가벼운 착용감 때문에 자주 착용합니다.",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8b/Mikal_Bridges_2021.jpg"
        }
    ]
  },
  {
    id: '16',
    name: 'New Balance TWO WXY v4',
    brand: 'New Balance',
    category: Category.SHOES,
    price: 159000,
    rating: 4.7,
    description: '포지션리스 농구를 위한 최적의 선택. FuelCell과 Fresh Foam의 하이브리드 쿠셔닝으로 모든 움직임을 커버합니다.',
    imageUrl: 'https://ginqsctaaomobkdhgcvt.supabase.co/storage/v1/object/public/DOMINATE%20THE%20COURT/shoes/New%20Balance%20TWO%20WXY%20v4.png',
    buyUrl: getSearchUrl('New Balance TWO WXY v4'),
    specs: { traction: 9, cushion: 8, support: 9, weight: 8, durability: 8 },
    reviews: createReviews('16', 8, [
      { id: 'r16-1', userName: 'NBFan', rating: 5, comment: '뉴발란스가 농구화도 잘 만드네요. 발이 정말 편합니다.', date: '2024-03-05' }
    ]),
    relatedPlayers: [
        {
            name: "Jamal Murray",
            team: "Denver Nuggets",
            comment: "다재다능한 득점력을 보여주는 머레이의 선택.",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Jamal_Murray_2021.jpg"
        },
        {
            name: "Tyrese Maxey",
            team: "Philadelphia 76ers",
            comment: "폭발적인 스피드와 활동량을 뒷받침해주는 신발입니다.",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/25/Tyrese_Maxey_2022.jpg"
        },
        {
            name: "Kawhi Leonard",
            team: "Los Angeles Clippers",
            comment: "뉴발란스의 얼굴로서 같은 브랜드 라인업을 지지합니다.",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b2/Kawhi_Leonard_2021.jpg"
        }
    ]
  },
  {
    id: '17',
    name: 'Nike Ja 1',
    brand: 'Nike',
    category: Category.SHOES,
    price: 119000,
    rating: 4.6,
    description: '자 모란트의 폭발적인 점프를 위한 줌 에어 탑재. 미니멀한 디자인과 뛰어난 접지력으로 가드들에게 인기가 높습니다.',
    imageUrl: 'https://ginqsctaaomobkdhgcvt.supabase.co/storage/v1/object/public/DOMINATE%20THE%20COURT/shoes/Nike%20Ja%201.jpg',
    buyUrl: getSearchUrl('Nike Ja 1'),
    specs: { traction: 9, cushion: 6, support: 7, weight: 9, durability: 7 },
    reviews: createReviews('17', 7, [
      { id: 'r17-1', userName: 'RimRocker', rating: 4, comment: '쿠션은 좀 얇은데 접지가 진짜 좋습니다.', date: '2024-03-08' }
    ]),
    relatedPlayers: [
        {
            name: "Ja Morant",
            team: "Memphis Grizzlies",
            comment: "그의 하이라이트 필름을 만들어내는 파트너.",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/08/Ja_Morant_2021.jpg"
        },
        {
             name: "Scottie Barnes",
             team: "Toronto Raptors",
             comment: "에너지 넘치는 플레이스타일에 어울리는 신발입니다.",
             imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/87/Scottie_Barnes.jpg"
        }
    ]
  },
  {
    id: '18',
    name: 'Nike Book 1',
    brand: 'Nike',
    category: Category.SHOES,
    price: 169000,
    rating: 4.5,
    description: '데빈 부커의 첫 시그니처. 라이프스타일 슈즈 같은 클래식한 디자인 내부에 쿠실론 2.0과 줌 에어 퍼포먼스가 숨겨져 있습니다.',
    imageUrl: 'https://ginqsctaaomobkdhgcvt.supabase.co/storage/v1/object/public/DOMINATE%20THE%20COURT/shoes/Nike%20Book%201.jpg',
    buyUrl: getSearchUrl('Nike Book 1'),
    specs: { traction: 8, cushion: 8, support: 7, weight: 8, durability: 8 },
    reviews: createReviews('18', 6, [
      { id: 'r18-1', userName: 'OldSchool', rating: 5, comment: '일상화로 신어도 될 만큼 예쁜데 농구 성능도 굿.', date: '2024-03-12' }
    ]),
    relatedPlayers: [
        {
            name: "Devin Booker",
            team: "Phoenix Suns",
            comment: "올드스쿨 감성과 최신 기술의 조화를 원했습니다.",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Devin_Booker_2021.jpg"
        },
        {
            name: "Kevin Durant",
            team: "Phoenix Suns",
            comment: "같은 팀 동료의 시그니처 런칭을 축하하며 착용하기도 했습니다.",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Kevin_Durant_2021.jpg"
        }
    ]
  },
  {
    id: '19',
    name: 'Spalding TF-1000 Legacy',
    brand: 'Spalding',
    category: Category.BALL,
    price: 75000,
    rating: 4.7,
    description: '실내 농구공의 클래식. 땀이 날수록 그립이 좋아지는 습도 조절 기능이 탁월하여 오랫동안 사랑받아온 모델입니다.',
    imageUrl: 'https://ginqsctaaomobkdhgcvt.supabase.co/storage/v1/object/public/DOMINATE%20THE%20COURT/ball/Spalding%20TF-1000%20Legacy.webp',
    buyUrl: getSearchUrl('Spalding TF-1000 Legacy'),
    reviews: createReviews('19', 5, [
      { id: 'r19-1', userName: 'ClassicBaller', rating: 5, comment: '역시 구관이 명관. 손에 착착 감깁니다.', date: '2024-03-01' }
    ])
  },
  {
    id: '20',
    name: 'Zamst A2-DX Ankle Brace',
    brand: 'Zamst',
    category: Category.ACCESSORY,
    price: 89000,
    rating: 4.9,
    description: '스테판 커리가 사용하여 유명해진 발목 보호대. 발목 꺾임을 물리적으로 방지하는 강력한 가드가 특징입니다.',
    imageUrl: 'https://ginqsctaaomobkdhgcvt.supabase.co/storage/v1/object/public/DOMINATE%20THE%20COURT/accessory/Zamst%20A2-DX%20Ankle%20Brace.webp',
    buyUrl: getSearchUrl('Zamst A2-DX'),
    reviews: createReviews('20', 5, [
      { id: 'r20-1', userName: 'NoMoreSprain', rating: 5, comment: '이거 차고 발목 돌아간 적 한 번도 없습니다. 비싸도 돈값함.', date: '2024-02-15' }
    ]),
    relatedPlayers: [
        {
            name: "Stephen Curry",
            team: "Golden State Warriors",
            comment: "유리 발목이었던 커리를 리그 최고의 스타로 지켜준 아이템.",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/bf/Stephen_Curry_2016_%28cropped%29.jpg"
        },
        {
            name: "Trae Young",
            team: "Atlanta Hawks",
            comment: "발목 부상 방지를 위해 이 보호대를 신뢰합니다.",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/22/Trae_Young_2021.jpg"
        }
    ]
  },
  {
    id: '21',
    name: 'Nike Elite Crew Socks',
    brand: 'Nike',
    category: Category.ACCESSORY,
    price: 18000,
    rating: 4.8,
    description: '농구인들의 필수품. 발바닥 쿠셔닝과 흡습속건 기능으로 물집을 방지하고 장시간 플레이에도 편안함을 제공합니다.',
    imageUrl: 'https://ginqsctaaomobkdhgcvt.supabase.co/storage/v1/object/public/DOMINATE%20THE%20COURT/accessory/Nike%20Elite%20Crew%20Socks.jpg',
    buyUrl: getSearchUrl('Nike Elite Crew Socks'),
    reviews: createReviews('21', 5, [
      { id: 'r21-1', userName: 'SocksMatter', rating: 5, comment: '농구할 땐 무조건 엘리트 양말이죠. 쿠션감 다름.', date: '2024-03-10' }
    ]),
    relatedPlayers: [
        {
            name: "NBA Players",
            team: "All Teams",
            comment: "리그 공식 양말로서 모든 선수가 착용합니다.",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7a/LeBron_James_Lakers.jpg"
        },
        {
            name: "Kevin Durant",
            team: "Phoenix Suns",
            comment: "양말을 두 겹 신는 것으로 유명합니다.",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Kevin_Durant_2021.jpg"
        }
    ]
  },
  {
    id: '22',
    name: 'Rigorer AR1',
    brand: 'Rigorer',
    category: Category.SHOES,
    price: 129000,
    rating: 4.7,
    description: '오스틴 리브스의 시그니처. 뛰어난 가성비와 독특한 고치(Cocoon) 갑피 디자인으로 발을 포근하게 감싸줍니다.',
    imageUrl: 'https://ginqsctaaomobkdhgcvt.supabase.co/storage/v1/object/public/DOMINATE%20THE%20COURT/shoes/Rigorer%20AR1.webp',
    buyUrl: getSearchUrl('Rigorer AR1'),
    specs: { traction: 8, cushion: 8, support: 8, weight: 8, durability: 8 },
    reviews: createReviews('22', 5, [
      { id: 'r22-1', userName: 'LakersLifer', rating: 5, comment: '가성비 진짜 좋습니다. 리브스 팬이라 샀는데 대만족.', date: '2024-03-15' }
    ]),
    relatedPlayers: [
        {
            name: "Austin Reaves",
            team: "Los Angeles Lakers",
            comment: "언드래프티의 신화를 써내려가는 그의 동반자.",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Austin_Reaves_2021.jpg"
        },
        {
            name: "Jimmer Fredette",
            team: "Shanghai Sharks",
            comment: "리고러 브랜드의 또 다른 대표 모델입니다.",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Jimmer_Fredette_Kings.jpg"
        }
    ]
  },
  {
    id: '23',
    name: 'Nike LeBron NXXT Gen',
    brand: 'Nike',
    category: Category.SHOES,
    price: 189000,
    rating: 4.8,
    description: '르브론 21보다 가볍고 날렵한 파생 모델. 줌 터보 유닛이 탑재되어 더 빠른 움직임을 선호하는 포워드들에게 적합합니다.',
    imageUrl: 'https://ginqsctaaomobkdhgcvt.supabase.co/storage/v1/object/public/DOMINATE%20THE%20COURT/shoes/Nike%20LeBron%20NXXT%20Gen.jpg',
    buyUrl: getSearchUrl('Nike LeBron NXXT Gen'),
    specs: { traction: 9, cushion: 9, support: 8, weight: 8, durability: 7 },
    reviews: createReviews('23', 5, [
      { id: 'r23-1', userName: 'FastBreak', rating: 5, comment: '21보다 가벼워서 뛰기 편합니다. 접지도 훌륭함.', date: '2024-03-12' }
    ]),
    relatedPlayers: [
        {
          name: "LeBron James",
          team: "Los Angeles Lakers",
          comment: "더 가볍고 빠른 움직임이 필요할 때 넥스트 젠을 착용합니다.",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7a/LeBron_James_Lakers.jpg"
        },
        {
            name: "Kevin Love",
            team: "Miami Heat",
            comment: "르브론의 오랜 동료로서 편안한 착화감을 선호합니다.",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/22/Kevin_Love_2021.jpg"
        },
        {
            name: "JuJu Watkins",
            team: "USC Trojans",
            comment: "대학 최고의 여자 선수 중 한 명으로 르브론 시리즈를 즐겨 신습니다.",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7a/LeBron_James_Lakers.jpg" // Placeholder
        }
    ]
  },
  {
    id: '24',
    name: 'Shock Doctor Gel Max',
    brand: 'Shock Doctor',
    category: Category.ACCESSORY,
    price: 15000,
    rating: 4.5,
    description: '격렬한 플레이 중 치아와 턱을 보호하는 필수 안전 장비. 열 성형으로 개인 치아에 딱 맞는 핏을 제공합니다.',
    imageUrl: 'https://ginqsctaaomobkdhgcvt.supabase.co/storage/v1/object/public/DOMINATE%20THE%20COURT/accessory/Shock%20Doctor%20Gel%20Max.jpg',
    buyUrl: getSearchUrl('Shock Doctor Gel Max Mouthguard'),
    reviews: createReviews('24', 5, [
      { id: 'r24-1', userName: 'SafetyFirst', rating: 4, comment: '성형하기 쉽고 입에 잘 맞습니다. 숨쉬기도 편해요.', date: '2024-02-20' }
    ]),
    relatedPlayers: [
        {
            name: "Stephen Curry",
            team: "Golden State Warriors",
            comment: "자유투 라인에서 항상 마우스가드를 물고 있는 모습이 상징적입니다.",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/bf/Stephen_Curry_2016_%28cropped%29.jpg"
        },
        {
            name: "LeBron James",
            team: "Los Angeles Lakers",
            comment: "경기 중 항상 마우스가드를 착용하여 치아를 보호합니다.",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7a/LeBron_James_Lakers.jpg"
        }
    ]
  }
];

export const POSITIONS = [
  '가드 (Point Guard / Shooting Guard)',
  '포워드 (Small Forward / Power Forward)',
  '센터 (Center)',
  '올라운더 (All-Rounder)'
];