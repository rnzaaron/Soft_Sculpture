import { Heart, Sparkles, Users } from 'lucide-react';

export default function About() {
  return (
    <div>
      <section className="bg-gradient-to-br from-pastel-pink via-pastel-lavender to-pastel-sky-blue py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-bold text-pastel-black mb-6 text-center">About Soft Sculpture</h1>
          <p className="text-xl text-center text-pastel-black max-w-3xl mx-auto">
            Where fuzzy wires transform into magical handmade art pieces
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-pastel-black mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Soft Sculpture was born from a passion for creativity and craftsmanship. What started as a simple hobby has blossomed into a beautiful business dedicated to creating unique, handmade fuzzy wire sculptures.
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Each piece tells a story. We carefully shape fuzzy wires with precision and imagination to create charming sculptures that bring joy to our customers' lives. From cute characters to decorative items, every creation is special.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We believe in the power of handmade items and the connection between creator and customer. Our mission is to make affordable, personalized art accessible to everyone who loves creativity and unique design.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-pastel-pink rounded-2xl p-8 text-center transform hover:scale-105 transition-transform">
              <Heart className="w-12 h-12 text-pastel-hot-pink mx-auto mb-3 fill-pastel-hot-pink" />
              <h3 className="font-bold text-pastel-black">Handmade with Love</h3>
              <p className="text-sm text-gray-600 mt-2">Each piece is crafted with care and attention to detail</p>
            </div>

            <div className="bg-pastel-lavender rounded-2xl p-8 text-center transform hover:scale-105 transition-transform mt-6">
              <Sparkles className="w-12 h-12 text-pastel-hot-pink mx-auto mb-3 fill-pastel-hot-pink" />
              <h3 className="font-bold text-pastel-black">Unique Designs</h3>
              <p className="text-sm text-gray-600 mt-2">No two pieces are exactly alike</p>
            </div>

            <div className="bg-pastel-sky-blue rounded-2xl p-8 text-center transform hover:scale-105 transition-transform">
              <Users className="w-12 h-12 text-pastel-hot-pink mx-auto mb-3" />
              <h3 className="font-bold text-pastel-black">Community Focused</h3>
              <p className="text-sm text-gray-600 mt-2">Supporting artists and celebrating creativity</p>
            </div>

            <div className="bg-pastel-mint rounded-2xl p-8 text-center transform hover:scale-105 transition-transform mt-6">
              <div className="text-4xl mb-2">🎨</div>
              <h3 className="font-bold text-pastel-black">Customizable</h3>
              <p className="text-sm text-gray-600 mt-2">Made to match your personal style</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-pastel-pink to-pastel-lavender bg-opacity-20 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-pastel-black mb-12 text-center">Why Choose Us?</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-pastel-black mb-3">Quality Craftsmanship</h3>
              <p className="text-gray-600">
                We use premium materials and take pride in the quality of every piece we create. Your satisfaction is our priority.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="text-xl font-bold text-pastel-black mb-3">Affordable Nationwide Delivery</h3>
              <p className="text-gray-600">
                We offer free shipping nationwide with estimated delivery of 3-7 business days. Pay cash on delivery for your convenience.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-bold text-pastel-black mb-3">Customer Support</h3>
              <p className="text-gray-600">
                Our team is always ready to help. We love hearing from our customers and making their experience special.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-pastel-sky-blue to-pastel-mint rounded-3xl p-12 text-center">
          <h2 className="text-3xl font-bold text-pastel-black mb-4">Join Our Creative Community</h2>
          <p className="text-lg text-pastel-black mb-8 max-w-2xl mx-auto">
            Whether you're looking for a gift, room decoration, or a treat for yourself, we have something special waiting for you.
          </p>
          <p className="text-pastel-black font-semibold">
            Follow our journey and stay updated with new releases and special offers!
          </p>
        </div>
      </section>
    </div>
  );
}
