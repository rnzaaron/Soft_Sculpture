import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import ProductCard from '../components/ProductCard';
import { ChevronRight, Sparkles } from 'lucide-react';

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [session, setSession] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };
    initializeSession();
  }, []);

  useEffect(() => {
    fetchProducts();
    fetchReviews();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase.from('products').select();
      if (!error) {
        setProducts(data || []);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const { data } = await supabase.from('reviews').select();
      setReviews(data || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const categories = ['all', ...new Set(products.map(p => p.category))];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-pastel-pink via-pastel-lavender to-pastel-sky-blue min-h-[500px] flex items-center py-20">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-20 h-20 bg-pastel-soft-yellow rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-pastel-mint rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-6 h-6 text-pastel-hot-pink" />
                <span className="text-pastel-hot-pink font-semibold">Welcome to Soft Sculpture</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-pastel-black mb-6 leading-tight">
                Handmade Fuzzy Wire Art
              </h1>
              <p className="text-xl text-pastel-black opacity-90 mb-8">
                Transform your space with unique, handcrafted soft sculptures. Each piece is carefully shaped with imagination and love.
              </p>
              <button
                onClick={() => navigate('/contact')}
                className="px-8 py-4 bg-gradient-to-r from-pastel-hot-pink to-pastel-deep-pink text-white font-bold rounded-full hover:shadow-lg transition-all flex items-center gap-2"
              >
                Get Started <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="hidden md:grid grid-cols-2 gap-4">
              <div className="bg-pastel-mint rounded-3xl p-6 text-center transform hover:scale-105 transition-transform">
                <div className="text-4xl mb-2">🌸</div>
                <p className="font-semibold text-pastel-black">Flowers & Plants</p>
              </div>
              <div className="bg-pastel-sky-blue rounded-3xl p-6 text-center transform hover:scale-105 transition-transform mt-6">
                <div className="text-4xl mb-2">🎀</div>
                <p className="font-semibold text-pastel-black">Charms & Accessories</p>
              </div>
              <div className="bg-pastel-lavender rounded-3xl p-6 text-center transform hover:scale-105 transition-transform">
                <div className="text-4xl mb-2">🎭</div>
                <p className="font-semibold text-pastel-black">Characters</p>
              </div>
              <div className="bg-pastel-soft-yellow rounded-3xl p-6 text-center transform hover:scale-105 transition-transform mt-6">
                <div className="text-4xl mb-2">🎨</div>
                <p className="font-semibold text-pastel-black">Custom Designs</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-pastel-black mb-4">Our Collections</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse our curated collections of handmade fuzzy wire sculptures
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex gap-3 mb-12 overflow-x-auto pb-4 justify-center flex-wrap">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold whitespace-nowrap transition ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-pastel-hot-pink to-pastel-deep-pink text-white'
                  : 'bg-pastel-pink bg-opacity-30 text-pastel-black hover:bg-opacity-50'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pastel-hot-pink"></div>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                reviews={reviews}
                session={session}
                onAddCart={() => {
                  alert('Added to cart! Visit the cart to proceed.');
                }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No products available in this category yet.</p>
          </div>
        )}
      </section>

      {/* Reviews Section */}
      {reviews.length > 0 && (
        <section className="bg-gradient-to-br from-pastel-pink to-pastel-lavender bg-opacity-20 py-20">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-pastel-black mb-12 text-center">Customer Reviews</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {reviews.slice(0, 3).map(review => (
                <div key={review.id} className="bg-white p-6 rounded-2xl shadow-lg">
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <span key={i} className="text-pastel-hot-pink">★</span>
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">{review.comment}</p>
                  <p className="text-sm text-pastel-hot-pink font-semibold">
                    Verified Purchase
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-pastel-sky-blue to-pastel-mint py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-pastel-black mb-6">Ready to Order?</h2>
          <p className="text-lg text-pastel-black mb-8 max-w-2xl mx-auto">
            Browse our collections, customize your pieces, and place your order with ease. Cash on delivery available nationwide!
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0 })}
            className="px-8 py-4 bg-pastel-hot-pink text-white font-bold rounded-full hover:bg-pastel-deep-pink transition"
          >
            Shop Now
          </button>
        </div>
      </section>
    </div>
  );
}
