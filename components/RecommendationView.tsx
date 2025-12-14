import React, { useState } from 'react';
import { Loader2, Zap, ArrowRight, User, Activity, MousePointerClick, CheckCircle2 } from 'lucide-react';
import { RecommendationParams, AIRecommendation, Product } from '../types';
import { POSITIONS, INITIAL_PRODUCTS } from '../constants';
import { getPersonalizedRecommendations } from '../services/geminiService';
import RadarChart from './RadarChart';
import DonutChart from './DonutChart';
import ProductDetailModal from './ProductDetailModal';

const RecommendationView: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AIRecommendation[] | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<RecommendationParams>({
    height: 175,
    weight: 70,
    position: POSITIONS[0],
    playStyle: '',
    injuryHistory: ''
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

  const openSearch = (e: React.MouseEvent, query: string) => {
    e.stopPropagation(); // Prevent card click event (modal opening)
    window.open(`https://www.google.com/search?q=${encodeURIComponent(query + ' 농구화 최저가')}&tbm=shop`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500">
          AI 맞춤형 장비 추천
        </h2>
        <p className="text-gray-400 text-lg">
          신체 조건, 플레이 스타일, 그리고 부상 이력까지 고려하여<br className="hidden sm:inline" />
          Gemini AI가 데이터베이스에 있는 제품 중 최적의 장비를 찾아냅니다.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-4 xl:col-span-3">
          <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-xl h-fit sticky top-24">
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
                <label className="block text-sm font-medium text-gray-300 mb-1">플레이 스타일</label>
                <textarea
                  value={formData.playStyle}
                  onChange={(e) => setFormData({...formData, playStyle: e.target.value})}
                  placeholder="예: 빠른 돌파 위주, 수비 시 사이드 스텝 많음. 점프 착지 충격이 걱정됨."
                  className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all h-24 resize-none text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-orange-400 mb-1 flex items-center">
                  <Activity size={14} className="mr-1" /> 부상 이력 (선택 사항)
                </label>
                <textarea
                  value={formData.injuryHistory}
                  onChange={(e) => setFormData({...formData, injuryHistory: e.target.value})}
                  placeholder="예: 오른쪽 발목 염좌 잦음, 무릎 통증 있음, 족저근막염 등"
                  className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all h-20 resize-none text-sm"
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
        </div>

        {/* Results Section */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-6">
          {!result && !loading && (
            <div className="h-full flex flex-col items-center justify-center text-gray-500 border-2 border-dashed border-gray-800 rounded-2xl p-8 bg-gray-900/50 min-h-[400px]">
              <User size={48} className="mb-4 opacity-50" />
              <p className="text-center">왼쪽 정보를 입력하고 추천받기 버튼을 눌러주세요.<br/>Gemini AI가 최적의 장비를 찾아냅니다.</p>
            </div>
          )}

          {loading && (
             <div className="h-full flex flex-col items-center justify-center space-y-4 py-20 min-h-[400px]">
               <div className="relative">
                 <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin"></div>
                 <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-orange-600">
                   <Zap size={24} className="fill-current" />
                 </div>
               </div>
               <p className="text-gray-400 animate-pulse text-center">
                 수천 개의 제품 데이터를 분석하고 있습니다...<br/>
                 <span className="text-xs text-gray-600">부상 위험 요소 체크 중</span>
               </p>
             </div>
          )}

          {result && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center justify-between">
                <div className="flex items-center">
                    <span className="bg-orange-600 w-2 h-6 rounded mr-2"></span>
                    분석 결과
                </div>
                <span className="text-xs font-normal text-gray-400 flex items-center">
                    <MousePointerClick size={14} className="mr-1" />
                    제품을 클릭하면 상세 정보와 리뷰를 볼 수 있습니다
                </span>
              </h3>
              {result.map((rec, idx) => {
                // Find the product in constants to get the image and real specs
                const productInfo = INITIAL_PRODUCTS.find(p => p.id === rec.productId);
                
                return (
                  <div 
                    key={idx} 
                    onClick={() => productInfo && setSelectedProduct(productInfo)}
                    className="group bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-orange-500 transition-all shadow-xl cursor-pointer relative"
                  >
                    <div className="flex flex-col md:flex-row">
                      
                      {/* LEFT COLUMN: Image & Price/Action (Fixed width on desktop, flexible height) */}
                      <div className="w-full md:w-[220px] lg:w-[260px] bg-white flex flex-col shrink-0 relative p-4 border-r border-gray-700/50">
                         {/* Rank Badge */}
                         <div className="absolute top-0 left-0 bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-br-xl z-10 shadow-md">
                            TOP {idx + 1}
                         </div>

                         <div className="flex items-center justify-center py-2 h-[140px] md:h-[160px]">
                             {productInfo ? (
                               <img src={productInfo.imageUrl} alt={rec.productName} className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-500" />
                             ) : (
                                <div className="text-gray-400 text-xs">No Image</div>
                             )}
                         </div>
                         
                         <div className="mt-auto pt-3 border-t border-gray-100 w-full">
                            <div className="flex justify-between items-center mb-2">
                               <span className="text-gray-400 text-xs font-bold">예상 가격</span>
                               <span className="text-gray-900 font-bold text-base">
                                 {productInfo ? `₩${productInfo.price.toLocaleString()}` : '-'}
                               </span>
                            </div>
                            <button 
                               onClick={(e) => openSearch(e, rec.productName)}
                               className="w-full bg-gray-900 text-white py-2.5 rounded-lg text-xs font-bold flex items-center justify-center hover:bg-orange-600 transition-colors shadow-lg"
                            >
                               최저가 확인 <ArrowRight size={12} className="ml-1" />
                            </button>
                         </div>
                      </div>

                      {/* RIGHT COLUMN: Analysis & Info - Compact */}
                      <div className="flex-1 p-5 flex flex-col bg-gray-800 relative">
                         {/* Header */}
                         <div className="mb-4">
                            <div className="flex items-center justify-between mb-1">
                               <span className="text-orange-500 text-xs font-bold uppercase tracking-wider">{productInfo?.brand}</span>
                            </div>
                            <h4 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                               {rec.productName}
                            </h4>
                            
                            {/* Suitable For Badge */}
                             <div className="inline-flex items-center bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-bold px-2 py-1 rounded-full mb-3">
                                <CheckCircle2 size={12} className="mr-1.5" />
                                {rec.suitableFor}
                             </div>

                             {/* Reason Text */}
                            <div className="relative pl-3 border-l-2 border-orange-500/50">
                               <p className="text-gray-300 text-sm leading-relaxed">
                                  {rec.reason}
                               </p>
                            </div>
                         </div>

                         {/* Visual Analysis Dashboard (Compact) */}
                         <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-700/50 flex flex-col sm:flex-row items-center justify-around gap-4 mt-auto">
                             {/* Match Score */}
                             <div className="flex items-center gap-3">
                                 <div className="relative">
                                    <DonutChart percentage={rec.matchPercentage} size={64} strokeWidth={6} />
                                 </div>
                                 <div className="flex flex-col">
                                    <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-0.5">적합도</span>
                                    <span className="text-lg font-black text-white">{rec.matchPercentage}%</span>
                                 </div>
                             </div>
                             
                             {/* Vertical Divider */}
                             <div className="hidden sm:block w-px h-12 bg-gray-700"></div>

                             {/* Radar Spec */}
                             {productInfo && productInfo.specs ? (
                                <div className="flex items-center gap-4">
                                   <div className="w-32 h-32 flex items-center justify-center -my-2">
                                      <div className="scale-[0.9] origin-center">
                                         <RadarChart specs={productInfo.specs} />
                                      </div>
                                   </div>
                                   <div className="flex flex-col">
                                      <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-0.5">성능 밸런스</span>
                                      <span className="text-[10px] text-gray-300">
                                         접지 {productInfo.specs.traction} / 쿠션 {productInfo.specs.cushion}
                                      </span>
                                   </div>
                                </div>
                             ) : (
                                <div className="text-gray-500 text-xs">스펙 데이터 없음</div>
                             )}
                         </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <p className="text-xs text-center text-gray-600 mt-6">
                * 위 추천은 Gemini AI가 분석한 결과이며, 적합도는 입력하신 정보를 바탕으로 산출되었습니다.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </div>
  );
};

export default RecommendationView;