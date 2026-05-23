import { Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-pastel-pink to-pastel-lavender text-pastel-black mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Soft Sculpture</h3>
            <p className="text-sm opacity-80">
              Handcrafted fuzzy wire sculptures made with love. Each piece is unique and specially crafted for you.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="text-sm space-y-2 opacity-80">
              <li><Link to="/" className="hover:text-pastel-hot-pink transition">Home</Link></li>
              <li><Link to="/about" className="hover:text-pastel-hot-pink transition">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-pastel-hot-pink transition">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Contact Info</h3>
            <div className="text-sm space-y-2 opacity-80">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+63 (123) 456-7890</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>info@softsculpture.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Valenzuela City, Philippines</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-pastel-hot-pink border-opacity-30 pt-8 text-center text-sm opacity-75">
          <p>&copy; 2024 Soft Sculpture. All rights reserved. | Handmade with love.</p>
        </div>
      </div>
    </footer>
  );
}
