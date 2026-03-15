import React, { useState } from 'react';
import { CATEGORIES, PRODUCTS, Product } from '../data/products';
import { useCartStore } from '../store/cartStore';
import { Plus, Minus } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

const ProductCard: React.FC<{ product: Product; onClick: () => void }> = ({ product, onClick }) => {
  const { items, addItem, updateQuantity } = useCartStore();
  const cartItem = items.find((i) => i.productId === product.id);

  return (
    <div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 flex flex-col h-full">
      <div className="relative w-full aspect-square mb-2 cursor-pointer" onClick={onClick}>
        <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-xl" />
        {product.originalPrice > product.price && (
          <div className="absolute top-1 left-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md">
            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
          </div>
        )}
      </div>
      <div className="flex-1 cursor-pointer" onClick={onClick}>
        <h3 className="text-sm font-semibold text-gray-900 leading-tight">{product.name}</h3>
        <p className="text-xs text-gray-500 mb-1">{product.unit}</p>
      </div>
      <div className="flex items-center justify-between mt-2">
        <div>
          <span className="text-sm font-bold text-gray-900">₹{product.price}</span>
          {product.originalPrice > product.price && (
            <span className="text-xs text-gray-400 line-through ml-1">₹{product.originalPrice}</span>
          )}
        </div>
        {cartItem ? (
          <div className="flex items-center bg-emerald-600 text-white rounded-lg px-2 py-1">
            <button onClick={(e) => { e.stopPropagation(); updateQuantity(product.id, cartItem.quantity - 1); }} className="p-0.5">
              <Minus className="w-3 h-3" />
            </button>
            <span className="text-xs font-bold mx-2">{cartItem.quantity}</span>
            <button onClick={(e) => { e.stopPropagation(); updateQuantity(product.id, cartItem.quantity + 1); }} className="p-0.5">
              <Plus className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <button
            onClick={(e) => { e.stopPropagation(); addItem({ productId: product.id, name: product.name, price: product.price, image: product.image }); }}
            className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 hover:bg-emerald-100"
          >
            ADD
          </button>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const { items, addItem, updateQuantity } = useCartStore();

  const displayedCategories = selectedCategory ? [selectedCategory] : CATEGORIES;

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setActiveImageIndex(0);
  };

  return (
    <div className="p-4 space-y-6 pb-24">
      {/* Promotional Banner */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-4 text-white shadow-md">
        <h2 className="text-xl font-bold mb-1">Fresh & Fast - 20% Off</h2>
        <p className="text-sm opacity-90 mb-3">On all fresh vegetables and fruits today!</p>
        <button className="bg-white text-emerald-600 text-xs font-bold px-4 py-2 rounded-full shadow-sm">
          Order Now
        </button>
      </div>

      {/* Categories */}
      <div>
        <div className="flex overflow-x-auto pb-2 -mx-4 px-4 space-x-3 scrollbar-hide">
          <button
            onClick={() => setSelectedCategory(null)}
            className={cn(
              "whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-colors",
              selectedCategory === null ? "bg-emerald-600 text-white shadow-sm" : "bg-white text-gray-600 border border-gray-200"
            )}
          >
            All
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-colors",
                selectedCategory === cat ? "bg-emerald-600 text-white shadow-sm" : "bg-white text-gray-600 border border-gray-200"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grouped by Category */}
      <div className="space-y-8">
        {displayedCategories.map((category) => {
          const categoryProducts = PRODUCTS.filter((p) => p.category === category);
          if (categoryProducts.length === 0) return null;

          return (
            <div key={category}>
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-bold text-gray-900">{category}</h2>
                <button className="text-sm text-emerald-600 font-medium">View All</button>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {categoryProducts.slice(0, 6).map((product) => (
                  <ProductCard key={product.id} product={product} onClick={() => handleProductClick(product)} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Product Details Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/50 p-4" onClick={() => setSelectedProduct(null)}>
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md overflow-hidden shadow-2xl mb-16 sm:mb-0"
          >
            <div className="relative aspect-video bg-gray-100">
              <img 
                src={selectedProduct.images ? selectedProduct.images[activeImageIndex] : selectedProduct.image} 
                alt={selectedProduct.name} 
                className="w-full h-full object-cover" 
              />
              <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 bg-white/80 p-2 rounded-full backdrop-blur-sm">
                <Minus className="w-5 h-5 rotate-45" />
              </button>
              {selectedProduct.images && selectedProduct.images.length > 1 && (
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                  {selectedProduct.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={cn(
                        "w-2 h-2 rounded-full transition-all",
                        activeImageIndex === idx ? "bg-emerald-600 w-4" : "bg-white/70"
                      )}
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedProduct.name}</h2>
                  <p className="text-sm text-gray-500">{selectedProduct.hindiName} • {selectedProduct.unit}</p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-gray-900">₹{selectedProduct.price}</div>
                  {selectedProduct.originalPrice > selectedProduct.price && (
                    <div className="text-sm text-gray-400 line-through">₹{selectedProduct.originalPrice}</div>
                  )}
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-6">{selectedProduct.description}</p>
              
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded-2xl">
                <span className="font-medium text-gray-900">Quantity</span>
                <div className="flex items-center">
                  {items.find(i => i.productId === selectedProduct.id) ? (
                    <div className="flex items-center bg-emerald-600 text-white rounded-lg px-3 py-2">
                      <button onClick={(e) => { e.stopPropagation(); updateQuantity(selectedProduct.id, items.find(i => i.productId === selectedProduct.id)!.quantity - 1); }} className="p-1">
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-sm font-bold mx-4">{items.find(i => i.productId === selectedProduct.id)!.quantity}</span>
                      <button onClick={(e) => { e.stopPropagation(); updateQuantity(selectedProduct.id, items.find(i => i.productId === selectedProduct.id)!.quantity + 1); }} className="p-1">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={(e) => { e.stopPropagation(); addItem({ productId: selectedProduct.id, name: selectedProduct.name, price: selectedProduct.price, image: selectedProduct.image }); }}
                      className="text-sm font-bold text-emerald-600 bg-emerald-50 px-6 py-2 rounded-lg border border-emerald-200 hover:bg-emerald-100"
                    >
                      ADD
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
