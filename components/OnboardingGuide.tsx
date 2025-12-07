import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';

interface OnboardingGuideProps {
  onClose: () => void;
}

const STEPS = [
  {
    targetId: 'nav-ranking',
    title: "🔥 실시간 랭킹",
    description: "현재 가장 핫한 농구 용품 순위를 확인하세요. 브랜드, 포지션, 가격대별로 필터링하여 원하는 장비를 찾을 수 있습니다.",
  },
  {
    targetId: 'nav-test',
    title: "🎮 플레이스타일 테스트",
    description: "나는 어떤 유형의 선수일까요? 간단한 테스트를 통해 내 플레이 스타일을 분석하고, 나에게 꼭 맞는 '인생 농구화'를 추천받으세요.",
  },
  {
    targetId: 'nav-recommend',
    title: "🤖 AI 맞춤형 추천",
    description: "Gemini AI가 당신의 신체 조건(키, 몸무게)과 구체적인 성향을 정밀 분석하여 최적의 장비 리포트를 제공합니다.",
  }
];

const OnboardingGuide: React.FC<OnboardingGuideProps> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [position, setPosition] = useState<{ top: number; left: number; align: 'left' | 'right' | 'center' } | null>(null);

  useEffect(() => {
    const updatePosition = () => {
      const targetId = STEPS[currentStep].targetId;
      const element = document.getElementById(targetId);
      
      if (element) {
        const rect = element.getBoundingClientRect();
        // Calculate position based on screen width
        const isMobile = window.innerWidth < 640;
        
        // Center alignment by default
        let left = rect.left + rect.width / 2;
        let align: 'left' | 'right' | 'center' = 'center';

        // Prevent overflow on edges
        if (left < 160) {
           left = rect.left + 20; 
           align = 'left';
        } else if (window.innerWidth - left < 160) {
           left = rect.right - 20;
           align = 'right';
        }

        setPosition({
          top: rect.bottom + 20, // Add some spacing below the navbar
          left: left,
          align: align
        });
      } else {
        // Fallback for missing elements (center screen)
        setPosition(null); 
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const currentData = STEPS[currentStep];

  return (
    <div className="fixed inset-0 z-[100] animate-fade-in pointer-events-none">
      {/* Dimmed Background */}
      <div className="absolute inset-0 bg-black/60 pointer-events-auto" onClick={onClose} />

      {/* Tooltip Card */}
      {position && (
        <div 
          className="absolute transition-all duration-300 pointer-events-auto"
          style={{ 
            top: position.top, 
            left: position.left,
            transform: position.align === 'center' ? 'translateX(-50%)' : position.align === 'right' ? 'translateX(-90%)' : 'translateX(-10%)'
          }}
        >
          {/* Arrow */}
          <div 
            className={`absolute -top-2 w-4 h-4 bg-gray-800 transform rotate-45 border-t border-l border-gray-600 ${
                position.align === 'center' ? 'left-1/2 -translate-x-1/2' : position.align === 'right' ? 'right-6' : 'left-6'
            }`} 
          />
          
          <div className="bg-gray-800 border border-gray-600 rounded-xl shadow-2xl w-[90vw] max-w-sm p-6 text-left relative">
             {/* Step Indicator */}
             <div className="absolute top-4 right-4 text-xs font-bold text-gray-500 bg-gray-900 px-2 py-1 rounded">
               {currentStep + 1} / {STEPS.length}
             </div>

             <h3 className="text-xl font-bold text-white mb-2 pr-12">{currentData.title}</h3>
             <p className="text-gray-300 text-sm leading-relaxed mb-6">
               {currentData.description}
             </p>

             <div className="flex justify-between items-center">
                <button 
                  onClick={onClose}
                  className="text-gray-500 text-sm hover:text-white underline"
                >
                  건너뛰기
                </button>

                <div className="flex space-x-2">
                  <button
                     onClick={handlePrev}
                     disabled={currentStep === 0}
                     className={`p-2 rounded-lg border border-gray-700 transition-colors ${
                       currentStep === 0 ? 'text-gray-600 cursor-not-allowed' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                     }`}
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                     onClick={handleNext}
                     className="flex items-center px-4 py-2 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg font-bold text-sm shadow-lg hover:shadow-orange-600/30 transition-all"
                  >
                    {currentStep === STEPS.length - 1 ? '시작하기' : '다음'}
                    {currentStep !== STEPS.length - 1 && <ChevronRight size={16} className="ml-1" />}
                  </button>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OnboardingGuide;