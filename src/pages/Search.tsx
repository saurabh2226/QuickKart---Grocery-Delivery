import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { PRODUCTS, Product } from '../data/products';
import { useCartStore } from '../store/cartStore';
import { ArrowLeft, Mic, Search as SearchIcon, Plus, Minus } from 'lucide-react';
import toast from 'react-hot-toast';

const SearchProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { items, addItem, updateQuantity } = useCartStore();
  const cartItem = items.find((i) => i.productId === product.id);

  return (
    <div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 flex items-center gap-4">
      <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded-xl bg-gray-50" />
      <div className="flex-1">
        <h3 className="font-bold text-gray-900">{product.name}</h3>
        <p className="text-xs text-gray-500 mb-2">{product.unit}</p>
        <div className="flex items-center justify-between">
          <span className="font-bold text-gray-900">₹{product.price}</span>
          {cartItem ? (
            <div className="flex items-center bg-emerald-600 text-white rounded-lg px-2 py-1">
              <button onClick={() => updateQuantity(product.id, cartItem.quantity - 1)} className="p-0.5"><Minus className="w-3 h-3" /></button>
              <span className="text-xs font-bold mx-2">{cartItem.quantity}</span>
              <button onClick={() => updateQuantity(product.id, cartItem.quantity + 1)} className="p-0.5"><Plus className="w-3 h-3" /></button>
            </div>
          ) : (
            <button onClick={() => addItem({ productId: product.id, name: product.name, price: product.price, image: product.image })} className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 hover:bg-emerald-100">
              ADD
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Search() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<Product[]>([]);

  useEffect(() => {
    if (query.trim()) {
      const lowerQuery = query.toLowerCase();
      const filtered = PRODUCTS.filter(
        (p) => p.name.toLowerCase().includes(lowerQuery) || p.hindiName.toLowerCase().includes(lowerQuery) || p.category.toLowerCase().includes(lowerQuery)
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleVoiceSearch = () => {
    toast.success('Voice search activated! (Simulation)');
    setQuery('Milk');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-white p-4 sticky top-0 z-40 shadow-sm flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1 relative flex items-center">
          <SearchIcon className="absolute left-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search 'milk', 'bread'..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 bg-gray-100 border-none rounded-xl focus:ring-2 focus:ring-emerald-500 text-sm outline-none"
            autoFocus
          />
          <button onClick={handleVoiceSearch} className="absolute right-3 text-gray-400 hover:text-emerald-600">
            <Mic className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="p-4 space-y-3">
        {query.trim() && results.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">No products found for "{query}"</p>
          </div>
        ) : (
          results.map((product) => <SearchProductCard key={product.id} product={product} />)
        )}
        {!query.trim() && (
          <div className="text-center py-10">
            <p className="text-gray-500">Search for your favorite groceries</p>
          </div>
        )}
      </div>
    </div>
  );
}
