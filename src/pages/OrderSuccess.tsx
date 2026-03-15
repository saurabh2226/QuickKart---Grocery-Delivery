import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle2, Home, MapPin, Package, CreditCard } from 'lucide-react';
import { motion } from 'motion/react';

export default function OrderSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const { total, paymentMethod } = location.state || { total: 0, paymentMethod: 'Unknown' };

  useEffect(() => {
    if (total === 0) {
      navigate('/');
    }
  }, [total, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', bounce: 0.5 }}
        className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-6"
      >
        <CheckCircle2 className="w-12 h-12 text-emerald-600" />
      </motion.div>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">Order Placed!</h1>
      <p className="text-gray-500 mb-8 text-center">Your groceries will be delivered in 10 minutes.</p>

      <div className="bg-white p-6 rounded-2xl shadow-sm w-full max-w-sm border border-gray-100 space-y-4 mb-8">
        <div className="flex items-start gap-3">
          <Package className="w-5 h-5 text-gray-400 mt-0.5" />
          <div>
            <p className="text-sm text-gray-500">Order ID</p>
            <p className="font-bold text-gray-900">#QK{Math.floor(Math.random() * 1000000)}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <CreditCard className="w-5 h-5 text-gray-400 mt-0.5" />
          <div>
            <p className="text-sm text-gray-500">Amount & Payment</p>
            <p className="font-bold text-gray-900">₹{total} via {paymentMethod}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
          <div>
            <p className="text-sm text-gray-500">Delivery Address</p>
            <p className="font-bold text-gray-900">123 Main St, City</p>
          </div>
        </div>
      </div>

      <button
        onClick={() => navigate('/')}
        className="w-full max-w-sm bg-emerald-600 text-white font-bold py-4 rounded-xl hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 shadow-sm"
      >
        <Home className="w-5 h-5" /> Back to Home
      </button>
    </div>
  );
}
