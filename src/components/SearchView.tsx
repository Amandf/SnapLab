import { useState } from 'react';
import { Search, TrendingUp, Sparkles, ChevronDown, MessageSquare } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { mockProducts } from '../data/mockProducts';

export function SearchView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [aiInsight, setAiInsight] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [sortBy, setSortBy] = useState('relevance');

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    
    // Simulate AI-powered search with delay
    setTimeout(() => {
      const filtered = mockProducts.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setResults(filtered);
      
      // Generate AI insight
      const avgPrice = filtered.reduce((sum, p) => sum + p.price, 0) / filtered.length;
      setAiInsight(
        `Found ${filtered.length} products matching "${searchQuery}". ` +
        `Average price: ₹${Math.round(avgPrice)}. ` +
        `AI recommends filtering by reviews (4★+) for best value. ` +
        `${filtered.length > 3 ? 'Top-rated options shown first.' : ''}`
      );
      
      setLoading(false);
    }, 800);
  };

  const trendingSearches = [
    'budget headphones under ₹800',
    'wireless earbuds for gym',
    'laptop backpack waterproof',
    'phone charger fast charging',
    'study lamp LED desk'
  ];

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="bg-linear-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
        <div className="max-w-2xl">
          <h2 className="flex items-center gap-2 mb-2">
            <Sparkles className="w-6 h-6" />
            AI-Powered Product Discovery
          </h2>
          <p className="opacity-90 mb-6">
            Search naturally, compare intelligently, shop confidently. Our AI understands what you need.
          </p>
          
          {/* Search Bar */}
          <div className="bg-white rounded-xl p-2 flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Try: 'best budget headphones for study under ₹800'"
              className="flex-1 px-4 py-3 outline-none text-gray-800 rounded-lg"
            />
            <button
              onClick={handleSearch}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
            >
              <Search className="w-5 h-5" />
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Trending Searches */}
      {!results.length && (
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-orange-500" />
            <h3 className="text-gray-800">Trending Searches</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {trendingSearches.map((search, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSearchQuery(search);
                  setTimeout(handleSearch, 100);
                }}
                className="px-4 py-2 bg-gray-100 hover:bg-purple-100 hover:text-purple-700 rounded-full text-gray-700 transition-colors"
              >
                {search}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* AI Insight */}
      {aiInsight && (
        <div className="bg-linear-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-4">
          <div className="flex gap-3">
            <Sparkles className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-purple-900">{aiInsight}</p>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-200 border-t-purple-600"></div>
        </div>
      )}

      {/* Results */}
      {results.length > 0 && !loading && (
        <>
          {/* Filters & Sort */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Filters
                <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
              
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg bg-white"
                >
                  <option value="relevance">Relevance</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
            
            {showFilters && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Price Range</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        placeholder="Min"
                      />
                      <input
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        placeholder="Max"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2">Minimum Rating</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white">
                      <option>Any Rating</option>
                      <option>4★ & above</option>
                      <option>3★ & above</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2">Platform</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white">
                      <option>All Platforms</option>
                      <option>Amazon</option>
                      <option>Flipkart</option>
                      <option>Local Sellers</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Product Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* AI Shopping Assistant */}
          <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-purple-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-gray-800 mb-2">AI Shopping Assistant</h3>
                <p className="text-gray-600 mb-4">
                  Based on your search, I recommend focusing on products with 4+ stars and verified reviews. 
                  Would you like me to explain the key differences between the top 3 options?
                </p>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                    Yes, explain
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    Show alternatives
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* No Results */}
      {results.length === 0 && !loading && searchQuery && (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm">
          <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-gray-800 mb-2">No products found</h3>
          <p className="text-gray-600">Try adjusting your search query or browse trending searches above</p>
        </div>
      )}
    </div>
  );
}
