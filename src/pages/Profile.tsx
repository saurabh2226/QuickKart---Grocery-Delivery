import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { User, MapPin, Wallet, LogOut, Edit3, ChevronRight, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Profile() {
  const { user, logout, setUser } = useAuthStore();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [editEmail, setEditEmail] = useState(user?.email || '');
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({ label: '', houseNo: '', street: '', city: '', pincode: '' });

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSaveProfile = () => {
    setUser({ ...user, name: editName, email: editEmail });
    setIsEditing(false);
    toast.success('Profile updated');
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate address addition
    toast.success('Address added successfully');
    setIsAddingAddress(false);
    setNewAddress({ label: '', houseNo: '', street: '', city: '', pincode: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-white p-4 sticky top-0 z-40 shadow-sm">
        <h1 className="text-xl font-bold text-gray-900">Profile</h1>
      </header>

      <div className="p-4 space-y-4">
        {/* User Info */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-2xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">{user.name}</h2>
              <p className="text-sm text-gray-500">{user.phone || user.email}</p>
            </div>
          </div>
          <button onClick={() => setIsEditing(true)} className="p-2 text-gray-400 hover:text-emerald-600 bg-gray-50 rounded-full">
            <Edit3 className="w-5 h-5" />
          </button>
        </div>

        {/* Links */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <button onClick={() => navigate('/wallet')} className="w-full flex items-center justify-between p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><Wallet className="w-5 h-5" /></div>
              <span className="font-medium text-gray-900">QuickKart Wallet</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-emerald-600">₹{user.walletBalance}</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </button>
          
          <button onClick={() => setIsAddingAddress(true)} className="w-full flex items-center justify-between p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><MapPin className="w-5 h-5" /></div>
              <span className="font-medium text-gray-900">Manage Addresses</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button onClick={handleLogout} className="w-full flex items-center justify-between p-4 hover:bg-red-50 transition-colors text-red-600">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-50 rounded-lg"><LogOut className="w-5 h-5" /></div>
              <span className="font-medium">Logout</span>
            </div>
          </button>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-2xl">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Edit Profile</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" />
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setIsEditing(false)} className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200">Cancel</button>
                <button onClick={handleSaveProfile} className="flex-1 py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700">Save</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Address Modal */}
      {isAddingAddress && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-2xl">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Add New Address</h2>
            <form onSubmit={handleAddAddress} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Label (e.g., Home, Work)</label>
                <input required type="text" value={newAddress.label} onChange={(e) => setNewAddress({...newAddress, label: e.target.value})} className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">House No. / Flat</label>
                <input required type="text" value={newAddress.houseNo} onChange={(e) => setNewAddress({...newAddress, houseNo: e.target.value})} className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Street / Area</label>
                <input required type="text" value={newAddress.street} onChange={(e) => setNewAddress({...newAddress, street: e.target.value})} className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" />
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input required type="text" value={newAddress.city} onChange={(e) => setNewAddress({...newAddress, city: e.target.value})} className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                  <input required type="text" value={newAddress.pincode} onChange={(e) => setNewAddress({...newAddress, pincode: e.target.value})} className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button type="button" onClick={() => setIsAddingAddress(false)} className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200">Cancel</button>
                <button type="submit" className="flex-1 py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700">Add Address</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
