import React, { useState, useMemo, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import RecommendationView from './components/RecommendationView';
import ProductDetailModal from './components/ProductDetailModal';
import PlaystyleTest from './components/PlaystyleTest';
import OnboardingGuide from './components/OnboardingGuide';
import { INITIAL_PRODUCTS } from './constants';
import { Product, Category } from './types';
import { Trophy, Filter, SlidersHorizontal, ChevronDown, X } from 'lucide-react';

// Calculate dynamic price limits from data
const allPrices = INITIAL_PRODUCTS.map(p => p.price);
const MIN_PRICE_LIMIT = Math.floor(Math.min(...allPrices) / 10000) * 10000; // Round down to nearest 10k
const MAX_PRICE_LIMIT = Math.ceil(Math.max(...allPrices) / 10000) * 10000;  // Round up to nearest 10k

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'ranking' | 'recommend' | 'test'>('ranking');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Guide State
  const [showGuide, setShowGuide] = useState(false);

  // Filter States
  const [activeCategory, setActiveCategory] = useState<Category | 'ALL'>('ALL');
  const [activeBrand, setActiveBrand] = useState<string>('ALL');
  // Changed: Price is now a range tuple [min, max]
  const [priceRange, setPriceRange] = useState<[number, number]>([MIN_PRICE_LIMIT, MAX_PRICE_LIMIT]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Check for first-time visit
  useEffect(() => {
    const hasSeenGuide = localStorage.getItem('hasSeenGuide');
    if (!hasSeenGuide) {
      setShowGuide(true);
    }
  }, []);

  const handleCloseGuide = () => {
    localStorage.setItem('hasSeenGuide', 'true');
    setShowGuide(false);
  };

  // Derived Data
  const brands = useMemo(() => {
    const brandSet = new Set(INITIAL_PRODUCTS.map(p => p.brand));
    return ['ALL', ...Array.from(brandSet).sort()];
  }, []);

  const filteredProducts = useMemo(() => {
    return INITIAL_PRODUCTS.filter(product => {
      // 1. Category Filter
      if (activeCategory !== 'ALL' && product.category !== activeCategory) return false;

      // 2. Brand Filter
      if (activeBrand !== 'ALL' && product.brand !== activeBrand) return false;

      // 3. Price Filter (Range)
      if (product.price < priceRange[0] || product.price > priceRange[1]) return false;

      return true;
    });
  }, [activeCategory, activeBrand, priceRange]);

  const activeFiltersCount = 
    (activeCategory !== 'ALL' ? 1 : 0) + 
    (activeBrand !== 'ALL' ? 1 : 0) + 
    (priceRange[0] !== MIN_PRICE_LIMIT || priceRange[1] !== MAX_PRICE_LIMIT ? 1 : 0);

  const resetFilters = () => {
    setActiveCategory('ALL');
    setActiveBrand('ALL');
    setPriceRange([MIN_PRICE_LIMIT, MAX_PRICE_LIMIT]);
  };

  // Slider Handlers
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), priceRange[1] - 10000); // Prevent crossing
    setPriceRange([value, priceRange[1]]);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), priceRange[0] + 10000); // Prevent crossing
    setPriceRange([priceRange[0], value]);
  };

  // Calculate percentage for slider track background
  const getPercent = (value: number) => 
    Math.round(((value - MIN_PRICE_LIMIT) / (MAX_PRICE_LIMIT - MIN_PRICE_LIMIT)) * 100);

  const renderContent = () => {
    switch (currentView) {
      case 'recommend':
        return <RecommendationView />;
      case 'test':
        return <PlaystyleTest />;
      case 'ranking':
      default:
        return (
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Hero Header */}
            <div className="text-center mb-10 py-10 relative overflow-hidden rounded-3xl bg-gray-800 border border-gray-700">
              <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-gray-900/0 via-gray-900/50 to-gray-900"></div>
              <div className="relative z-10">
                <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
                  DOMINATE <span className="text-orange-600">THE COURT</span>
                </h1>
                <p className="text-gray-300 text-lg max-w-2xl mx-auto px-4">
                  프로 선수들이 선택한 최고의 장비. <br className="hidden md:inline"/>
                  데이터 기반 랭킹과 AI 분석으로 당신의 게임을 업그레이드하세요.
                </p>
              </div>
            </div>

            {/* Filter Section */}
            <div className="mb-10">
              <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                 <div className="flex items-center">
                    <Trophy className="text-yellow-500 mr-2" />
                    <h2 className="text-2xl font-bold text-white">
                      금주의 랭킹 
                      <span className="ml-2 text-sm font-normal text-gray-500">({filteredProducts.length}개 제품)</span>
                    </h2>
                 </div>

                 <button 
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all ${
                    isFilterOpen || activeFiltersCount > 0
                      ? 'bg-gray-800 border-orange-500 text-white' 
                      : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-500'
                  }`}
                 >
                   <SlidersHorizontal size={18} className={activeFiltersCount > 0 ? "text-orange-500" : ""} />
                   <span>필터</span>
                   {activeFiltersCount > 0 && (
                     <span className="bg-orange-600 text-white text-xs font-bold px-2 py-0.5 rounded-full ml-1">
                       {activeFiltersCount}
                     </span>
                   )}
                   <ChevronDown size={16} className={`transition-transform duration-200 ${isFilterOpen ? 'rotate-180' : ''}`} />
                 </button>
              </div>

              {/* Expandable Filter Panel */}
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isFilterOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-xl mb-8">
                  <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-700">
                    <h3 className="text-white font-bold flex items-center">
                      <Filter size={16} className="mr-2 text-orange-500" /> 상세 검색 조건
                    </h3>
                    {activeFiltersCount > 0 && (
                      <button 
                        onClick={resetFilters}
                        className="text-xs text-gray-400 hover:text-white flex items-center underline"
                      >
                        <X size={12} className="mr-1" /> 초기화
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Category Filter */}
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">카테고리</label>
                      <div className="flex flex-wrap gap-2">
                        <button 
                          onClick={() => setActiveCategory('ALL')}
                          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all border ${
                            activeCategory === 'ALL' 
                              ? 'bg-orange-600 border-orange-600 text-white' 
                              : 'bg-gray-900 border-gray-700 text-gray-400 hover:border-gray-500'
                          }`}
                        >
                          전체
                        </button>
                        {Object.values(Category).map((cat) => (
                          <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all border ${
                              activeCategory === cat 
                                ? 'bg-orange-600 border-orange-600 text-white' 
                                : 'bg-gray-900 border-gray-700 text-gray-400 hover:border-gray-500'
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Brand Filter */}
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">브랜드</label>
                      <select 
                        value={activeBrand}
                        onChange={(e) => setActiveBrand(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                      >
                        <option value="ALL">모든 브랜드</option>
                        {brands.filter(b => b !== 'ALL').map(brand => (
                          <option key={brand} value={brand}>{brand}</option>
                        ))}
                      </select>
                    </div>

                    {/* Price Range Filter */}
                    <div>
                      <div className="flex justify-between items-end mb-3">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">가격대</label>
                        <span className="text-orange-500 font-bold text-sm">
                          ₩{priceRange[0].toLocaleString()} ~ ₩{priceRange[1].toLocaleString()}
                        </span>
                      </div>
                      
                      <div className="relative w-full h-12 flex items-center">
                        {/* Track Background */}
                        <div className="absolute w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                           <div 
                              className="absolute h-full bg-orange-600" 
                              style={{ 
                                left: `${getPercent(priceRange[0])}%`, 
                                right: `${100 - getPercent(priceRange[1])}%` 
                              }}
                           ></div>
                        </div>

                        {/* Min Slider */}
                        <input 
                          type="range" 
                          min={MIN_PRICE_LIMIT} 
                          max={MAX_PRICE_LIMIT} 
                          step={10000}
                          value={priceRange[0]} 
                          onChange={handleMinChange}
                          className="absolute w-full pointer-events-none appearance-none bg-transparent z-20 h-2 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-orange-600 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg hover:[&::-webkit-slider-thumb]:scale-110 transition-all"
                        />
                        
                        {/* Max Slider */}
                        <input 
                          type="range" 
                          min={MIN_PRICE_LIMIT} 
                          max={MAX_PRICE_LIMIT} 
                          step={10000}
                          value={priceRange[1]} 
                          onChange={handleMaxChange}
                          className="absolute w-full pointer-events-none appearance-none bg-transparent z-30 h-2 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-orange-600 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg hover:[&::-webkit-slider-thumb]:scale-110 transition-all"
                        />
                      </div>
                      <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                         <span>₩{MIN_PRICE_LIMIT.toLocaleString()}</span>
                         <span>₩{MAX_PRICE_LIMIT.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
                {filteredProducts.map((product, index) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    rank={index + 1} 
                    onClick={setSelectedProduct} 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-gray-800/50 rounded-2xl border border-dashed border-gray-700">
                <p className="text-gray-400 text-lg mb-2">조건에 맞는 상품이 없습니다.</p>
                <button 
                  onClick={resetFilters}
                  className="text-orange-500 font-bold hover:underline"
                >
                  필터 초기화하기
                </button>
              </div>
            )}
          </main>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 pb-20">
      <Navbar currentView={currentView} onNavigate={setCurrentView} />

      {renderContent()}

      {/* Onboarding Guide (Only for first-time visitors) */}
      {showGuide && <OnboardingGuide onClose={handleCloseGuide} />}

      {/* Modal */}
      {selectedProduct && (
        <ProductDetailModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </div>
  );
};

export default App;