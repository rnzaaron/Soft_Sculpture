import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Heart, ShoppingCart, Menu, X, LogOut, User } from 'lucide-react';

export default function Navbar({ session }: { session: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-pastel-pink to-pastel-lavender shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <Heart className="w-8 h-8 text-pastel-hot-pink fill-pastel-hot-pink group-hover:scale-110 transition-transform" />
            <span className="text-xl font-bold text-pastel-black hidden sm:inline">Soft Sculpture</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-pastel-black hover:text-pastel-hot-pink font-medium transition">Home</Link>
            <Link to="/about" className="text-pastel-black hover:text-pastel-hot-pink font-medium transition">About</Link>
            <Link to="/contact" className="text-pastel-black hover:text-pastel-hot-pink font-medium transition">Contact</Link>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative">
              <ShoppingCart className="w-6 h-6 text-pastel-hot-pink hover:scale-110 transition-transform" />
            </Link>

            {session ? (
              <div className="flex items-center gap-4">
                <Link to="/profile" className="text-pastel-black hover:text-pastel-hot-pink">
                  <User className="w-6 h-6" />
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-pastel-black hover:text-pastel-hot-pink"
                >
                  <LogOut className="w-6 h-6" />
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="px-4 py-2 bg-pastel-hot-pink text-white rounded-full hover:bg-pastel-deep-pink transition font-semibold"
              >
                Sign In
              </Link>
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-pastel-black"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-4">
            <Link to="/" className="text-pastel-black hover:text-pastel-hot-pink">Home</Link>
            <Link to="/about" className="text-pastel-black hover:text-pastel-hot-pink">About</Link>
            <Link to="/contact" className="text-pastel-black hover:text-pastel-hot-pink">Contact</Link>
            {session && <Link to="/orders" className="text-pastel-black hover:text-pastel-hot-pink">My Orders</Link>}
          </div>
        )}
      </div>
    </nav>
  );
}
