import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Wallet, Search as SearchIcon, Mic } from 'lucide-react';
import BottomNav from './BottomNav';
import { useAuthStore } from '../store/authStore';

export default function Layout() {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleVoiceSearch = () => {
    // Simulated voice search
    alert('Voice search activated! (Simulation)');
    setSearchQuery('Milk');
    navigate(`/search?q=Milk`);
  };

  const isCustomerApp = !user || user.role === 'customer';
  const showHeader = isCustomerApp && !['/login', '/cart', '/payment', '/order-success', '/search', '/orders', '/profile', '/wallet'].includes(location.pathname) && !location.pathname.startsWith('/track-order');

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      {showHeader && (
        <header className="sticky top-0 z-40 bg-white shadow-sm">
          <div className="max-w-md mx-auto px-4 py-3">
            <div className="flex justify-between items-center mb-3">
              <div className="flex flex-col">
                <h1 className="text-xl font-bold text-emerald-600">QuickKart</h1>
                <span className="text-xs text-gray-500">Delivery in 10 mins</span>
              </div>
              <button 
                onClick={() => navigate('/wallet')}
                className="p-2 bg-emerald-50 text-emerald-600 rounded-full hover:bg-emerald-100 transition-colors"
              >
                <Wallet className="w-5 h-5" />
              </button>
            </div>
            
            <div className="relative flex items-center" onClick={() => navigate('/search')}>
              <SearchIcon className="absolute left-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search 'milk', 'bread'..."
                readOnly
                className="w-full pl-10 pr-10 py-2.5 bg-gray-100 border-none rounded-xl focus:ring-2 focus:ring-emerald-500 text-sm cursor-pointer"
              />
              <button 
                type="button" 
                onClick={(e) => { e.stopPropagation(); handleVoiceSearch(); }}
                className="absolute right-3 text-gray-400 hover:text-emerald-600"
              >
                <Mic className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>
      )}

      <main className="max-w-md mx-auto h-full">
        <Outlet />
      </main>

      {isCustomerApp && <BottomNav />}
    </div>
  );
}
