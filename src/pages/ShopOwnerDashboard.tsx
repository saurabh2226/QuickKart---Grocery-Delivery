import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useOrderStore } from '../store/orderStore';
import { LogOut, Store, Package, TrendingUp, Edit2, X, Check } from 'lucide-react';
import { PRODUCTS, Product } from '../data/products';
import toast from 'react-hot-toast';

export default function ShopOwnerDashboard() {
  const { user, logout } = useAuthStore();
  const { orders, updateOrderStatus } = useOrderStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'orders' | 'inventory' | 'analytics'>('orders');
  
  // Local state for products to allow editing
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  if (!user || user.role !== 'shop_owner') {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? editingProduct : p));
      setEditingProduct(null);
      toast.success('Product updated successfully');
    }
  };

  const handleAcceptOrder = (id: string) => {
    updateOrderStatus(id, 'accepted');
    toast.success('Order accepted and ready for delivery');
  };

  const handleRejectOrder = (id: string) => {
    // For demo purposes, we'll just remove it or mark it delivered/cancelled
    toast.error('Order rejected');
  };

  // Mock high demand products
  const highDemandProducts = [...products].sort((a, b) => b.price - a.price).slice(0, 5);
  
  const pendingOrders = orders.filter(o => o.status === 'pending');

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-white p-4 sticky top-0 z-40 shadow-sm flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Store Manager</h1>
          <p className="text-xs text-gray-500">{user.name}</p>
        </div>
        <button onClick={handleLogout} className="p-2 text-red-600 hover:bg-red-50 rounded-full">
          <LogOut className="w-5 h-5" />
        </button>
      </header>

      <div className="bg-white border-b border-gray-200 sticky top-[72px] z-30">
        <div className="flex">
          <button 
            onClick={() => setActiveTab('orders')}
            className={`flex-1 py-3 text-sm font-medium border-b-2 ${activeTab === 'orders' ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-gray-500'}`}
          >
            Orders
          </button>
          <button 
            onClick={() => setActiveTab('inventory')}
            className={`flex-1 py-3 text-sm font-medium border-b-2 ${activeTab === 'inventory' ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-gray-500'}`}
          >
            Inventory
          </button>
          <button 
            onClick={() => setActiveTab('analytics')}
            className={`flex-1 py-3 text-sm font-medium border-b-2 ${activeTab === 'analytics' ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-gray-500'}`}
          >
            Analytics
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {activeTab === 'orders' && (
          <>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-full mb-2"><Package className="w-6 h-6" /></div>
                <p className="text-xs text-gray-500 font-medium">Pending Orders</p>
                <h3 className="text-2xl font-bold text-gray-900">{pendingOrders.length}</h3>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-full mb-2"><Store className="w-6 h-6" /></div>
                <p className="text-xs text-gray-500 font-medium">Low Stock Items</p>
                <h3 className="text-2xl font-bold text-gray-900">5</h3>
              </div>
            </div>

            <h2 className="font-bold text-gray-900 mb-2">Recent Orders</h2>
            
            {pendingOrders.map(order => (
              <div key={order.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">#{order.id}</h3>
                    <p className="text-sm text-gray-500">{order.date} • ₹{order.total}</p>
                  </div>
                  <span className="bg-orange-50 text-orange-600 px-3 py-1 rounded-lg text-xs font-bold">New</span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <p className="text-sm font-medium text-gray-900">Items:</p>
                  <p className="text-sm text-gray-600">{order.items}</p>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => handleRejectOrder(order.id)} className="flex-1 bg-gray-100 text-gray-700 font-bold py-2 rounded-xl hover:bg-gray-200 transition-colors text-sm">
                    Reject
                  </button>
                  <button onClick={() => handleAcceptOrder(order.id)} className="flex-1 bg-emerald-600 text-white font-bold py-2 rounded-xl hover:bg-emerald-700 transition-colors text-sm">
                    Accept & Pack
                  </button>
                </div>
              </div>
            ))}
            
            {pendingOrders.length === 0 && (
              <div className="text-center py-10 text-gray-500">
                <Package className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                <p>No pending orders at the moment.</p>
              </div>
            )}
          </>
        )}

        {activeTab === 'inventory' && (
          <div className="space-y-3">
            {products.map(product => (
              <div key={product.id} className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-xl bg-gray-50" />
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-sm">{product.name}</h3>
                  <p className="text-xs text-gray-500">{product.unit} • ₹{product.price}</p>
                </div>
                <button 
                  onClick={() => setEditingProduct(product)}
                  className="p-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
                <h2 className="font-bold text-gray-900">High Demand Products</h2>
              </div>
              <div className="space-y-3">
                {highDemandProducts.map((product, index) => (
                  <div key={product.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-xl">
                    <div className="w-6 text-center font-bold text-gray-400">#{index + 1}</div>
                    <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded-lg bg-gray-100" />
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-gray-900">{product.name}</h3>
                      <p className="text-xs text-gray-500">{Math.floor(Math.random() * 50) + 20} orders today</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
              <h2 className="font-bold text-lg">Edit Product</h2>
              <button onClick={() => setEditingProduct(null)} className="p-1 hover:bg-gray-100 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveProduct} className="p-4 space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Name</label>
                <input 
                  type="text" 
                  value={editingProduct.name}
                  onChange={e => setEditingProduct({...editingProduct, name: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Price (₹)</label>
                  <input 
                    type="number" 
                    value={editingProduct.price}
                    onChange={e => setEditingProduct({...editingProduct, price: Number(e.target.value)})}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Original Price (₹)</label>
                  <input 
                    type="number" 
                    value={editingProduct.originalPrice}
                    onChange={e => setEditingProduct({...editingProduct, originalPrice: Number(e.target.value)})}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Unit</label>
                <input 
                  type="text" 
                  value={editingProduct.unit}
                  onChange={e => setEditingProduct({...editingProduct, unit: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                  value={editingProduct.description}
                  onChange={e => setEditingProduct({...editingProduct, description: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                  rows={3}
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-emerald-600 text-white font-bold py-3 rounded-xl hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
              >
                <Check className="w-5 h-5" /> Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
