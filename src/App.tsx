import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { supabase } from './lib/supabase';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import Orders from './pages/Orders';

export default function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription?.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pastel-pink to-pastel-lavender">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pastel-hot-pink mx-auto mb-4"></div>
          <p className="text-pastel-black">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-white">
        <Navbar session={session} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart session={session} />} />
            <Route path="/checkout" element={<Checkout session={session} />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/profile" element={<Profile session={session} />} />
            <Route path="/orders" element={<Orders session={session} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
