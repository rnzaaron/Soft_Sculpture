import { Star, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '../lib/supabase';

interface ProductCardProps {
  product: any;
  reviews: any[];
  session: any;
  onAddCart?: () => void;
}

export default function ProductCard({ product, reviews, session, onAddCart }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const productReviews = reviews.filter(r => r.product_id === product.id);
  const avgRating = productReviews.length > 0
    ? (productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length).toFixed(1)
    : 0;

  const handleAddToCart = async () => {
    if (!session) {
      alert('Please sign in to add items to cart');
      return;
    }

    setIsAdding(true);
    try {
      const { data: existing } = await supabase
        .from('cart_items')
        .select()
        .eq('user_id', session.user.id)
        .eq('product_id', product.id)
        .maybeSingle();

      if (existing) {
        await supabase
          .from('cart_items')
          .update({ quantity: existing.quantity + quantity })
          .eq('id', existing.id);
      } else {
        await supabase
          .from('cart_items')
          .insert([{
            user_id: session.user.id,
            product_id: product.id,
            quantity,
          }]);
      }
      onAddCart?.();
      setQuantity(1);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      <div className="relative overflow-hidden bg-pastel-pink bg-opacity-20 aspect-square">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
        />
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg text-pastel-black mb-2 line-clamp-1">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>

        <div className="flex items-center gap-1 mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < Math.round(Number(avgRating)) ? 'fill-pastel-hot-pink text-pastel-hot-pink' : 'text-gray-300'}`}
            />
          ))}
          <span className="text-xs text-gray-600 ml-1">({productReviews.length})</span>
        </div>

        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold text-pastel-hot-pink">₱{product.price.toFixed(2)}</span>
          <span className="text-xs bg-pastel-mint px-3 py-1 rounded-full text-pastel-black">
            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>

        {product.is_customizable && (
          <p className="text-xs text-pastel-deep-pink mb-3">✨ Customizable</p>
        )}

        <div className="flex gap-2">
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-2 py-1 text-gray-600 hover:bg-pastel-pink hover:bg-opacity-20"
            >
              −
            </button>
            <span className="px-3 py-1 text-sm">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-2 py-1 text-gray-600 hover:bg-pastel-pink hover:bg-opacity-20"
            >
              +
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isAdding || product.stock === 0}
            className="flex-1 bg-gradient-to-r from-pastel-hot-pink to-pastel-deep-pink text-white font-semibold py-2 rounded-lg hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            {isAdding ? 'Adding...' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
}
