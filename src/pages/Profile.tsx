import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { User, Mail } from 'lucide-react';

export default function Profile({ session }: { session: any }) {
  const [profile, setProfile] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    address: '',
    city: '',
    postal_code: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!session) {
      navigate('/auth');
      return;
    }
    fetchProfile();
  }, [session]);

  const fetchProfile = async () => {
    try {
      const { data } = await supabase
        .from('profiles')
        .select()
        .eq('id', session.user.id)
        .maybeSingle();

      if (data) {
        setProfile(data);
        setFormData({
          full_name: data.full_name || '',
          phone: data.phone || '',
          address: data.address || '',
          city: data.city || '',
          postal_code: data.postal_code || '',
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await supabase
        .from('profiles')
        .upsert([{
          id: session.user.id,
          ...formData,
        }]);

      setProfile({ ...profile, ...formData });
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setSaving(false);
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
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-pastel-black mb-8">My Profile</h1>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-200">
              <div className="w-16 h-16 bg-gradient-to-br from-pastel-pink to-pastel-lavender rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-pastel-hot-pink" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Logged in as</p>
                <p className="text-lg font-bold text-pastel-black flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {session.user.email}
                </p>
              </div>
            </div>

            {!isEditing ? (
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Full Name</p>
                  <p className="text-lg text-pastel-black font-semibold">
                    {formData.full_name || 'Not set'}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Phone Number</p>
                  <p className="text-lg text-pastel-black font-semibold">
                    {formData.phone || 'Not set'}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Address</p>
                  <p className="text-lg text-pastel-black font-semibold">
                    {formData.address || 'Not set'}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">City</p>
                    <p className="text-lg text-pastel-black font-semibold">
                      {formData.city || 'Not set'}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-1">Postal Code</p>
                    <p className="text-lg text-pastel-black font-semibold">
                      {formData.postal_code || 'Not set'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsEditing(true)}
                  className="mt-8 px-6 py-3 bg-gradient-to-r from-pastel-hot-pink to-pastel-deep-pink text-white font-semibold rounded-lg hover:opacity-90 transition"
                >
                  Edit Profile
                </button>
              </div>
            ) : (
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-pastel-black mb-2">Full Name</label>
                  <input
                    type="text"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-hot-pink"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-pastel-black mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-hot-pink"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-pastel-black mb-2">Address</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-hot-pink"
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
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-pastel-black mb-2">Postal Code</label>
                    <input
                      type="text"
                      value={formData.postal_code}
                      onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-hot-pink"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 py-3 bg-gradient-to-r from-pastel-hot-pink to-pastel-deep-pink text-white font-semibold rounded-lg hover:opacity-90 transition disabled:opacity-50"
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="flex-1 py-3 border-2 border-pastel-hot-pink text-pastel-hot-pink font-semibold rounded-lg hover:bg-pastel-pink hover:bg-opacity-20 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="bg-gradient-to-br from-pastel-mint to-pastel-sky-blue rounded-2xl p-6">
            <h3 className="font-bold text-pastel-black mb-4">Quick Links</h3>
            <div className="space-y-3">
              <a href="/orders" className="block px-4 py-3 bg-white text-pastel-hot-pink font-semibold rounded-lg hover:bg-pastel-pink hover:bg-opacity-20 transition text-center">
                View Orders
              </a>
              <a href="/cart" className="block px-4 py-3 bg-white text-pastel-hot-pink font-semibold rounded-lg hover:bg-pastel-pink hover:bg-opacity-20 transition text-center">
                Go to Cart
              </a>
              <a href="/" className="block px-4 py-3 bg-white text-pastel-hot-pink font-semibold rounded-lg hover:bg-pastel-pink hover:bg-opacity-20 transition text-center">
                Continue Shopping
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
