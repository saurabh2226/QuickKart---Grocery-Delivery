import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin, Navigation, Package, Phone } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { useOrderStore } from '../store/orderStore';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const deliveryIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/2972/2972185.png', // Delivery bike icon
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

const homeIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/25/25694.png', // Home icon
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

export default function TrackOrder() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { orders } = useOrderStore();
  
  const order = orders.find(o => o.id === id) || orders[0];
  
  const [deliveryLocation, setDeliveryLocation] = useState<[number, number]>([28.6139, 77.2090]); // Default Delhi
  const [homeLocation] = useState<[number, number]>([28.6200, 77.2150]); // Default Home
  
  const otp = order?.otp || '2346';

  useEffect(() => {
    // Simulate delivery person moving towards home
    const interval = setInterval(() => {
      setDeliveryLocation(prev => {
        const latDiff = homeLocation[0] - prev[0];
        const lngDiff = homeLocation[1] - prev[1];
        
        // Move 10% closer each tick
        return [
          prev[0] + latDiff * 0.1,
          prev[1] + lngDiff * 0.1
        ];
      });
    }, 2000);
    
    return () => clearInterval(interval);
  }, [homeLocation]);

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Order Not Found</h2>
        <button onClick={() => navigate('/orders')} className="text-emerald-600 font-medium">Go back to orders</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white p-4 sticky top-0 z-40 shadow-sm flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-lg font-bold">Track Order</h1>
          <p className="text-xs text-gray-500">Order #{order.id}</p>
        </div>
      </header>

      <div className="flex-1 relative z-0">
        <MapContainer 
          center={deliveryLocation} 
          zoom={15} 
          style={{ height: '100%', width: '100%', minHeight: '400px' }}
          zoomControl={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={deliveryLocation} icon={deliveryIcon}>
            <Popup>Delivery Partner</Popup>
          </Marker>
          <Marker position={homeLocation} icon={homeIcon}>
            <Popup>Delivery Location</Popup>
          </Marker>
          <Polyline positions={[deliveryLocation, homeLocation]} color="#059669" weight={4} dashArray="10, 10" />
        </MapContainer>
      </div>

      <div className="bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] p-5 relative z-10 -mt-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {order.status === 'pending' ? 'Processing Order' : 
               order.status === 'accepted' ? 'Partner at Store' : 
               order.status === 'sharing' ? 'Arriving in 8 mins' : 'Delivered'}
            </h2>
            <p className="text-sm text-gray-500">
              {order.status === 'pending' ? 'Waiting for partner to accept' : 
               order.status === 'accepted' ? 'Partner is picking up your items' : 
               order.status === 'sharing' ? 'Your order is on the way' : 'Order has been delivered'}
            </p>
          </div>
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
            <Package className="w-6 h-6 text-emerald-600" />
          </div>
        </div>

        <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
          <img src="https://i.pravatar.cc/150?img=11" alt="Delivery Partner" className="w-12 h-12 rounded-full border-2 border-white shadow-sm" />
          <div className="flex-1">
            <h3 className="font-bold text-gray-900">Raju Kumar</h3>
            <p className="text-xs text-gray-500">Delivery Partner • 4.8 ★</p>
          </div>
          <button className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center hover:bg-emerald-200 transition-colors">
            <Phone className="w-5 h-5" />
          </button>
        </div>

        {order.status !== 'delivered' && (
          <div className="mt-4 bg-emerald-50 p-4 rounded-2xl border border-emerald-100 flex justify-between items-center">
            <div>
              <p className="text-xs text-emerald-600 font-bold uppercase tracking-wider mb-1">Delivery OTP</p>
              <p className="text-sm text-emerald-900 font-medium">Share this with the partner</p>
            </div>
            <div className="text-2xl font-mono font-bold tracking-widest text-emerald-700 bg-white px-4 py-2 rounded-xl shadow-sm border border-emerald-100">
              {otp}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
