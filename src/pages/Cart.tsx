import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Trash2, ArrowLeft, ShoppingCart } from 'lucide-react';

export default function Cart({ session }: { session: any }) {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!session) {
      navigate('/auth');
      return;
    }
    fetchCart();
  }, [session]);

  const fetchCart = async () => {
    try {
      const { data: items } = await supabase
        .from('cart_items')
        .select()
        .eq('user_id', session.user.id);

      const { data: prods } = await supabase.from('products').select();

      setCartItems(items || []);
      setProducts(prods || []);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (cartItemId: string) => {
    try {
      await supabase.from('cart_items').delete().eq('id', cartItemId);
      setCartItems(cartItems.filter(item => item.id !== cartItemId));
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const updateQuantity = async (cartItemId: string, quantity: number) => {
    if (quantity < 1) return;
    try {
      await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('id', cartItemId);

      setCartItems(cartItems.map(item =>
        item.id === cartItemId ? { ...item, quantity } : item
      ));
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const total = cartItems.reduce((sum, item) => {
    const product = products.find(p => p.id === item.product_id);
    return sum + (product?.price || 0) * item.quantity;
  }, 0);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pastel-hot-pink"></div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-pastel-hot-pink hover:text-pastel-deep-pink mb-8"
        >
          <ArrowLeft className="w-5 h-5" /> Back to Shopping
        </button>

        <div className="text-center py-20">
          <ShoppingCart className="w-16 h-16 text-pastel-pink mx-auto mb-4 opacity-50" />
          <h2 className="text-2xl font-bold text-pastel-black mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Let's add some beautiful soft sculptures!</p>
          <button
            onClick={() => navigate('/')}
            className="px-8 py-3 bg-gradient-to-r from-pastel-hot-pink to-pastel-deep-pink text-white font-semibold rounded-lg hover:opacity-90 transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-pastel-hot-pink hover:text-pastel-deep-pink mb-8"
      >
        <ArrowLeft className="w-5 h-5" /> Continue Shopping
      </button>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold text-pastel-black mb-8">Shopping Cart</h1>

          <div className="space-y-4">
            {cartItems.map(item => {
              const product = products.find(p => p.id === item.product_id);
              if (!product) return null;

              return (
                <div key={item.id} className="bg-white border border-gray-200 rounded-2xl p-6 flex gap-6">
                  <div className="w-24 h-24 bg-pastel-pink bg-opacity-20 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-grow">
                    <h3 className="font-bold text-lg text-pastel-black mb-1">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                    {item.customization_notes && (
                      <p className="text-sm text-pastel-hot-pink mb-2">Note: {item.customization_notes}</p>
                    )}
                    <p className="font-semibold text-pastel-hot-pink">₱{product.price.toFixed(2)}</p>
                  </div>

                  <div className="flex flex-col justify-between items-end">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>

                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-1 text-gray-600 hover:bg-pastel-pink hover:bg-opacity-20"
                      >
                        −
                      </button>
                      <span className="px-3 py-1 text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 text-gray-600 hover:bg-pastel-pink hover:bg-opacity-20"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="bg-gradient-to-br from-pastel-pink to-pastel-lavender rounded-2xl p-6 sticky top-24">
            <h2 className="text-xl font-bold text-pastel-black mb-6">Order Summary</h2>

            <div className="space-y-3 mb-6 pb-6 border-b border-pastel-hot-pink border-opacity-30">
              <div className="flex justify-between text-pastel-black">
                <span>Subtotal</span>
                <span>₱{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-pastel-black">
                <span>Shipping</span>
                <span className="font-semibold">FREE (3-7 days)</span>
              </div>
              <div className="flex justify-between text-pastel-black text-sm opacity-70">
                <span>Cash on Delivery</span>
                <span>✓</span>
              </div>
            </div>

            <div className="flex justify-between mb-6">
              <span className="text-lg font-bold text-pastel-black">Total</span>
              <span className="text-2xl font-bold text-pastel-hot-pink">₱{total.toFixed(2)}</span>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-3 bg-gradient-to-r from-pastel-hot-pink to-pastel-deep-pink text-white font-bold rounded-lg hover:opacity-90 transition"
            >
              Proceed to Checkout
            </button>

            <Link
              to="/"
              className="block text-center mt-4 text-pastel-hot-pink hover:text-pastel-deep-pink font-semibold transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
