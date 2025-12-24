import { useState } from 'react';
import { 
  ArrowLeft, 
  Verified, 
  Star, 
  MapPin, 
  MessageCircle, 
  Share2,
  Filter,
  Search,
  Sparkles,
  Heart
} from 'lucide-react';

interface SellerStoreProps {
  sellerId: string;
  onBack: () => void;
}

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  stock: number;
  rating: number;
  reviews: number;
  aiTags: string[];
  description: string;
}

export function SellerStore({ sellerId, onBack }: SellerStoreProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAiChat, setShowAiChat] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Mock seller data
  const seller = {
    id: sellerId,
    name: 'Artisan Crafts by Priya',
    logo: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=100&h=100&fit=crop',
    banner: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=1200&h=300&fit=crop',
    location: 'Bandra, Mumbai',
    phone: '+91 98765 43210',
    whatsapp: '+919876543210',
    verified: true,
    rating: 4.8,
    totalReviews: 234,
    description: 'Handcrafted ceramic and pottery items made with love. Each piece is unique and crafted using traditional techniques passed down through generations. We specialize in home decor, kitchenware, and custom orders.',
    categories: ['All', 'Vases', 'Mugs', 'Plates', 'Bowls', 'Decor'],
    joinedDate: 'Jan 2024',
    totalProducts: 45,
    responseTime: '2 hours'
  };

  const products: Product[] = [
    {
      id: '1',
      name: 'Handcrafted Ceramic Vase - Blue',
      price: 599,
      originalPrice: 899,
      image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400&h=400&fit=crop',
      category: 'Vases',
      stock: 5,
      rating: 4.9,
      reviews: 23,
      aiTags: ['ceramic', 'blue', 'handmade', 'vase', 'floral pattern', 'home decor'],
      description: 'Beautiful handmade ceramic vase with intricate blue patterns. Perfect for flowers or as standalone decor.'
    },
    {
      id: '2',
      name: 'Coffee Mug Set (2 pieces)',
      price: 399,
      originalPrice: 599,
      image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=400&fit=crop',
      category: 'Mugs',
      stock: 12,
      rating: 4.7,
      reviews: 45,
      aiTags: ['ceramic', 'mug', 'coffee', 'set', 'brown', 'glazed'],
      description: 'Set of 2 artisan coffee mugs with unique glaze finish. Microwave and dishwasher safe.'
    },
    {
      id: '3',
      name: 'Decorative Wall Plate',
      price: 450,
      image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400&h=400&fit=crop',
      category: 'Plates',
      stock: 8,
      rating: 4.8,
      reviews: 17,
      aiTags: ['ceramic', 'plate', 'wall art', 'decorative', 'colorful', 'handpainted'],
      description: 'Hand-painted decorative plate perfect for wall mounting or display.'
    },
    {
      id: '4',
      name: 'Rustic Serving Bowl',
      price: 549,
      originalPrice: 799,
      image: 'https://images.unsplash.com/photo-1586864387634-374595680a62?w=400&h=400&fit=crop',
      category: 'Bowls',
      stock: 6,
      rating: 4.6,
      reviews: 12,
      aiTags: ['ceramic', 'bowl', 'rustic', 'brown', 'serving', 'handmade'],
      description: 'Large rustic serving bowl ideal for salads, fruits, or centerpiece display.'
    },
    {
      id: '5',
      name: 'Minimalist Planter Set',
      price: 699,
      image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop',
      category: 'Decor',
      stock: 10,
      rating: 4.9,
      reviews: 34,
      aiTags: ['ceramic', 'planter', 'white', 'minimalist', 'set', 'modern'],
      description: 'Set of 3 minimalist ceramic planters in varying sizes. Perfect for succulents.'
    },
    {
      id: '6',
      name: 'Handmade Tea Cup Set (4 pcs)',
      price: 799,
      originalPrice: 1199,
      image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=400&fit=crop',
      category: 'Mugs',
      stock: 4,
      rating: 4.8,
      reviews: 28,
      aiTags: ['ceramic', 'teacup', 'set', 'traditional', 'handmade', 'artisan'],
      description: 'Traditional handmade tea cup set. Each piece uniquely crafted with care.'
    }
  ];

  const reviews = [
    {
      id: '1',
      name: 'Anjali Sharma',
      rating: 5,
      date: '2 days ago',
      comment: 'Beautiful products! The vase exceeded my expectations. Fast delivery via courier.',
      verified: true
    },
    {
      id: '2',
      name: 'Rahul Mehta',
      rating: 5,
      date: '1 week ago',
      comment: 'Amazing quality and very responsive on WhatsApp. Ordered custom pieces and they turned out perfect!',
      verified: true
    },
    {
      id: '3',
      name: 'Priya Desai',
      rating: 4,
      date: '2 weeks ago',
      comment: 'Great craftsmanship. Took slightly longer than expected but worth the wait.',
      verified: true
    }
  ];

  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
    const matchesSearch = searchQuery === '' || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.aiTags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesPrice && matchesSearch;
  });

  const handleWhatsAppOrder = (product: Product) => {
    const message = encodeURIComponent(
      `Hi ${seller.name}! I'm interested in:\n\n` +
      `${product.name}\n` +
      `Price: ₹${product.price}\n\n` +
      `Is this available? I found you on SnapLab.`
    );
    window.open(`https://wa.me/${seller.whatsapp.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
  };

  const handleAskAI = (product: Product) => {
    setSelectedProduct(product);
    setShowAiChat(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Local Snap
          </button>
        </div>
      </div>

      {/* Banner */}
      <div className="relative h-48 md:h-64 bg-gray-200">
        <img
          src={seller.banner}
          alt={seller.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>

      {/* Seller Info */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg -mt-16 relative z-10 p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Logo */}
            <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden flex-shrink-0">
              <img
                src={seller.logo}
                alt={seller.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-gray-800">{seller.name}</h1>
                    {seller.verified && (
                      <div className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                        <Verified className="w-4 h-4" />
                        <span className="text-sm">Verified</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-gray-600 text-sm mb-2">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {seller.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-orange-500 text-orange-500" />
                      {seller.rating} ({seller.totalReviews} reviews)
                    </div>
                  </div>
                  <p className="text-gray-600">{seller.description}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleWhatsAppOrder(products[0])}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </button>
                  <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Share2 className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 text-sm">
                <div>
                  <span className="text-gray-600">Products: </span>
                  <span className="text-gray-800">{seller.totalProducts}</span>
                </div>
                <div>
                  <span className="text-gray-600">Response Time: </span>
                  <span className="text-gray-800">{seller.responseTime}</span>
                </div>
                <div>
                  <span className="text-gray-600">Member Since: </span>
                  <span className="text-gray-800">{seller.joinedDate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="mt-6 grid lg:grid-cols-4 gap-6 pb-12">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
              <h3 className="text-gray-800 mb-4 flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filters
              </h3>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-gray-700 text-sm mb-2">Search Products</label>
                <div className="relative">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name or tag..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <label className="block text-gray-700 text-sm mb-2">Category</label>
                <div className="space-y-2">
                  {seller.categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category.toLowerCase())}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedCategory === category.toLowerCase()
                          ? 'bg-purple-100 text-purple-700'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-gray-700 text-sm mb-2">Price Range</label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      placeholder="Min"
                    />
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      placeholder="Max"
                    />
                  </div>
                  <p className="text-xs text-gray-500">
                    ₹{priceRange[0]} - ₹{priceRange[1]}
                  </p>
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <label className="block text-gray-700 text-sm mb-2">Minimum Rating</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white">
                  <option>All Ratings</option>
                  <option>4★ & above</option>
                  <option>4.5★ & above</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-800">
                {filteredProducts.length} Products
              </h3>
              <select className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm">
                <option>Sort: Popular</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest First</option>
              </select>
            </div>

            {/* Product Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden border border-gray-200"
                >
                  {/* Product Image */}
                  <div className="relative aspect-square bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    {product.originalPrice && (
                      <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-sm">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </div>
                    )}
                    {product.stock <= 5 && (
                      <div className="absolute top-3 right-3 bg-orange-500 text-white px-2 py-1 rounded text-sm">
                        Only {product.stock} left
                      </div>
                    )}
                    <button className="absolute bottom-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform">
                      <Heart className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <h4 className="text-gray-800 mb-2 line-clamp-2">{product.name}</h4>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-orange-500 text-orange-500" />
                        <span className="text-gray-800 text-sm">{product.rating}</span>
                      </div>
                      <span className="text-gray-500 text-sm">({product.reviews})</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-green-600 text-sm">{product.stock} in stock</span>
                    </div>

                    <div className="mb-3">
                      <div className="flex items-baseline gap-2">
                        <span className="text-gray-800">₹{product.price}</span>
                        {product.originalPrice && (
                          <span className="text-gray-400 line-through text-sm">₹{product.originalPrice}</span>
                        )}
                      </div>
                    </div>

                    {/* AI Tags */}
                    <div className="mb-3">
                      <div className="flex items-center gap-1 mb-1">
                        <Sparkles className="w-3 h-3 text-purple-600" />
                        <span className="text-xs text-gray-600">AI Tags:</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {product.aiTags.slice(0, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 bg-purple-50 text-purple-700 rounded-full text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2">
                      <button
                        onClick={() => handleWhatsAppOrder(product)}
                        className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <MessageCircle className="w-4 h-4" />
                        Order on WhatsApp
                      </button>
                      <button
                        onClick={() => handleAskAI(product)}
                        className="w-full border border-purple-600 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 transition-colors flex items-center justify-center gap-2"
                      >
                        <Sparkles className="w-4 h-4" />
                        Ask AI
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-gray-800 mb-4">Customer Reviews</h3>
              
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 last:border-0 pb-4 last:pb-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <span className="text-purple-700">{review.name[0]}</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-800 text-sm">{review.name}</span>
                            {review.verified && (
                              <span className="flex items-center gap-1 text-xs text-green-600">
                                <Verified className="w-3 h-3" />
                                Verified
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3 h-3 ${
                                    i < review.rating
                                      ? 'fill-orange-500 text-orange-500'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-gray-500">{review.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Chat Modal */}
      {showAiChat && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-gray-800">AI Product Assistant</h3>
                  <p className="text-sm text-gray-600">{selectedProduct.name}</p>
                </div>
              </div>
              <button
                onClick={() => setShowAiChat(false)}
                className="text-gray-600 hover:text-gray-800"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-96">
              <div className="space-y-4">
                <div className="bg-purple-50 rounded-lg p-4">
                  <p className="text-gray-800 mb-2">Hi! I'm your AI shopping assistant. I can help you with:</p>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>✓ Product details and specifications</li>
                    <li>✓ Care instructions</li>
                    <li>✓ Sizing and compatibility</li>
                    <li>✓ Customization options</li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-800 mb-2">Based on the product image analysis:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.aiTags.map((tag, idx) => (
                      <span key={idx} className="px-3 py-1 bg-white border border-purple-200 text-purple-700 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-gray-700">
                    <strong>AI Recommendation:</strong> This {selectedProduct.name.toLowerCase()} is perfect for {selectedProduct.category.toLowerCase()} enthusiasts. 
                    Based on {selectedProduct.reviews} customer reviews (avg {selectedProduct.rating}★), customers love the quality and craftsmanship. 
                    Currently {selectedProduct.stock} units in stock.
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <textarea
                  placeholder="Ask me anything about this product..."
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button className="mt-2 w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                  Send Question
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
