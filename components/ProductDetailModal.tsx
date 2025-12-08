import React, { useEffect, useState } from 'react';
import { X, Loader2, Award, ExternalLink, Activity, Disc, ShoppingBag, Star, Send, Image as ImageIcon, User, AlertCircle, ChevronRight } from 'lucide-react';
import { Product, PlayerInfo, Category, Review } from '../types';
import { getProductCelebrities } from '../services/geminiService';
import RadarChart from './RadarChart';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

type TabType = 'info' | 'reviews' | 'gallery';

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const [activeTab, setActiveTab] = useState<TabType>('info');
  const [loading, setLoading] = useState(false);
  const [players, setPlayers] = useState<PlayerInfo[]>([]);
  const [imgError, setImgError] = useState(false);
  
  // Review State
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '', userName: '' });
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  useEffect(() => {
    if (product) {
      setImgError(false);
      setActiveTab('info');
      setReviews(product.reviews || []);
      setPlayers([]); // Reset players when product changes
      
      // LOGIC CHANGE: Check for hardcoded relatedPlayers first
      if (product.relatedPlayers && product.relatedPlayers.length > 0) {
        setPlayers(product.relatedPlayers);
        setLoading(false);
      } else if (product.category === Category.SHOES) {
        // Only load AI if no hardcoded data exists AND it is a shoe
        setLoading(true);
        getProductCelebrities(product.name)
          .then(data => setPlayers(data))
          .catch(err => console.error(err))
          .finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    }
  }, [product]);

  if (!product) return null;

  const handleBuyClick = () => {
    window.open(product.buyUrl, '_blank');
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.comment || !newReview.userName) return;

    const review: Review = {
      id: Date.now().toString(),
      userName: newReview.userName,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0]
    };

    setReviews([review, ...reviews]);
    setNewReview({ rating: 5, comment: '', userName: '' });
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 3000);
  };

  const openPlayerImageSearch = (playerName: string) => {
    const query = `${playerName} wearing ${product.name} on court`;
    window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}&tbm=isch`, '_blank');
  };

  const renderFallback = () => {
    let Icon = ShoppingBag;
    if (product.category === Category.SHOES) Icon = Activity;
    if (product.category === Category.BALL) Icon = Disc;
    
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-gray-800 text-gray-500 min-h-[300px]">
        <Icon size={64} className="mb-4 opacity-50" />
        <span className="text-lg font-medium opacity-50">No Image Available</span>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="relative bg-gray-900 w-[95%] md:w-full max-w-6xl rounded-2xl overflow-hidden shadow-2xl border border-gray-700 flex flex-col md:flex-row max-h-[90vh] md:h-[85vh]">
        
        {/* Close Button Mobile */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white z-10 md:hidden hover:bg-black/70"
        >
          <X size={20} />
        </button>

        {/* Left Side: Product Image */}
        <div className="w-full md:w-5/12 bg-white relative h-56 md:h-full flex items-center justify-center shrink-0">
           {imgError ? (
            renderFallback()
          ) : (
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              onError={() => setImgError(true)}
              className="w-full h-full object-contain p-6 md:p-10"
            />
          )}
        </div>

        {/* Right Side: Content Tabs */}
        <div className="w-full md:w-7/12 flex flex-col flex-1 min-h-0 bg-gray-900">
          
          {/* Header */}
          <div className="p-6 md:p-8 pb-0 shrink-0">
            <div className="flex justify-between items-start">
              <div className="pr-8">
                <span className="text-orange-500 font-bold text-sm tracking-wider uppercase">{product.brand}</span>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">{product.name}</h2>
                <div className="flex items-center space-x-2 mb-4">
                   <span className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded border border-gray-700">{product.category}</span>
                   <div className="flex items-center text-yellow-500">
                     <Star size={14} className="fill-current" />
                     <span className="ml-1 text-sm font-bold">{product.rating}</span>
                   </div>
                   <span className="text-gray-500 text-sm">({reviews.length} Reviews)</span>
                </div>
              </div>
              <button onClick={onClose} className="hidden md:block text-gray-500 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex space-x-6 border-b border-gray-800 mt-2 overflow-x-auto no-scrollbar">
              <button 
                onClick={() => setActiveTab('info')}
                className={`pb-3 text-sm font-bold transition-all relative whitespace-nowrap ${
                  activeTab === 'info' ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                상세 정보
                {activeTab === 'info' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500"></span>}
              </button>
              <button 
                onClick={() => setActiveTab('reviews')}
                className={`pb-3 text-sm font-bold transition-all relative whitespace-nowrap ${
                  activeTab === 'reviews' ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                리뷰 ({reviews.length})
                {activeTab === 'reviews' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500"></span>}
              </button>
              
              {/* Gallery Tab - ONLY SHOW FOR SHOES */}
              {product.category === Category.SHOES && (
                <button 
                  onClick={() => setActiveTab('gallery')}
                  className={`pb-3 text-sm font-bold transition-all relative whitespace-nowrap ${
                    activeTab === 'gallery' ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  선수 갤러리 ({product.relatedPlayers?.length || 'AI'})
                  {activeTab === 'gallery' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500"></span>}
                </button>
              )}
            </div>
          </div>

          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-8 min-h-0">
            
            {/* --- TAB: INFO --- */}
            {activeTab === 'info' && (
              <div className="animate-fade-in space-y-8">
                <div>
                  <h3 className="text-sm font-bold text-gray-400 mb-2 uppercase">Description</h3>
                  <p className="text-gray-300 leading-relaxed border-l-2 border-orange-500 pl-4">
                    {product.description}
                  </p>
                </div>

                {product.specs ? (
                  <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-800">
                    <h3 className="text-sm font-bold text-gray-400 mb-4 uppercase text-center">Performance Radar</h3>
                    <RadarChart specs={product.specs} />
                  </div>
                ) : (
                  <div className="bg-gray-800/30 rounded-lg p-4 text-center">
                    <p className="text-gray-500 text-sm">상세 스펙 차트가 제공되지 않는 제품입니다.</p>
                  </div>
                )}
              </div>
            )}

            {/* --- TAB: REVIEWS --- */}
            {activeTab === 'reviews' && (
              <div className="animate-fade-in space-y-6">
                {/* Write Review Form */}
                <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
                  <h3 className="text-sm font-bold text-white mb-3 flex items-center">
                    <Send size={14} className="mr-2 text-orange-500" /> 리뷰 작성하기
                  </h3>
                  <form onSubmit={handleReviewSubmit} className="space-y-3">
                    <div className="flex items-center space-x-2">
                       <input 
                        type="text" 
                        placeholder="닉네임"
                        value={newReview.userName}
                        onChange={(e) => setNewReview({...newReview, userName: e.target.value})}
                        className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white w-1/3 focus:border-orange-500 outline-none"
                        required
                       />
                       <div className="flex items-center space-x-1 bg-gray-900 px-3 py-2 rounded-lg border border-gray-700">
                         <span className="text-sm text-gray-400 mr-2">별점:</span>
                         {[1, 2, 3, 4, 5].map((star) => (
                           <button
                             type="button"
                             key={star}
                             onClick={() => setNewReview({...newReview, rating: star})}
                             className={`${star <= newReview.rating ? 'text-yellow-500' : 'text-gray-600'} hover:scale-110 transition-transform`}
                           >
                             <Star size={16} fill={star <= newReview.rating ? "currentColor" : "none"} />
                           </button>
                         ))}
                       </div>
                    </div>
                    <textarea 
                      placeholder="이 제품에 대한 솔직한 후기를 남겨주세요."
                      value={newReview.comment}
                      onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:border-orange-500 outline-none resize-none h-20"
                      required
                    />
                    <div className="flex justify-between items-center">
                      {reviewSubmitted && <span className="text-green-500 text-xs animate-pulse">리뷰가 등록되었습니다!</span>}
                      <button 
                        type="submit" 
                        className="ml-auto bg-orange-600 hover:bg-orange-700 text-white px-4 py-1.5 rounded-lg text-sm font-bold transition-colors"
                      >
                        등록
                      </button>
                    </div>
                  </form>
                </div>

                {/* Reviews List */}
                <div className="space-y-3">
                  {reviews.length > 0 ? (
                    reviews.map((review) => (
                      <div key={review.id} className="bg-gray-800/40 p-4 rounded-xl border border-gray-800">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center mr-3 text-orange-500 font-bold text-xs">
                              {review.userName.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="text-sm font-bold text-white">{review.userName}</p>
                              <div className="flex text-yellow-500">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} size={10} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "" : "text-gray-700"} />
                                ))}
                              </div>
                            </div>
                          </div>
                          <span className="text-xs text-gray-500">{review.date}</span>
                        </div>
                        <p className="text-gray-300 text-sm ml-11">{review.comment}</p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <p>아직 작성된 리뷰가 없습니다.</p>
                      <p className="text-xs mt-1">첫 번째 리뷰의 주인공이 되어보세요!</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* --- TAB: GALLERY (List View, No Images) --- */}
            {activeTab === 'gallery' && product.category === Category.SHOES && (
              <div className="animate-fade-in h-full">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-sm font-bold text-gray-300 flex items-center">
                    <Award className="mr-2 text-orange-500" size={16} />
                    {product.relatedPlayers && product.relatedPlayers.length > 0 ? '대표 착용 선수' : 'AI 분석 착용 선수'}
                    </h3>
                    {loading && <span className="text-xs text-gray-500 flex items-center"><Loader2 size={12} className="animate-spin mr-1"/>데이터 분석 중...</span>}
                </div>

                {loading ? (
                    <div className="space-y-3">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="bg-gray-800 h-24 rounded-xl animate-pulse border border-gray-700"></div>
                    ))}
                    </div>
                ) : (
                    <div className="space-y-3">
                    {players.length > 0 ? (
                        players.map((player, idx) => (
                        <div 
                            key={idx} 
                            onClick={() => openPlayerImageSearch(player.name)}
                            className="group bg-gray-800 p-5 rounded-xl border border-gray-700 hover:border-orange-500 hover:bg-gray-750 transition-all cursor-pointer flex justify-between items-center"
                        >
                            <div className="flex-1 pr-4">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-bold text-orange-500 uppercase tracking-wider">{player.team}</span>
                            </div>
                            <h4 className="text-lg font-bold text-white mb-1 flex items-center">
                                {player.name}
                            </h4>
                            <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                                "{player.comment}"
                            </p>
                            </div>
                            
                            <div className="flex flex-col items-center justify-center pl-4 border-l border-gray-700 min-w-[80px]">
                            <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center group-hover:bg-orange-600 transition-colors mb-1">
                                <ImageIcon size={20} className="text-gray-400 group-hover:text-white" />
                            </div>
                            <span className="text-[10px] text-gray-500 font-medium group-hover:text-orange-400">착용샷 보기</span>
                            </div>
                        </div>
                        ))
                    ) : (
                        <div className="text-center py-10 bg-gray-800/30 rounded-xl border border-dashed border-gray-700">
                            <p className="text-gray-500 text-sm">관련 선수 정보를 찾을 수 없습니다.</p>
                        </div>
                    )}
                    </div>
                )}
                {!loading && players.length > 0 && (
                    <p className="text-[10px] text-gray-600 text-center mt-4">
                    * 항목을 클릭하면 새 창에서 해당 선수의 착용 이미지를 검색합니다.
                    </p>
                )}
              </div>
            )}

          </div>

          {/* Footer: Price & Buy */}
          <div className="flex items-center justify-between border-t border-gray-800 p-6 bg-gray-900 z-10 shrink-0">
            <div>
              <span className="text-gray-500 text-xs block mb-1">최저가 예상</span>
              <span className="text-2xl font-bold text-white">₩{product.price.toLocaleString()}</span>
            </div>
            <button 
              onClick={handleBuyClick}
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-xl font-bold flex items-center transition-all shadow-lg shadow-orange-600/20 hover:shadow-orange-600/40 hover:-translate-y-1"
            >
              구매하기 <ExternalLink size={18} className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;