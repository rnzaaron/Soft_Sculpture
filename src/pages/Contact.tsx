import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // In a real app, you'd send this to your backend or email service
      // For now, we'll just show a success message
      console.log('Message:', formData);

      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });

      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="bg-gradient-to-br from-pastel-pink via-pastel-lavender to-pastel-sky-blue py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-bold text-pastel-black mb-6 text-center">Get in Touch</h1>
          <p className="text-xl text-center text-pastel-black max-w-2xl mx-auto">
            Have questions? We'd love to hear from you!
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-pastel-black mb-8">Contact Information</h2>

            <div className="space-y-6 mb-12">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-pastel-hot-pink rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-pastel-black mb-1">Phone</h3>
                  <p className="text-gray-600">+63 (123) 456-7890</p>
                  <p className="text-sm text-gray-500">Mon-Fri, 9AM-6PM</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-pastel-hot-pink rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-pastel-black mb-1">Email</h3>
                  <p className="text-gray-600">info@softsculpture.com</p>
                  <p className="text-sm text-gray-500">We reply within 24 hours</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-pastel-hot-pink rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-pastel-black mb-1">Location</h3>
                  <p className="text-gray-600">Valenzuela City, Philippines</p>
                  <p className="text-sm text-gray-500">Nationwide delivery available</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-pastel-mint to-pastel-sky-blue rounded-2xl p-8">
              <h3 className="font-bold text-pastel-black mb-4">Quick FAQs</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="font-semibold text-pastel-black mb-1">How long does shipping take?</p>
                  <p className="text-gray-600">3-7 business days nationwide</p>
                </div>
                <div>
                  <p className="font-semibold text-pastel-black mb-1">Can I customize my order?</p>
                  <p className="text-gray-600">Yes! Many items are customizable. Contact us for details.</p>
                </div>
                <div>
                  <p className="font-semibold text-pastel-black mb-1">What payment methods do you accept?</p>
                  <p className="text-gray-600">Cash on Delivery (COD) only - pay when it arrives!</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-pastel-black mb-6">Send us a Message</h2>

              {submitted && (
                <div className="mb-6 p-4 bg-pastel-mint text-pastel-black rounded-lg">
                  Thank you for reaching out! We'll get back to you soon.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-pastel-black mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-hot-pink"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-pastel-black mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-hot-pink"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-pastel-black mb-2">Subject</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="What is this about?"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-hot-pink"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-pastel-black mb-2">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us your thoughts..."
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-hot-pink resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-pastel-hot-pink to-pastel-deep-pink text-white font-bold rounded-lg hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
