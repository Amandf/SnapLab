import { useState, useRef } from 'react';
import { Camera, Upload, Sparkles, Loader2, X } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { mockProducts } from '../data/mockProducts';

export function ImageSearch() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [extractedInfo, setExtractedInfo] = useState<any>(null);
  const [matchedProducts, setMatchedProducts] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        processImage();
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = () => {
    setProcessing(true);
    
    // Simulate Google Vision API + Gemini AI processing
    setTimeout(() => {
      // Mock extracted data from AI
      const mockExtraction = {
        productName: 'Wireless Bluetooth Headphones',
        category: 'Electronics - Audio',
        suggestedPrice: '₹800-1500',
        detectedLabels: ['headphones', 'wireless', 'bluetooth', 'audio device', 'black'],
        colors: ['Black', 'Silver accents'],
        confidence: 94,
        description: 'Over-ear wireless Bluetooth headphones with cushioned ear pads, suitable for music and calls'
      };
      
      setExtractedInfo(mockExtraction);
      
      // Find matching products
      const matches = mockProducts.filter(p => 
        p.category.toLowerCase().includes('headphones') ||
        p.category.toLowerCase().includes('audio')
      ).slice(0, 6);
      
      setMatchedProducts(matches);
      setProcessing(false);
    }, 2000);
  };

  const reset = () => {
    setSelectedImage(null);
    setExtractedInfo(null);
    setMatchedProducts([]);
    setProcessing(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-linear-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Camera className="w-8 h-8" />
          <h2>Image-to-Product Search</h2>
        </div>
        <p className="opacity-90">
          Upload any product photo or screenshot. Our AI will identify it and find the best matches online.
        </p>
      </div>

      {/* Upload Section */}
      {!selectedImage && (
        <div className="bg-white rounded-xl p-12 shadow-sm border-2 border-dashed border-gray-300 hover:border-purple-400 transition-colors">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          
          <div className="text-center">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="w-10 h-10 text-purple-600" />
            </div>
            
            <h3 className="text-gray-800 mb-2">Upload Product Image</h3>
            <p className="text-gray-600 mb-6">
              Drag and drop or click to browse
            </p>
            
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Choose Image
            </button>
            
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="p-3 bg-gray-50 rounded-lg">
                <Camera className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                <p className="text-gray-600 text-sm">Take Photo</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <Upload className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                <p className="text-gray-600 text-sm">Upload Image</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <Sparkles className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                <p className="text-gray-600 text-sm">AI Analysis</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <Camera className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                <p className="text-gray-600 text-sm">Get Matches</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Processing State */}
      {selectedImage && processing && (
        <div className="bg-white rounded-xl p-8 shadow-sm">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <img
                src={selectedImage}
                alt="Uploaded product"
                className="w-full rounded-lg"
              />
            </div>
            
            <div className="md:w-2/3 flex items-center justify-center">
              <div className="text-center">
                <Loader2 className="w-16 h-16 text-purple-600 animate-spin mx-auto mb-4" />
                <h3 className="text-gray-800 mb-2">Analyzing Image...</h3>
                <div className="space-y-2 text-gray-600">
                  <p className="flex items-center gap-2 justify-center">
                    <Sparkles className="w-4 h-4 text-purple-600" />
                    Google Vision API - Detecting objects
                  </p>
                  <p className="flex items-center gap-2 justify-center">
                    <Sparkles className="w-4 h-4 text-purple-600" />
                    Gemini AI - Extracting product details
                  </p>
                  <p className="flex items-center gap-2 justify-center">
                    <Sparkles className="w-4 h-4 text-purple-600" />
                    Finding best matches online
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      {selectedImage && extractedInfo && !processing && (
        <>
          {/* Extracted Information */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-purple-600" />
                <h3 className="text-gray-800">AI Extracted Information</h3>
              </div>
              <button
                onClick={reset}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <img
                  src={selectedImage}
                  alt="Uploaded product"
                  className="w-full rounded-lg mb-4"
                />
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-gray-600 text-sm">Product Name</label>
                  <p className="text-gray-800">{extractedInfo.productName}</p>
                </div>
                
                <div>
                  <label className="text-gray-600 text-sm">Category</label>
                  <p className="text-gray-800">{extractedInfo.category}</p>
                </div>
                
                <div>
                  <label className="text-gray-600 text-sm">Suggested Price Range</label>
                  <p className="text-gray-800">{extractedInfo.suggestedPrice}</p>
                </div>
                
                <div>
                  <label className="text-gray-600 text-sm">Detected Labels</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {extractedInfo.detectedLabels.map((label: string, idx: number) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="text-gray-600 text-sm">AI Confidence</label>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-green-500 h-3 rounded-full"
                        style={{ width: `${extractedInfo.confidence}%` }}
                      ></div>
                    </div>
                    <span className="text-gray-800">{extractedInfo.confidence}%</span>
                  </div>
                </div>
                
                <div>
                  <label className="text-gray-600 text-sm">Description</label>
                  <p className="text-gray-800">{extractedInfo.description}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Matched Products */}
          <div>
            <div className="mb-4">
              <h3 className="text-gray-800 mb-1">Found {matchedProducts.length} Similar Products</h3>
              <p className="text-gray-600">AI-matched products based on your image</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {matchedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          {/* Upload Another */}
          <div className="text-center">
            <button
              onClick={reset}
              className="px-6 py-3 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
            >
              Upload Another Image
            </button>
          </div>
        </>
      )}

      {/* How It Works */}
      {!selectedImage && (
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-gray-800 mb-4">How Image Search Works</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Camera className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-gray-800 mb-2">1. Upload or Capture</h4>
              <p className="text-gray-600">Take a photo or upload an image of any product</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Sparkles className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="text-gray-800 mb-2">2. AI Analysis</h4>
              <p className="text-gray-600">Google Vision + Gemini AI extracts product details</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Camera className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-gray-800 mb-2">3. Get Matches</h4>
              <p className="text-gray-600">Find similar products with prices and reviews</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
