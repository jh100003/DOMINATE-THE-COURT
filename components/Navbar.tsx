import React from 'react';
import { ShoppingBag, Search, BarChart2, Gamepad2 } from 'lucide-react';

interface NavbarProps {
  currentView: 'ranking' | 'recommend' | 'test';
  onNavigate: (view: 'ranking' | 'recommend' | 'test') => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  return (
    <nav className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate('ranking')}>
            <div className="bg-orange-600 p-2 rounded-full mr-3">
              <ShoppingBag className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Hoop<span className="text-orange-500">Fit</span></span>
          </div>
          
          <div className="flex space-x-2 sm:space-x-4">
            <button
              id="nav-ranking"
              onClick={() => onNavigate('ranking')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-2 ${
                currentView === 'ranking' 
                  ? 'bg-gray-800 text-white' 
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <BarChart2 size={18} />
              <span className="hidden sm:inline">랭킹</span>
            </button>
            <button
              id="nav-test"
              onClick={() => onNavigate('test')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-2 ${
                currentView === 'test' 
                  ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20' 
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Gamepad2 size={18} />
              <span className="hidden sm:inline">성향 테스트</span>
            </button>
            <button
              id="nav-recommend"
              onClick={() => onNavigate('recommend')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-2 ${
                currentView === 'recommend' 
                  ? 'bg-gray-800 text-white' 
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Search size={18} />
              <span className="hidden sm:inline">AI 추천</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;