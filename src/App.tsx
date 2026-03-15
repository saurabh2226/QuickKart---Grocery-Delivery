import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Payment from './pages/Payment';
import OrderSuccess from './pages/OrderSuccess';
import Profile from './pages/Profile';
import Wallet from './pages/Wallet';
import Search from './pages/Search';
import Orders from './pages/Orders';
import TrackOrder from './pages/TrackOrder';
import AdminDashboard from './pages/AdminDashboard';
import DeliveryDashboard from './pages/DeliveryDashboard';
import ShopOwnerDashboard from './pages/ShopOwnerDashboard';
import { useAuthStore } from './store/authStore';

function ProtectedRoute({ children, allowedRoles, requireAuth = false }: { children: React.ReactNode, allowedRoles?: string[], requireAuth?: boolean }) {
  const { user, isGuest } = useAuthStore();
  
  if (!user && !isGuest) {
    return <Navigate to="/login" replace />;
  }

  if (requireAuth && !user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <Router>
      <Toaster position="top-center" />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/cart" element={<Cart />} />
          
          <Route path="/payment" element={
            <ProtectedRoute requireAuth>
              <Payment />
            </ProtectedRoute>
          } />
          
          <Route path="/order-success" element={
            <ProtectedRoute requireAuth>
              <OrderSuccess />
            </ProtectedRoute>
          } />
          
          <Route path="/profile" element={
            <ProtectedRoute requireAuth>
              <Profile />
            </ProtectedRoute>
          } />
          
          <Route path="/wallet" element={
            <ProtectedRoute requireAuth>
              <Wallet />
            </ProtectedRoute>
          } />
          
          <Route path="/orders" element={
            <ProtectedRoute requireAuth>
              <Orders />
            </ProtectedRoute>
          } />

          <Route path="/track-order/:id" element={
            <ProtectedRoute requireAuth>
              <TrackOrder />
            </ProtectedRoute>
          } />
        </Route>

        <Route path="/admin" element={
          <ProtectedRoute requireAuth allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/delivery" element={
          <ProtectedRoute requireAuth allowedRoles={['delivery']}>
            <DeliveryDashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/shop-owner" element={
          <ProtectedRoute requireAuth allowedRoles={['shop_owner']}>
            <ShopOwnerDashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}
