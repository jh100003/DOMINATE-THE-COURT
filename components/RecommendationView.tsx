import React, { useState } from 'react';
import { Loader2, Zap, ArrowRight, User, Search } from 'lucide-react';
import { RecommendationParams, AIRecommendation } from '../types';
import { POSITIONS } from '../constants';
import { getPersonalizedRecommendations } from '../services/geminiService';

const RecommendationView: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AIRecommendation[] | null>(null);
  const [formData, setFormData] = useState<RecommendationParams>({
    height: 175,
    weight: 70,
    position: POSITIONS[0],
    playStyle: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const recommendations = await getPersonalizedRecommendations(formData);
      setResult(recommendations);
    } catch (error) {
      console.error(error);
      alert('추천을 가져오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const openSearch = (query: string) => {
    window.open(`https://www.google.com/search?q=${encodeURIComponent(query + ' 농구화 최저가')}&tbm=shop`, '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500">
          AI 맞춤형 장비 추천
        </h2>
        <p className="text-gray-400 text-lg">
          당신의 신체 조건과 플레이 스타일에 딱 맞는 장비를 Gemini AI가 분석해드립니다.
        </p>
      </div>

      <div className="grid md:grid-cols-5 gap-8">
        {/* Form Section */}
        <div className="md:col-span-2 bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-xl h-fit">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">키 (cm)</label>
              <input
                type="number"
                value={formData.height}
                onChange={(e) => setFormData({...formData, height: Number(e.target.value)})}
                className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">몸무게 (kg)</label>
              <input
                type="number"
                value={formData.weight}
                onChange={(e) => setFormData({...formData, weight: Number(e.target.value)})}
                className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">포지션</label>
              <select
                value={formData.position}
                onChange={(e) => setFormData({...formData, position: e.target.value})}
                className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
              >
                {POSITIONS.map(pos => <option key={pos} value={pos}>{pos}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">플레이 스타일 (구체적일수록 정확함)</label>
              <textarea
                value={formData.playStyle}
                onChange={(e) => setFormData({...formData, playStyle: e.target.value})}
                placeholder="예: 빠른 돌파를 즐겨하며, 수비 시에는 사이드 스텝을 많이 밟습니다. 발목 지지가 중요합니다."
                className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all h-32 resize-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-orange-600/30 transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={20} />
                  AI 분석 중...
                </>
              ) : (
                <>
                  <Zap className="mr-2" size={20} />
                  추천 받기
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results Section */}
        <div className="md:col-span-3 space-y-4">
          {!result && !loading && (
            <div className="h-full flex flex-col items-center justify-center text-gray-500 border-2 border-dashed border-gray-800 rounded-2xl p-8 bg-gray-900/50">
              <User size={48} className="mb-4 opacity-50" />
              <p className="text-center">왼쪽 정보를 입력하고 추천받기 버튼을 눌러주세요.<br/>Gemini AI가 최적의 장비를 찾아냅니다.</p>
            </div>
          )}

          {loading && (
             <div className="h-full flex flex-col items-center justify-center space-y-4 py-20">
               <div className="relative">
                 <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin"></div>
                 <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-orange-600">
                   <Zap size={24} className="fill-current" />
                 </div>
               </div>
               <p className="text-gray-400 animate-pulse">수천 개의 제품 데이터를 분석하고 있습니다...</p>
             </div>
          )}

          {result && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <span className="bg-orange-600 w-2 h-6 rounded mr-2"></span>
                분석 결과
              </h3>
              {result.map((rec, idx) => (
                <div key={idx} className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-orange-500/50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-xl font-bold text-orange-400">{rec.productName}</h4>
                    <span className="bg-gray-700 text-xs px-2 py-1 rounded text-gray-300">추천 {idx + 1}</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-300 mb-2">{rec.suitableFor}</p>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed bg-gray-900/50 p-3 rounded-lg border border-gray-800">
                    "{rec.reason}"
                  </p>
                  <button 
                    onClick={() => openSearch(rec.productName)}
                    className="text-sm font-medium text-orange-500 hover:text-orange-400 flex items-center transition-colors"
                  >
                    최저가 검색하러 가기 <ArrowRight size={14} className="ml-1" />
                  </button>
                </div>
              ))}
              <p className="text-xs text-center text-gray-600 mt-6">
                * 위 추천은 AI 모델(Gemini)에 기반하며, 실제 착용감은 개인마다 다를 수 있습니다.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecommendationView;