import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useOrderStore } from '../store/orderStore';
import { LogOut, MapPin, Phone, CheckCircle2, Navigation, Check } from 'lucide-react';
import toast from 'react-hot-toast';

export default function DeliveryDashboard() {
  const { user, logout } = useAuthStore();
  const { orders, updateOrderStatus } = useOrderStore();
  const navigate = useNavigate();
  const [enteredOtp, setEnteredOtp] = useState('');

  const activeOrder = orders.find(o => o.status !== 'delivered') || orders[0];

  if (!user || user.role !== 'delivery') {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleAccept = () => {
    if (activeOrder) {
      updateOrderStatus(activeOrder.id, 'accepted');
      toast.success('Order accepted! Please head to the store.');
    }
  };

  const handleShareLocation = () => {
    if (activeOrder) {
      updateOrderStatus(activeOrder.id, 'sharing');
      toast.success('Live location sharing started. Customer can now track you.');
    }
  };

  const handleComplete = () => {
    if (activeOrder && enteredOtp === activeOrder.otp) {
      updateOrderStatus(activeOrder.id, 'delivered');
      toast.success('Order marked as delivered!');
      setEnteredOtp('');
    } else {
      toast.error('Invalid OTP. Please check with the customer.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-white p-4 sticky top-0 z-40 shadow-sm flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Delivery Partner</h1>
          <p className="text-xs text-gray-500">{user.name}</p>
        </div>
        <button onClick={handleLogout} className="p-2 text-red-600 hover:bg-red-50 rounded-full">
          <LogOut className="w-5 h-5" />
        </button>
      </header>

      <div className="p-4 space-y-4">
        <h2 className="font-bold text-gray-900 mb-2">Active Orders</h2>
        
        {activeOrder && activeOrder.status !== 'delivered' ? (
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-gray-900 text-lg">#{activeOrder.id}</h3>
                <p className="text-sm text-gray-500">{activeOrder.items} • ₹{activeOrder.total}</p>
              </div>
              <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                activeOrder.status === 'pending' ? 'bg-orange-50 text-orange-600' :
                activeOrder.status === 'accepted' ? 'bg-blue-50 text-blue-600' :
                'bg-emerald-50 text-emerald-600'
              }`}>
                {activeOrder.status === 'pending' ? 'New Order' : 
                 activeOrder.status === 'accepted' ? 'Accepted' : 
                 'In Transit'}
              </span>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Delivery Address</p>
                  <p className="text-sm text-gray-500">123 Main St, Apt 4B, City Center</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-emerald-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Customer Contact</p>
                  <p className="text-sm text-gray-500">+91 98765 43210</p>
                </div>
              </div>
            </div>

            {activeOrder.status === 'pending' && (
              <button onClick={handleAccept} className="w-full bg-emerald-600 text-white font-bold py-3 rounded-xl hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2">
                <Check className="w-5 h-5" /> Accept Order
              </button>
            )}

            {activeOrder.status === 'accepted' && (
              <button onClick={handleShareLocation} className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                <Navigation className="w-5 h-5" /> Start Trip & Share Location
              </button>
            )}

            {activeOrder.status === 'sharing' && (
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 text-center">Enter Delivery OTP</label>
                  <input
                    type="text"
                    value={enteredOtp}
                    onChange={(e) => setEnteredOtp(e.target.value.replace(/\D/g, ''))}
                    placeholder="4-digit OTP"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-center tracking-[0.5em] font-mono text-xl font-bold"
                    maxLength={4}
                  />
                </div>
                <button 
                  onClick={handleComplete} 
                  disabled={enteredOtp.length !== 4}
                  className="w-full bg-emerald-600 text-white font-bold py-3 rounded-xl hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <CheckCircle2 className="w-5 h-5" /> Verify & Mark Delivered
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Active Orders</h3>
            <p className="text-gray-500">Waiting for new delivery requests...</p>
          </div>
        )}
      </div>
    </div>
  );
}
