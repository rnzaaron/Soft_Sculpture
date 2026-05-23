import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ArrowLeft, CheckCircle } from 'lucide-react';

export default function Checkout({ session }: { session: any }) {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
  });
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!session) {
      navigate('/auth');
      return;
    }
    fetchData();
  }, [session]);

  const fetchData = async () => {
    try {
      const { data: items } = await supabase
        .from('cart_items')
        .select()
        .eq('user_id', session.user.id);

      const { data: prods } = await supabase.from('products').select();

      const { data: prof } = await supabase
        .from('profiles')
        .select()
        .eq('id', session.user.id)
        .maybeSingle();

      setCartItems(items || []);
      setProducts(prods || []);

      if (prof) {
        setProfile(prof);
        setFormData({
          fullName: prof.full_name || '',
          phone: prof.phone || '',
          address: prof.address || '',
          city: prof.city || '',
          postalCode: prof.postal_code || '',
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const total = cartItems.reduce((sum, item) => {
    const product = products.find(p => p.id === item.product_id);
    return sum + (product?.price || 0) * item.quantity;
  }, 0);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (cartItems.length === 0) {
        alert('Your cart is empty');
        return;
      }

      if (!formData.fullName || !formData.phone || !formData.address || !formData.city) {
        alert('Please fill in all delivery information');
        return;
      }

      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([{
          user_id: session.user.id,
          total_amount: total,
          status: 'pending',
          payment_method: 'cash_on_delivery',
          delivery_address: `${formData.address}, ${formData.city} ${formData.postalCode}`,
          phone_number: formData.phone,
        }])
        .select()
        .single();

      if (orderError) throw orderError;

      const orderItems = cartItems.map(item => ({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price_at_purchase: products.find(p => p.id === item.product_id)?.price || 0,
        customization_notes: item.customization_notes,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      await supabase.from('cart_items').delete().eq('user_id', session.user.id);

      await supabase.from('profiles').upsert([{
        id: session.user.id,
        full_name: formData.fullName,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        postal_code: formData.postalCode,
      }]);

      setOrderId(order.id);
      setOrderPlaced(true);
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Error placing order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20">
        <div className="text-center mb-8">
          <CheckCircle className="w-20 h-20 text-pastel-mint mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-pastel-black mb-4">Order Placed!</h1>
          <p className="text-gray-600 mb-2">Thank you for your order.</p>
          <p className="text-pastel-hot-pink font-semibold mb-8">Order ID: {orderId}</p>
        </div>

        <div className="bg-gradient-to-br from-pastel-mint to-pastel-sky-blue rounded-2xl p-8 mb-8">
          <h2 className="text-xl font-bold text-pastel-black mb-4">What's Next?</h2>
          <ul className="space-y-3 text-pastel-black">
            <li className="flex gap-3">
              <span className="font-bold text-pastel-hot-pink">1.</span>
              <span>We'll confirm your order and begin crafting your pieces</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-pastel-hot-pink">2.</span>
              <span>You'll receive a notification when your order is ready to ship</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-pastel-hot-pink">3.</span>
              <span>Our courier will contact you for delivery coordination</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-pastel-hot-pink">4.</span>
              <span>Pay via cash on delivery when the package arrives</span>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => navigate('/orders')}
            className="w-full py-3 bg-gradient-to-r from-pastel-hot-pink to-pastel-deep-pink text-white font-semibold rounded-lg hover:opacity-90 transition"
          >
            Track Order
          </button>
          <button
            onClick={() => navigate('/')}
            className="w-full py-3 border-2 border-pastel-hot-pink text-pastel-hot-pink font-semibold rounded-lg hover:bg-pastel-pink hover:bg-opacity-20 transition"
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
        onClick={() => navigate('/cart')}
        className="flex items-center gap-2 text-pastel-hot-pink hover:text-pastel-deep-pink mb-8"
      >
        <ArrowLeft className="w-5 h-5" /> Back to Cart
      </button>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold text-pastel-black mb-8">Delivery Information</h1>

          <form onSubmit={handlePlaceOrder} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-pastel-black mb-2">Full Name</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-hot-pink"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-pastel-black mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-hot-pink"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-pastel-black mb-2">Address</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-hot-pink"
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-pastel-black mb-2">City</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-hot-pink"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-pastel-black mb-2">Postal Code</label>
                <input
                  type="text"
                  value={formData.postalCode}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-hot-pink"
                />
              </div>
            </div>

            <div className="bg-pastel-sky-blue bg-opacity-30 border border-pastel-sky-blue rounded-lg p-4">
              <p className="text-sm text-pastel-black">
                <span className="font-semibold">Payment Method:</span> Cash on Delivery (COD)
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Pay directly to our courier when your package arrives. No advance payment required!
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-pastel-hot-pink to-pastel-deep-pink text-white font-bold text-lg rounded-lg hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? 'Placing Order...' : 'Place Order'}
            </button>
          </form>
        </div>

        <div className="md:col-span-1">
          <div className="bg-gradient-to-br from-pastel-pink to-pastel-lavender rounded-2xl p-6 sticky top-24">
            <h2 className="text-xl font-bold text-pastel-black mb-6">Order Summary</h2>

            <div className="space-y-3 mb-6 pb-6 border-b border-pastel-hot-pink border-opacity-30 max-h-64 overflow-y-auto">
              {cartItems.map(item => {
                const product = products.find(p => p.id === item.product_id);
                if (!product) return null;
                return (
                  <div key={item.id} className="flex justify-between text-sm text-pastel-black">
                    <span>{product.name} x{item.quantity}</span>
                    <span>₱{(product.price * item.quantity).toFixed(2)}</span>
                  </div>
                );
              })}
            </div>

            <div className="space-y-3 mb-6 pb-6 border-b border-pastel-hot-pink border-opacity-30">
              <div className="flex justify-between text-pastel-black">
                <span>Subtotal</span>
                <span>₱{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-pastel-black">
                <span>Shipping</span>
                <span className="font-semibold">FREE</span>
              </div>
            </div>

            <div className="flex justify-between mb-4">
              <span className="text-lg font-bold text-pastel-black">Total</span>
              <span className="text-2xl font-bold text-pastel-hot-pink">₱{total.toFixed(2)}</span>
            </div>

            <p className="text-xs text-pastel-black opacity-70 text-center">
              Estimated delivery: 3-7 business days
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
