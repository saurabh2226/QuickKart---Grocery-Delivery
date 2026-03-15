import { Link, useLocation } from 'react-router-dom';
import { Home, Search, ShoppingCart, User, ListOrdered } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import { cn } from '../lib/utils';

export default function BottomNav() {
  const location = useLocation();
  const items = useCartStore((state) => state.items);
  const user = useAuthStore((state) => state.user);
  const isGuest = useAuthStore((state) => state.isGuest);

  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Search, label: 'Search', path: '/search' },
    { icon: ShoppingCart, label: 'Cart', path: '/cart', badge: cartCount },
    { icon: ListOrdered, label: 'Orders', path: '/orders' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  if (user?.role === 'admin' || user?.role === 'delivery' || user?.role === 'shop_owner') {
    return null; // Don't show bottom nav for these roles
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 pb-[env(safe-area-inset-bottom)]">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex flex-col items-center justify-center w-full h-full space-y-1',
                isActive ? 'text-emerald-600' : 'text-gray-500 hover:text-gray-900'
              )}
            >
              <div className="relative">
                <item.icon className="w-6 h-6" />
                {item.badge ? (
                  <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                ) : null}
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
