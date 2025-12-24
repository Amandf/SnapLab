import { useState } from 'react';
import { Store, MapPin, Star, MessageCircle, ExternalLink, Verified } from 'lucide-react';
import { SellerStore } from './SellerStore';

interface LocalSeller {
  id: string;
  name: string;
  location: string;
  distance: string;
  rating: number;
  reviews: number;
  verified: boolean;
  products: number;
  image: string;
  category: string[];
  whatsapp: string;
  featured?: boolean;
}

export function LocalSnap() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchLocation, setSearchLocation] = useState('Mumbai');
  const [viewingStore, setViewingStore] = useState<string | null>(null);
  
  // If viewing a specific store, show that component
  if (viewingStore) {
    return <SellerStore sellerId={viewingStore} onBack={() => setViewingStore(null)} />;
  }

  const categories = [
    'All',
    'Handmade',
    'Fashion',
    'Electronics',
    'Home Decor',
    'Food',
    'Beauty',
    'Accessories'
  ];

  const localSellers: LocalSeller[] = [
    {
      id: '1',
      name: 'Artisan Crafts by Priya',
      location: 'Bandra, Mumbai',
      distance: '2.3 km',
      rating: 4.8,
      reviews: 234,
      verified: true,
      products: 45,
      image: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=400&h=300&fit=crop',
      category: ['Handmade', 'Home Decor'],
      whatsapp: '+919876543210',
      featured: true
    },
    {
      id: '2',
      name: 'TechHub Local',
      location: 'Andheri, Mumbai',
      distance: '4.1 km',
      rating: 4.6,
      reviews: 567,
      verified: true,
      products: 128,
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop',
      category: ['Electronics', 'Accessories'],
      whatsapp: '+919876543211'
    },
    {
      id: '3',
      name: 'Sustainable Fashion Co.',
      location: 'Colaba, Mumbai',
      distance: '5.7 km',
      rating: 4.9,
      reviews: 892,
      verified: true,
      products: 89,
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
      category: ['Fashion', 'Handmade'],
      whatsapp: '+919876543212',
      featured: true
    },
    {
      id: '4',
      name: 'HomeBaked Delights',
      location: 'Powai, Mumbai',
      distance: '3.2 km',
      rating: 4.7,
      reviews: 423,
      verified: true,
      products: 34,
      image: 'https://images.unsplash.com/photo-1517433456452-f9633a875f6f?w=400&h=300&fit=crop',
      category: ['Food'],
      whatsapp: '+919876543213'
    },
    {
      id: '5',
      name: 'Glow Naturals',
      location: 'Juhu, Mumbai',
      distance: '6.4 km',
      rating: 4.8,
      reviews: 312,
      verified: true,
      products: 56,
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop',
      category: ['Beauty', 'Handmade'],
      whatsapp: '+919876543214'
    },
    {
      id: '6',
      name: 'Urban Accessories',
      location: 'Malad, Mumbai',
      distance: '7.8 km',
      rating: 4.5,
      reviews: 189,
      verified: false,
      products: 67,
      image: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=400&h=300&fit=crop',
      category: ['Accessories', 'Fashion'],
      whatsapp: '+919876543215'
    }
  ];

  const filteredSellers = selectedCategory === 'all'
    ? localSellers
    : localSellers.filter(seller =>
        seller.category.some(cat => cat.toLowerCase() === selectedCategory.toLowerCase())
      );

  const handleWhatsAppOrder = (seller: LocalSeller) => {
    const message = encodeURIComponent(
      `Hi ${seller.name}! I found your shop on SnapLab and I'm interested in your products. Can you help me?`
    );
    window.open(`https://wa.me/${seller.whatsapp.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-linear-to-r from-green-600 to-teal-600 rounded-2xl p-8 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Store className="w-8 h-8" />
          <h2>Local Snap</h2>
        </div>
        <p className="opacity-90 mb-4">
          Discover verified small businesses and Instagram sellers near you. Support local, shop authentic.
        </p>
        
        {/* Location Search */}
        <div className="bg-white rounded-xl p-2 flex gap-2 max-w-md">
          <MapPin className="w-5 h-5 text-gray-600 ml-2 mt-2.5" />
          <input
            type="text"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            placeholder="Enter your location"
            className="flex-1 px-2 py-2 outline-none text-gray-800"
          />
          <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
            Search
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm text-center">
          <div className="text-green-600">234+</div>
          <p className="text-gray-600">Local Sellers</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm text-center">
          <div className="text-green-600">5,678</div>
          <p className="text-gray-600">Products</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm text-center">
          <div className="text-green-600">98%</div>
          <p className="text-gray-600">Verified</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm text-center">
          <div className="text-green-600">4.7★</div>
          <p className="text-gray-600">Avg Rating</p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h3 className="text-gray-800 mb-3">Browse by Category</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category.toLowerCase())}
              className={`px-4 py-2 rounded-full transition-colors ${
                selectedCategory === category.toLowerCase()
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-green-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Sellers */}
      <div className="space-y-4">
        <h3 className="text-gray-800">Featured Local Sellers</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSellers.map((seller) => (
            <div
              key={seller.id}
              className={`bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden ${
                seller.featured ? 'border-2 border-green-500' : 'border border-gray-200'
              }`}
            >
              {/* Seller Image */}
              <div className="relative h-48 bg-gray-100">
                <img
                  src={seller.image}
                  alt={seller.name}
                  className="w-full h-full object-cover"
                />
                {seller.featured && (
                  <div className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                    Featured
                  </div>
                )}
                {seller.verified && (
                  <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded-lg flex items-center gap-1 text-sm">
                    <Verified className="w-4 h-4" />
                    Verified
                  </div>
                )}
              </div>

              {/* Seller Info */}
              <div className="p-4">
                <h3 className="text-gray-800 mb-2">{seller.name}</h3>
                
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{seller.location}</span>
                  <span className="text-green-600 text-sm">• {seller.distance}</span>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-orange-500 text-orange-500" />
                    <span className="text-gray-800">{seller.rating}</span>
                  </div>
                  <span className="text-gray-500 text-sm">({seller.reviews} reviews)</span>
                  <span className="text-gray-500 text-sm">• {seller.products} products</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {seller.category.map((cat, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm"
                    >
                      {cat}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleWhatsAppOrder(seller)}
                    className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </button>
                  <button 
                    onClick={() => setViewingStore(seller.id)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center"
                  >
                    <ExternalLink className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Local Snap */}
      <div className="bg-linear-to-r from-green-50 to-teal-50 rounded-xl p-6 border border-green-200">
        <h3 className="text-gray-800 mb-4">Why Choose Local Snap?</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex gap-3">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Verified className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="text-gray-800 mb-1">100% Verified</h4>
              <p className="text-gray-600 text-sm">All sellers are verified by our team</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Store className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="text-gray-800 mb-1">Support Local</h4>
              <p className="text-gray-600 text-sm">Help small businesses grow</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="text-gray-800 mb-1">Direct Contact</h4>
              <p className="text-gray-600 text-sm">Chat directly via WhatsApp</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA for Sellers */}
      <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-green-200 text-center">
        <h3 className="text-gray-800 mb-2">Are you a local seller?</h3>
        <p className="text-gray-600 mb-4">Join SnapLab and reach thousands of customers in your area</p>
        <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          Start Selling Now
        </button>
      </div>
    </div>
  );
}