import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import { useOrderStore } from '../store/orderStore';
import { ArrowLeft, Minus, Plus, Trash2, MapPin, Wallet, CreditCard, Banknote, ShoppingCart } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Cart() {
  const { items, updateQuantity, removeItem, getTotal, clearCart } = useCartStore();
  const { user, isGuest, addTransaction } = useAuthStore();
  const { addOrder } = useOrderStore();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'Wallet' | 'UPI'>('COD');

  const subtotal = getTotal();
  const deliveryFee = subtotal > 100 ? 0 : 30;
  const total = subtotal + deliveryFee;

  const handleCheckout = () => {
    if (isGuest || !user) {
      toast.error('Please login to checkout');
      navigate('/login');
      return;
    }

    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    const placeOrder = () => {
      addOrder({
        total,
        items: items.map(i => `${i.quantity}x ${i.name}`).join(', '),
      });
      clearCart();
    };

    if (paymentMethod === 'Wallet') {
      if (user.walletBalance < total) {
        toast.error('Insufficient wallet balance');
        return;
      }
      // Deduct wallet balance via transaction
      addTransaction({
        type: 'debit',
        amount: total,
        description: 'Grocery Order',
      });
      toast.success('Paid via Wallet');
      toast.success('Order Placed Successfully!');
      placeOrder();
      navigate('/order-success', { state: { total, paymentMethod } });
    } else if (paymentMethod === 'UPI') {
      navigate('/payment', { state: { total, items: items.map(i => `${i.quantity}x ${i.name}`).join(', ') } });
    } else {
      // COD
      toast.success('Order Placed Successfully!');
      placeOrder();
      navigate('/order-success', { state: { total, paymentMethod } });
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
          <ShoppingCart className="w-10 h-10 text-gray-400" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Looks like you haven't added anything yet.</p>
        <button
          onClick={() => navigate('/')}
          className="bg-emerald-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-emerald-700 transition-colors"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      <header className="bg-white p-4 sticky top-0 z-40 shadow-sm flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-bold">Cart</h1>
      </header>

      <div className="p-4 space-y-4">
        {/* Delivery Address (Mock) */}
        <div className="bg-white p-4 rounded-2xl shadow-sm flex items-start gap-3">
          <MapPin className="w-5 h-5 text-emerald-600 mt-0.5" />
          <div>
            <h3 className="font-bold text-gray-900">Delivery in 10 mins</h3>
            <p className="text-sm text-gray-500">Home - 123 Main St, City</p>
          </div>
        </div>

        {/* Cart Items */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {items.map((item) => (
            <div key={item.productId} className="flex gap-3 p-4 border-b border-gray-100 last:border-0">
              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl bg-gray-100" />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-gray-900">{item.name}</h3>
                  <button onClick={() => removeItem(item.productId)} className="text-gray-400 hover:text-red-500">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="font-bold">₹{item.price}</span>
                  <div className="flex items-center bg-emerald-50 text-emerald-700 rounded-lg px-2 py-1 border border-emerald-100">
                    <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} className="p-1">
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-sm font-bold mx-3">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} className="p-1">
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bill Details */}
        <div className="bg-white p-4 rounded-2xl shadow-sm space-y-3">
          <h3 className="font-bold text-gray-900 mb-2">Bill Details</h3>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Item Total</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Delivery Fee</span>
            {deliveryFee === 0 ? (
              <span className="text-emerald-600 font-medium">FREE</span>
            ) : (
              <span>₹{deliveryFee}</span>
            )}
          </div>
          {deliveryFee > 0 && (
            <p className="text-xs text-emerald-600 bg-emerald-50 p-2 rounded-lg">
              Add items worth ₹{100 - subtotal} more to get FREE delivery!
            </p>
          )}
          <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-gray-900">
            <span>To Pay</span>
            <span>₹{total}</span>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white p-4 rounded-2xl shadow-sm space-y-3">
          <h3 className="font-bold text-gray-900 mb-2">Payment Method</h3>
          
          <label className="flex items-center justify-between p-3 border rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><CreditCard className="w-5 h-5" /></div>
              <span className="font-medium">UPI</span>
            </div>
            <input type="radio" name="payment" checked={paymentMethod === 'UPI'} onChange={() => setPaymentMethod('UPI')} className="w-4 h-4 text-emerald-600 focus:ring-emerald-500" />
          </label>

          <label className="flex items-center justify-between p-3 border rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><Wallet className="w-5 h-5" /></div>
              <div>
                <span className="font-medium block">QuickKart Wallet</span>
                <span className="text-xs text-gray-500">Balance: ₹{user?.walletBalance || 0}</span>
              </div>
            </div>
            <input type="radio" name="payment" checked={paymentMethod === 'Wallet'} onChange={() => setPaymentMethod('Wallet')} className="w-4 h-4 text-emerald-600 focus:ring-emerald-500" />
          </label>

          <label className="flex items-center justify-between p-3 border rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><Banknote className="w-5 h-5" /></div>
              <span className="font-medium">Cash on Delivery</span>
            </div>
            <input type="radio" name="payment" checked={paymentMethod === 'COD'} onChange={() => setPaymentMethod('COD')} className="w-4 h-4 text-emerald-600 focus:ring-emerald-500" />
          </label>
        </div>
      </div>

      {/* Checkout Bar */}
      <div className="fixed bottom-16 left-0 right-0 bg-white p-4 border-t border-gray-200 z-40">
        <div className="max-w-md mx-auto flex gap-4 items-center">
          <div className="flex-1">
            <p className="text-xs text-gray-500">Total to pay</p>
            <p className="text-xl font-bold text-gray-900">₹{total}</p>
          </div>
          <button
            onClick={handleCheckout}
            className="flex-[2] bg-emerald-600 text-white font-bold py-3.5 rounded-xl hover:bg-emerald-700 transition-colors shadow-sm"
          >
            {isGuest ? 'Login to Checkout' : 'Place Order'}
          </button>
        </div>
      </div>
    </div>
  );
}
