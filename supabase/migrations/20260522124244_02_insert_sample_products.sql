/*
  # Insert sample products

  This migration inserts sample fuzzy wire soft sculpture products to the database.
  These are for demonstration purposes and can be replaced with actual products.

  Products include:
  - Fuzzy Wire Flowers (various types)
  - Character Sculptures
  - Decorative Accessories
  - Customizable pieces
*/

INSERT INTO products (name, description, price, image_url, category, stock, is_customizable) VALUES
  (
    'Pink Fuzzy Flower Bouquet',
    'Beautiful bouquet of handmade fuzzy wire flowers in shades of pink and pastel',
    599.00,
    'https://images.pexels.com/photos/3535383/pexels-photo-3535383.jpeg?auto=compress&cs=tinysrgb&w=500',
    'flowers',
    15,
    true
  ),
  (
    'Cute Bunny Charm',
    'Adorable fuzzy wire bunny perfect as a keychain or room decoration',
    299.00,
    'https://images.pexels.com/photos/3944682/pexels-photo-3944682.jpeg?auto=compress&cs=tinysrgb&w=500',
    'characters',
    20,
    true
  ),
  (
    'Pastel Rainbow Flowers Set',
    'Set of 5 small flowers in rainbow pastel colors - perfect for gifting',
    799.00,
    'https://images.pexels.com/photos/4005173/pexels-photo-4005173.jpeg?auto=compress&cs=tinysrgb&w=500',
    'flowers',
    10,
    true
  ),
  (
    'Lavender Butterfly',
    'Elegant fuzzy wire butterfly in soft lavender tones',
    399.00,
    'https://images.pexels.com/photos/3808540/pexels-photo-3808540.jpeg?auto=compress&cs=tinysrgb&w=500',
    'decorative',
    18,
    true
  ),
  (
    'Sky Blue Dreamer Bird',
    'Whimsical bird sculpture in soft sky blue - a perfect desk companion',
    449.00,
    'https://images.pexels.com/photos/3808534/pexels-photo-3808534.jpeg?auto=compress&cs=tinysrgb&w=500',
    'characters',
    12,
    true
  ),
  (
    'Mint Green Plant Holder',
    'Decorative fuzzy wire plant holder in calming mint green',
    699.00,
    'https://images.pexels.com/photos/3808619/pexels-photo-3808619.jpeg?auto=compress&cs=tinysrgb&w=500',
    'decorative',
    8,
    true
  ),
  (
    'Soft Yellow Daisy Trio',
    'Three cheerful fuzzy wire daisies to brighten any space',
    499.00,
    'https://images.pexels.com/photos/3624452/pexels-photo-3624452.jpeg?auto=compress&cs=tinysrgb&w=500',
    'flowers',
    14,
    true
  ),
  (
    'Hot Pink Heart Keychain',
    'Cute heart-shaped fuzzy wire keychain perfect for expressing love',
    199.00,
    'https://images.pexels.com/photos/5632410/pexels-photo-5632410.jpeg?auto=compress&cs=tinysrgb&w=500',
    'accessories',
    25,
    true
  ),
  (
    'Pastel Llama Figure',
    'Adorable llama with customizable colors - great gift for llama lovers',
    549.00,
    'https://images.pexels.com/photos/3688387/pexels-photo-3688387.jpeg?auto=compress&cs=tinysrgb&w=500',
    'characters',
    9,
    true
  ),
  (
    'Custom Name Banner',
    'Personalized fuzzy wire name banner in your choice of colors',
    899.00,
    'https://images.pexels.com/photos/3962286/pexels-photo-3962286.jpeg?auto=compress&cs=tinysrgb&w=500',
    'custom',
    5,
    true
  ),
  (
    'Sakura Cherry Blossom',
    'Delicate cherry blossom sculpture with pink and white fuzzy wire',
    649.00,
    'https://images.pexels.com/photos/3808496/pexels-photo-3808496.jpeg?auto=compress&cs=tinysrgb&w=500',
    'flowers',
    11,
    true
  ),
  (
    'Mini Succulent Set',
    'Four tiny fuzzy wire succulents perfect for small spaces',
    349.00,
    'https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&w=500',
    'decorative',
    16,
    true
  );
