import React, { useState } from 'react';
import { RefreshCw, ArrowRight, CheckCircle2 } from 'lucide-react';
import { INITIAL_PRODUCTS } from '../constants';
import ProductCard from './ProductCard';

// Define the position types
type PositionType = 'PG' | 'SG' | 'SF' | 'BIG';

const QUESTIONS = [
  {
    id: 1,
    text: "농구 코트에서 당신이 가장 선호하는 역할은?",
    options: [
      { text: "공을 운반하고 팀원들에게 작전을 지시한다.", type: 'PG' },
      { text: "빈 공간을 찾아 외곽슛으로 득점을 노린다.", type: 'SG' },
      { text: "내외곽을 오가며 득점하고 상대 에이스를 막는다.", type: 'SF' },
      { text: "골밑에서 몸싸움을 하고 리바운드를 사수한다.", type: 'BIG' }
    ]
  },
  {
    id: 2,
    text: "공격 시 가장 자신 있는 주무기는?",
    options: [
      { text: "현란한 드리블 돌파 후 킥아웃 패스", type: 'PG' },
      { text: "스크린을 타고 나와서 던지는 3점슛", type: 'SG' },
      { text: "원맨 속공 마무리 및 아이솔레이션", type: 'SF' },
      { text: "골밑 포스트업 및 훅슛", type: 'BIG' }
    ]
  },
  {
    id: 3,
    text: "수비할 때 주로 어떤 상황인가요?",
    options: [
      { text: "상대 가드를 하프라인부터 강하게 압박한다.", type: 'PG' },
      { text: "상대의 패스 길을 읽고 스틸을 노린다.", type: 'SG' },
      { text: "다양한 포지션을 커버하며 헬프 디펜스를 간다.", type: 'SF' },
      { text: "골밑을 지키며 최후의 보루로서 블록슛을 시도한다.", type: 'BIG' }
    ]
  },
  {
    id: 4,
    text: "농구화를 고를 때 가장 중요하게 보는 기능은?",
    options: [
      { text: "순간적인 방향 전환을 위한 최상급 접지력", type: 'PG' },
      { text: "점프 후 착지 충격을 줄여주는 탄탄한 쿠셔닝", type: 'SG' },
      { text: "어떤 움직임도 버텨주는 밸런스와 경량성", type: 'SF' },
      { text: "발목 꺾임을 방지하는 강력한 지지력과 보호 기능", type: 'BIG' }
    ]
  },
  {
    id: 5,
    text: "경기 중 거친 몸싸움(Contact)이 발생한다면?",
    options: [
      { text: "빠른 스피드로 요리조리 피해 다닌다.", type: 'PG' },
      { text: "컨택을 최소화하고 공간을 만들어 슛을 쏜다.", type: 'SG' },
      { text: "어느 정도의 부딪힘은 즐기며 돌파를 시도한다.", type: 'SF' },
      { text: "먼저 몸을 부딪혀서 공간을 확보하고 힘으로 밀어붙인다.", type: 'BIG' }
    ]
  },
  {
    id: 6,
    text: "속공(Fast Break) 상황에서 당신의 선택은?",
    options: [
      { text: "직접 드리블을 치고 나가며 양옆의 동료를 살핀다.", type: 'PG' },
      { text: "3점 라인 45도나 코너로 벌려 슛 찬스를 기다린다.", type: 'SG' },
      { text: "가장 먼저 달려나가 림으로 돌진하여 득점을 노린다.", type: 'SF' },
      { text: "뒤따라가며(Trailer) 흘러나온 볼이나 골밑 찬스를 본다.", type: 'BIG' }
    ]
  },
  {
    id: 7,
    text: "리바운드 상황에서 당신의 태도는?",
    options: [
      { text: "흘러나오는 볼(Long Rebound)을 잡아 바로 역습한다.", type: 'PG' },
      { text: "수비 리바운드보다는 백코트하여 수비를 정비한다.", type: 'SG' },
      { text: "적극적으로 뛰어들어 공격 리바운드를 노린다.", type: 'SF' },
      { text: "박스아웃으로 상대를 밀어내고 보드를 장악한다.", type: 'BIG' }
    ]
  },
  {
    id: 8,
    text: "당신이 생각하는 이상적인 패스는?",
    options: [
      { text: "수비의 허를 찌르는 노룩(No-look) 패스", type: 'PG' },
      { text: "슛 찬스가 난 동료에게 빠르게 연결하는 패스", type: 'SG' },
      { text: "돌파 후 수비가 몰렸을 때 빼주는 킥아웃 패스", type: 'SF' },
      { text: "리바운드 후 가드에게 건네주는 아웃렛 패스", type: 'BIG' }
    ]
  },
  {
    id: 9,
    text: "경기 종료 5초 전, 1점 뒤진 상황. 당신이라면?",
    options: [
      { text: "동료들의 위치를 파악하고 가장 좋은 찬스를 만든다.", type: 'PG' },
      { text: "스크린을 받아 외곽에서 위닝 샷을 던진다.", type: 'SG' },
      { text: "볼을 잡고 1:1 아이솔레이션으로 돌파를 시도한다.", type: 'SF' },
      { text: "골밑 깊숙이 자리 잡고 패스를 요구한다.", type: 'BIG' }
    ]
  },
  {
    id: 10,
    text: "개인 연습 때 가장 공들이는 훈련은?",
    options: [
      { text: "드리블 핸들링과 패스 시야 훈련", type: 'PG' },
      { text: "다양한 위치에서의 슈팅 메커니즘 반복", type: 'SG' },
      { text: "1:1 상황에서의 스텝과 마무리 기술", type: 'SF' },
      { text: "웨이트 트레이닝과 골밑 무브 연마", type: 'BIG' }
    ]
  }
];

const RESULTS: Record<string, { title: string; subtitle: string; desc: string; recommendId: string }> = {
  PG: {
    title: "포인트 가드 (Point Guard)",
    subtitle: "코트 위의 사령관",
    desc: "당신은 팀의 공격을 조율하고 경기를 리딩하는 '야전사령관'입니다. 드리블과 패스 능력이 뛰어나며, 코트 전체를 넓게 보는 시야를 가졌습니다. 순간적인 스피드와 방향 전환이 잦기 때문에 접지력이 좋고 가벼운 로우컷 농구화가 가장 적합합니다.",
    recommendId: '2' // Curry 11 (Best for traction/handling)
  },
  SG: {
    title: "슈팅 가드 (Shooting Guard)",
    subtitle: "팀의 주득점원",
    desc: "당신은 외곽에서 득점 포를 가동하는 '스코어러'입니다. 찬스가 나면 주저 없이 슛을 던지고, 필요할 때는 돌파도 섞어줍니다. 잦은 점프와 착지 동작으로부터 무릎을 보호할 수 있는 탄탄한 쿠셔닝과 반발력이 좋은 농구화를 추천합니다.",
    recommendId: '4' // Kobe 6 (Best for scorers)
  },
  SF: {
    title: "스몰 포워드 (Small Forward)",
    subtitle: "다재다능한 올라운더",
    desc: "당신은 득점, 리바운드, 수비 등 모든 면에서 활약하는 '살림꾼'이자 '에이스'입니다. 내외곽을 가리지 않고 뛰어다녀야 하므로, 경량성과 지지력의 밸런스가 완벽하게 잡힌 육각형 스탯의 농구화가 필요합니다.",
    recommendId: '8' // Tatum 1 (Best versatile/lightwing shoe)
  },
  BIG: {
    title: "파워 포워드 / 센터 (Big Man)",
    subtitle: "골밑의 지배자",
    desc: "당신은 골밑에서 거친 몸싸움을 이겨내고 보드 장악력을 보여주는 '빅맨'입니다. 높은 체중과 강한 충격을 견뎌야 하므로, 발목을 단단하게 잡아주는 지지력과 최상급의 충격 흡수 쿠셔닝을 가진 농구화가 필수입니다.",
    recommendId: '1' // LeBron 21 (Best cushion/support)
  }
};

const PlaystyleTest: React.FC = () => {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [result, setResult] = useState<string | null>(null);

  const handleAnswer = (type: string) => {
    const newScores = { ...scores, [type]: (scores[type] || 0) + 1 };
    setScores(newScores);

    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      // Calculate result
      const maxEntry = Object.entries(newScores).reduce((a, b) => a[1] > b[1] ? a : b);
      setResult(maxEntry[0]);
    }
  };

  const resetTest = () => {
    setStep(0);
    setScores({});
    setResult(null);
  };

  if (result) {
    const resultData = RESULTS[result] || RESULTS['PG'];
    const recommendedProduct = INITIAL_PRODUCTS.find(p => p.id === resultData.recommendId);

    return (
      <div className="max-w-2xl mx-auto px-4 py-12 animate-fade-in">
        <div className="bg-gray-800 rounded-3xl p-8 border border-gray-700 shadow-2xl text-center">
          <div className="inline-block bg-orange-600 rounded-full p-4 mb-6 shadow-lg shadow-orange-600/30">
            <CheckCircle2 size={48} className="text-white" />
          </div>
          <h2 className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-2">분석 완료</h2>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
            {resultData.title}
          </h1>
          <p className="text-orange-400 text-lg font-bold mb-6">{resultData.subtitle}</p>
          
          <p className="text-gray-300 mb-10 leading-relaxed text-lg bg-gray-900/50 p-6 rounded-xl border border-gray-700">
            {resultData.desc}
          </p>

          <div className="text-left mb-8">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <span className="w-2 h-8 bg-orange-500 rounded mr-3"></span>
              포지션 맞춤 추천 장비
            </h3>
            {recommendedProduct ? (
              <ProductCard 
                product={recommendedProduct} 
                rank={1} 
                onClick={() => window.open(recommendedProduct.buyUrl, '_blank')} 
              />
            ) : (
              <p>추천 제품을 불러올 수 없습니다.</p>
            )}
          </div>

          <button 
            onClick={resetTest}
            className="flex items-center justify-center w-full py-4 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-bold transition-all"
          >
            <RefreshCw className="mr-2" size={20} />
            다시 테스트하기
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = QUESTIONS[step];

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-700 min-h-[500px] flex flex-col">
        {/* Progress Bar */}
        <div className="w-full bg-gray-700 h-2 rounded-full mb-8">
          <div 
            className="bg-orange-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
          ></div>
        </div>

        <div className="flex-1">
          <span className="text-orange-500 font-bold text-sm tracking-widest mb-2 block">QUESTION {step + 1}/{QUESTIONS.length}</span>
          <h2 className="text-2xl font-bold text-white mb-8 leading-snug">{currentQuestion.text}</h2>

          <div className="space-y-4">
            {currentQuestion.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(option.type as string)}
                className="w-full text-left p-5 rounded-xl bg-gray-900 border border-gray-700 hover:border-orange-500 hover:bg-gray-800 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-gray-200 font-medium text-lg group-hover:text-white">{option.text}</span>
                  <ArrowRight className="text-gray-600 group-hover:text-orange-500 opacity-0 group-hover:opacity-100 transition-all" size={20} />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaystyleTest;