import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useOrderStore } from '../store/orderStore';
import { LogOut, Users, Package, DollarSign, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const { user, logout } = useAuthStore();
  const { orders } = useOrderStore();
  const navigate = useNavigate();

  if (!user || user.role !== 'admin') {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const activeDeliveries = orders.filter(o => o.status === 'accepted' || o.status === 'sharing').length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-500">Welcome back, {user.name}</p>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 bg-white text-red-600 rounded-xl shadow-sm hover:bg-red-50 transition-colors font-medium border border-gray-100">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Users className="w-6 h-6" /></div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Users</p>
              <h3 className="text-2xl font-bold text-gray-900">1,245</h3>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><Package className="w-6 h-6" /></div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Orders</p>
              <h3 className="text-2xl font-bold text-gray-900">{orders.length}</h3>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl"><DollarSign className="w-6 h-6" /></div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Revenue</p>
              <h3 className="text-2xl font-bold text-gray-900">₹{totalRevenue}</h3>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="p-3 bg-orange-50 text-orange-600 rounded-xl"><TrendingUp className="w-6 h-6" /></div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Active Deliveries</p>
              <h3 className="text-2xl font-bold text-gray-900">{activeDeliveries}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100 text-sm text-gray-500">
                  <th className="pb-3 font-medium">Order ID</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Amount</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {orders.map(order => (
                  <tr key={order.id} className="border-b border-gray-50">
                    <td className="py-3 font-medium text-gray-900">#{order.id}</td>
                    <td className="py-3 text-gray-600">{order.date}</td>
                    <td className="py-3 font-medium text-gray-900">₹{order.total}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-md font-medium text-xs ${
                        order.status === 'delivered' ? 'bg-emerald-50 text-emerald-600' :
                        order.status === 'pending' ? 'bg-orange-50 text-orange-600' :
                        'bg-blue-50 text-blue-600'
                      }`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
                {orders.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-6 text-center text-gray-500">No orders yet</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
