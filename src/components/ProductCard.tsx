import { Star, TrendingUp, TrendingDown, ExternalLink, Heart, Share2 } from 'lucide-react';
import { useState } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  platform: string;
  category: string;
  description: string;
  pros?: string[];
  cons?: string[];
  aiScore?: number;
  trending?: 'up' | 'down';
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [liked, setLiked] = useState(false);

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-gray-200 overflow-hidden">
      {/* Product Image */}
      <div className="relative aspect-square bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {discount > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-lg">
            {discount}% OFF
          </div>
        )}
        {product.aiScore && product.aiScore > 85 && (
          <div className="absolute top-3 right-3 bg-purple-600 text-white px-2 py-1 rounded-lg flex items-center gap-1">
            <Star className="w-4 h-4 fill-current" />
            AI Pick
          </div>
        )}
        <button
          onClick={() => setLiked(!liked)}
          className="absolute bottom-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
        >
          <Heart className={`w-5 h-5 ${liked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-gray-800 line-clamp-2">{product.name}</h3>
          {product.trending && (
            <div className={`flex-shrink-0 ${product.trending === 'up' ? 'text-green-500' : 'text-orange-500'}`}>
              {product.trending === 'up' ? (
                <TrendingUp className="w-5 h-5" />
              ) : (
                <TrendingDown className="w-5 h-5" />
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1 text-orange-500">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-gray-800">{product.rating}</span>
          </div>
          <span className="text-gray-500">({product.reviews.toLocaleString()} reviews)</span>
        </div>

        <div className="mb-3">
          <div className="flex items-baseline gap-2">
            <span className="text-gray-800">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
            )}
          </div>
          <span className="text-gray-500 text-sm">on {product.platform}</span>
        </div>

        {/* AI Insights */}
        {product.aiScore && (
          <div className="mb-3 p-3 bg-purple-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-purple-700">AI Confidence Score</span>
              <span className="text-purple-900">{product.aiScore}%</span>
            </div>
            <div className="w-full bg-purple-200 rounded-full h-2">
              <div
                className="bg-purple-600 h-2 rounded-full transition-all"
                style={{ width: `${product.aiScore}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Toggle Details */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full text-purple-600 hover:text-purple-700 mb-3"
        >
          {showDetails ? 'Hide' : 'Show'} AI Analysis
        </button>

        {/* Detailed Analysis */}
        {showDetails && (
          <div className="mb-3 space-y-3 text-sm">
            {product.pros && product.pros.length > 0 && (
              <div>
                <p className="text-green-700 mb-1">✓ Pros:</p>
                <ul className="space-y-1 pl-4">
                  {product.pros.map((pro, idx) => (
                    <li key={idx} className="text-gray-600">{pro}</li>
                  ))}
                </ul>
              </div>
            )}
            {product.cons && product.cons.length > 0 && (
              <div>
                <p className="text-orange-700 mb-1">⚠ Cons:</p>
                <ul className="space-y-1 pl-4">
                  {product.cons.map((con, idx) => (
                    <li key={idx} className="text-gray-600">{con}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <a
            href={`https://${product.platform.toLowerCase()}.com/product/${product.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
          >
            View Deal
            <ExternalLink className="w-4 h-4" />
          </a>
          <button className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center">
            <Share2 className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
}
