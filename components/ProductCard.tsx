import React, { useState } from 'react';
import { Star, ChevronRight, ShoppingBag, Activity, Disc } from 'lucide-react';
import { Product, Category } from '../types';

interface ProductCardProps {
  product: Product;
  rank: number;
  onClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, rank, onClick }) => {
  const [imgError, setImgError] = useState(false);

  // Render a category-specific icon if the image fails
  const renderFallback = () => {
    let Icon = ShoppingBag;
    if (product.category === Category.SHOES) Icon = Activity; // Using Activity as a placeholder for Shoes/Action
    if (product.category === Category.BALL) Icon = Disc;
    
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-gray-800 text-gray-500">
        <Icon size={48} className="mb-2 opacity-50" />
        <span className="text-xs font-medium opacity-50">No Image</span>
      </div>
    );
  };

  return (
    <div 
      className="group bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-orange-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/10 cursor-pointer relative"
      onClick={() => onClick(product)}
    >
      <div className="absolute top-3 left-3 bg-gray-900/80 backdrop-blur-sm text-white px-3 py-1 rounded-full font-bold text-sm border border-gray-700 z-10">
        #{rank}
      </div>
      
      <div className="relative aspect-square overflow-hidden bg-white">
        {imgError ? (
          renderFallback()
        ) : (
          <>
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              onError={() => setImgError(true)}
              className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500 bg-white"
              loading="lazy"
            />
            {/* Removed the dark gradient overlay to keep it clean white */}
          </>
        )}
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-orange-500 text-xs font-bold uppercase tracking-wider mb-1">{product.brand}</p>
            <h3 className="text-lg font-bold text-white leading-tight group-hover:text-orange-400 transition-colors">{product.name}</h3>
          </div>
        </div>
        
        <div className="flex items-center mb-3">
          <Star className="w-4 h-4 text-yellow-500 fill-current" />
          <span className="ml-1 text-sm font-medium text-gray-300">{product.rating}</span>
          <span className="mx-2 text-gray-600">•</span>
          <span className="text-sm text-gray-400">{product.category}</span>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <span className="text-lg font-bold text-white">₩{product.price.toLocaleString()}</span>
          <button className="p-2 bg-gray-700 rounded-full text-gray-300 group-hover:bg-orange-600 group-hover:text-white transition-colors">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;