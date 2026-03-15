import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Loader2, Smartphone, QrCode } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import { useOrderStore } from '../store/orderStore';
import toast from 'react-hot-toast';
import { QRCodeSVG } from 'qrcode.react';

export default function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const { clearCart } = useCartStore();
  const { user, addTransaction } = useAuthStore();
  const { addOrder } = useOrderStore();
  const [status, setStatus] = useState<'pending' | 'processing' | 'success'>('pending');
  
  const total = location.state?.total || 0;
  const items = location.state?.items || '';
  const isWalletTopup = location.state?.isWalletTopup || false;
  
  const upiId = "jaunelia@slc";
  const merchantName = "QuickKart";
  const upiUrl = `upi://pay?pa=${upiId}&pn=${merchantName}&am=${total}&cu=INR&tn=${isWalletTopup ? 'Wallet Topup' : 'Grocery Order'}`;

  useEffect(() => {
    if (total === 0) {
      navigate('/');
      return;
    }
  }, [total, navigate]);

  const handleConfirmPayment = () => {
    setStatus('processing');
    const timer = setTimeout(() => {
      setStatus('success');
      
      if (isWalletTopup && user) {
        addTransaction({
          type: 'credit',
          amount: total,
          description: 'Added via UPI',
        });
        toast.success(`₹${total} added to wallet successfully!`);
        setTimeout(() => {
          navigate('/wallet');
        }, 1500);
      } else {
        addOrder({
          total,
          items,
        });
        clearCart();
        setTimeout(() => {
          navigate('/order-success', { state: { total, paymentMethod: 'UPI' } });
        }, 1500);
      }
    }, 3000);
    return () => clearTimeout(timer);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white p-4 shadow-sm flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-bold">UPI Payment</h1>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center pb-32">
        {status === 'pending' ? (
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm w-full max-w-sm border border-gray-100 flex flex-col items-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Pay via UPI</h2>
            <p className="text-gray-500 mb-6 text-sm">Scan QR or open UPI app to pay</p>

            <div className="bg-white p-4 rounded-2xl shadow-inner border border-gray-100 mb-6">
              <QRCodeSVG value={upiUrl} size={200} level="H" />
            </div>

            <div className="w-full mb-6">
              <p className="text-sm text-gray-500 mb-1">Amount to pay</p>
              <p className="text-3xl font-bold text-gray-900">₹{total}</p>
              <p className="text-sm text-gray-500 mt-2">UPI ID: <span className="font-semibold text-gray-900">{upiId}</span></p>
            </div>
          </div>
        ) : status === 'processing' ? (
          <>
            <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6 relative">
              <Smartphone className="w-10 h-10 text-blue-600 absolute" />
              <Loader2 className="w-16 h-16 text-blue-600 animate-spin" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Verifying Payment</h2>
            <p className="text-gray-500 mb-8">Please wait while we confirm your transaction.</p>
          </>
        ) : (
          <>
            <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-12 h-12 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
            <p className="text-gray-500">Redirecting to order confirmation...</p>
          </>
        )}
      </div>

      {status === 'pending' && (
        <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-200 z-50">
          <div className="max-w-md mx-auto flex flex-col gap-3">
            <a
              href={upiUrl}
              className="w-full bg-emerald-600 text-white font-bold py-3.5 rounded-xl hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <Smartphone className="w-5 h-5" /> Open UPI App
            </a>
            <button
              onClick={handleConfirmPayment}
              className="w-full bg-gray-100 text-gray-700 font-bold py-3.5 rounded-xl hover:bg-gray-200 transition-colors"
            >
              I have paid
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
