import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useOrderStore } from '../store/orderStore';
import { ArrowLeft, Package, Clock, ChevronRight } from 'lucide-react';

export default function Orders() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { orders } = useOrderStore();

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-white p-4 sticky top-0 z-40 shadow-sm flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-bold">My Orders</h1>
      </header>

      <div className="p-4 space-y-4">
        {orders.map((order) => (
          <div 
            key={order.id} 
            onClick={() => {
              if (order.status !== 'delivered') {
                navigate(`/track-order/${order.id}`);
              }
            }}
            className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><Package className="w-5 h-5" /></div>
                <div>
                  <h3 className="font-bold text-gray-900">Order #{order.id}</h3>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="w-3 h-3" /> {order.date}
                  </div>
                </div>
              </div>
              <span className="text-sm font-bold text-gray-900">₹{order.total}</span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-gray-50">
              <p className="text-sm text-gray-600 truncate flex-1 mr-4">{order.items}</p>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold px-2 py-1 rounded-md ${
                  order.status === 'delivered' ? 'bg-gray-100 text-gray-600' : 'bg-emerald-50 text-emerald-600'
                }`}>
                  {order.status === 'pending' ? 'Processing' : 
                   order.status === 'accepted' ? 'Accepted' : 
                   order.status === 'sharing' ? 'On the way' : 'Delivered'}
                </span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
