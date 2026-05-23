import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Package, ArrowLeft } from 'lucide-react';

export default function Orders({ session }: { session: any }) {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!session) {
      navigate('/auth');
      return;
    }
    fetchOrders();
  }, [session]);

  const fetchOrders = async () => {
    try {
      const { data } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            *,
            products (*)
          )
        `)
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'packed':
        return 'bg-purple-100 text-purple-800';
      case 'shipped':
        return 'bg-indigo-100 text-indigo-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pastel-hot-pink"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-pastel-hot-pink hover:text-pastel-deep-pink mb-8"
      >
        <ArrowLeft className="w-5 h-5" /> Back to Home
      </button>

      <h1 className="text-4xl font-bold text-pastel-black mb-8">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-20">
          <Package className="w-16 h-16 text-pastel-pink mx-auto mb-4 opacity-50" />
          <h2 className="text-2xl font-bold text-pastel-black mb-2">No orders yet</h2>
          <p className="text-gray-600 mb-8">Start shopping to place your first order!</p>
          <button
            onClick={() => navigate('/')}
            className="px-8 py-3 bg-gradient-to-r from-pastel-hot-pink to-pastel-deep-pink text-white font-semibold rounded-lg hover:opacity-90 transition"
          >
            Shop Now
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order.id} className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-pastel-hot-pink">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 pb-6 border-b border-gray-200">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Order ID</p>
                  <p className="text-lg font-bold text-pastel-black font-mono">{order.id}</p>
                </div>

                <div className="mt-4 md:mt-0">
                  <span className={`px-4 py-2 rounded-full font-semibold text-sm ${getStatusBadgeColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
              </div>

              <div className="grid md:grid-cols-4 gap-6 mb-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Order Date</p>
                  <p className="font-semibold text-pastel-black">
                    {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                  <p className="font-semibold text-pastel-hot-pink text-lg">
                    ₱{order.total_amount.toFixed(2)}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Delivery Address</p>
                  <p className="font-semibold text-pastel-black text-sm">
                    {order.delivery_address}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Estimated Delivery</p>
                  <p className="font-semibold text-pastel-black">
                    {new Date(order.estimated_delivery).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div>
                <p className="font-semibold text-pastel-black mb-3">Items:</p>
                <div className="space-y-2">
                  {order.order_items.map((item: any) => (
                    <div key={item.id} className="flex justify-between items-center p-3 bg-pastel-pink bg-opacity-10 rounded-lg">
                      <div className="flex-1">
                        <p className="font-semibold text-pastel-black">{item.products?.name || 'Product'}</p>
                        {item.customization_notes && (
                          <p className="text-sm text-gray-600">Note: {item.customization_notes}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        <p className="font-semibold text-pastel-hot-pink">
                          ₱{(item.price_at_purchase * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Payment Method</p>
                  <p className="font-semibold text-pastel-black">Cash on Delivery (COD)</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Contact</p>
                  <p className="font-semibold text-pastel-black">{order.phone_number}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
