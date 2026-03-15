import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { ArrowLeft, Plus, Wallet as WalletIcon, ArrowUpRight, ArrowDownLeft, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Wallet() {
  const navigate = useNavigate();
  const { user, setUser } = useAuthStore();
  const [amount, setAmount] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleAddMoney = (e: React.FormEvent) => {
    e.preventDefault();
    const val = Number(amount);
    if (val > 0) {
      navigate('/payment', { state: { total: val, isWalletTopup: true } });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-emerald-600 text-white p-4 sticky top-0 z-40 shadow-sm flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-emerald-700 rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-bold">QuickKart Wallet</h1>
      </header>

      <div className="p-4 space-y-6">
        {/* Balance Card */}
        <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -z-10 opacity-50"></div>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl">
              <WalletIcon className="w-6 h-6" />
            </div>
            <span className="text-gray-500 font-medium">Available Balance</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900">₹{user.walletBalance}</h2>
        </div>

        {/* Add Money */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4">Add Money</h3>
          <form onSubmit={handleAddMoney} className="flex gap-3">
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₹</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full pl-8 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                required
                min="1"
              />
            </div>
            <button
              type="submit"
              disabled={isAdding || !amount}
              className="bg-emerald-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {isAdding ? 'Adding...' : <><Plus className="w-5 h-5" /> Add</>}
            </button>
          </form>
          <div className="flex gap-2 mt-3">
            {[100, 500, 1000].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => setAmount(val.toString())}
                className="px-4 py-1.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
              >
                +₹{val}
              </button>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">Recent Transactions</h3>
            <Clock className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {user.transactions && user.transactions.length > 0 ? (
              user.transactions.map((txn) => (
                <div key={txn.id} className="flex justify-between items-center pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${txn.type === 'credit' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                      {txn.type === 'credit' ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{txn.description}</p>
                      <p className="text-xs text-gray-500">{txn.date}</p>
                    </div>
                  </div>
                  <span className={`font-bold ${txn.type === 'credit' ? 'text-emerald-600' : 'text-gray-900'}`}>
                    {txn.type === 'credit' ? '+' : '-'}₹{txn.amount}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-gray-500">
                <p>No recent transactions</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
