import { useState } from 'react';
import {  Sparkles, Check, MessageCircle, Store, Camera } from 'lucide-react';

export function SellerOnboarding() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: '',
    category: '',
    location: '',
    whatsapp: '',
    description: ''
  });
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [processing, setProcessing] = useState(false);
  const [generatedData, setGeneratedData] = useState<any>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImages(prev => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const processWithAI = () => {
    setProcessing(true);
    
    // Simulate Google Vision + Gemini AI processing
    setTimeout(() => {
      const mockGenerated = {
        products: [
          {
            title: 'Handcrafted Ceramic Vase',
            description: 'Beautiful handmade ceramic vase with intricate patterns, perfect for home decoration',
            category: 'Home Decor',
            suggestedPrice: '₹450-600',
            tags: ['handmade', 'ceramic', 'vase', 'home decor']
          },
          {
            title: 'Artisan Coffee Mug Set',
            description: 'Set of 2 handcrafted coffee mugs with unique glaze finish',
            category: 'Home Decor',
            suggestedPrice: '₹350-500',
            tags: ['handmade', 'ceramic', 'mugs', 'coffee']
          }
        ],
        storeDescription: 'Artisan ceramic products handcrafted with care. Each piece is unique and made with traditional techniques.',
        recommendedTags: ['handmade', 'ceramic', 'artisan', 'home decor', 'eco-friendly']
      };
      
      setGeneratedData(mockGenerated);
      setProcessing(false);
      setStep(3);
    }, 2000);
  };

  const generateStorefront = () => {
    const storefrontUrl = `SnapLab.com/store/${formData.businessName.toLowerCase().replace(/\s+/g, '-')}`;
    return storefrontUrl;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-linear-to-r from-orange-600 to-pink-600 rounded-2xl p-8 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Store className="w-8 h-8" />
          <h2>Seller Onboarding</h2>
        </div>
        <p className="opacity-90">
          Create your mini storefront in minutes. No technical knowledge required - just upload photos and we'll handle the rest!
        </p>
      </div>

      {/* Progress Steps */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <div className="flex flex-col items-center flex-1">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step >= 1 ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              {step > 1 ? <Check className="w-5 h-5" /> : '1'}
            </div>
            <span className="text-sm mt-2 text-gray-600">Business Info</span>
          </div>
          
          <div className={`h-1 flex-1 ${step >= 2 ? 'bg-orange-600' : 'bg-gray-200'}`}></div>
          
          <div className="flex flex-col items-center flex-1">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step >= 2 ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              {step > 2 ? <Check className="w-5 h-5" /> : '2'}
            </div>
            <span className="text-sm mt-2 text-gray-600">Upload Products</span>
          </div>
          
          <div className={`h-1 flex-1 ${step >= 3 ? 'bg-orange-600' : 'bg-gray-200'}`}></div>
          
          <div className="flex flex-col items-center flex-1">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step >= 3 ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              {step > 3 ? <Check className="w-5 h-5" /> : '3'}
            </div>
            <span className="text-sm mt-2 text-gray-600">AI Enhancement</span>
          </div>
          
          <div className={`h-1 flex-1 ${step >= 4 ? 'bg-orange-600' : 'bg-gray-200'}`}></div>
          
          <div className="flex flex-col items-center flex-1">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step >= 4 ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              4
            </div>
            <span className="text-sm mt-2 text-gray-600">Go Live</span>
          </div>
        </div>
      </div>

      {/* Step 1: Business Information */}
      {step === 1 && (
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-gray-800 mb-6">Tell us about your business</h3>
          
          <div className="space-y-4 max-w-2xl">
            <div>
              <label className="block text-gray-700 mb-2">Business Name *</label>
              <input
                type="text"
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                placeholder="e.g., Artisan Crafts by Priya"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">Select a category</option>
                <option value="handmade">Handmade & Crafts</option>
                <option value="fashion">Fashion & Apparel</option>
                <option value="electronics">Electronics</option>
                <option value="home-decor">Home Decor</option>
                <option value="food">Food & Beverages</option>
                <option value="beauty">Beauty & Cosmetics</option>
                <option value="accessories">Accessories</option>
              </select>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Location *</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g., Bandra, Mumbai"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">WhatsApp Number *</label>
              <input
                type="tel"
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                placeholder="+91 98765 43210"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <p className="text-gray-500 text-sm mt-1">Customers will contact you via WhatsApp</p>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Business Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Tell customers about your business..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            
            <button
              onClick={() => setStep(2)}
              disabled={!formData.businessName || !formData.category || !formData.location || !formData.whatsapp}
              className="w-full bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Continue to Product Upload
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Upload Products */}
      {step === 2 && (
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-gray-800 mb-2">Upload Product Images</h3>
          <p className="text-gray-600 mb-6">Upload 5-20 product photos. Our AI will automatically extract details and create listings.</p>
          
          {/* Upload Area */}
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center mb-6 hover:border-orange-400 transition-colors">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="product-upload"
            />
            <label htmlFor="product-upload" className="cursor-pointer">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="w-10 h-10 text-orange-600" />
              </div>
              <h4 className="text-gray-800 mb-2">Upload Product Photos</h4>
              <p className="text-gray-600">Click to browse or drag and drop</p>
            </label>
          </div>
          
          {/* Uploaded Images Preview */}
          {uploadedImages.length > 0 && (
            <div className="mb-6">
              <h4 className="text-gray-800 mb-3">{uploadedImages.length} Images Uploaded</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {uploadedImages.map((img, idx) => (
                  <div key={idx} className="relative aspect-square rounded-lg overflow-hidden">
                    <img src={img} alt={`Product ${idx + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex gap-3">
            <button
              onClick={() => setStep(1)}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Back
            </button>
            <button
              onClick={processWithAI}
              disabled={uploadedImages.length === 0}
              className="flex-1 bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Process with AI
            </button>
          </div>
        </div>
      )}

      {/* Step 3: AI Processing & Review */}
      {step === 3 && !processing && generatedData && (
        <div className="space-y-6">
          <div className="bg-linear-to-r from-orange-50 to-pink-50 border border-orange-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="w-6 h-6 text-orange-600" />
              <h3 className="text-gray-800">AI has enhanced your listings!</h3>
            </div>
            <p className="text-gray-600">Review the auto-generated product details below. You can edit anything before publishing.</p>
          </div>
          
          {/* Generated Products */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-gray-800 mb-4">Generated Product Listings</h3>
            
            <div className="space-y-6">
              {generatedData.products.map((product: any, idx: number) => (
                <div key={idx} className="border border-gray-200 rounded-lg p-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <img
                        src={uploadedImages[idx] || uploadedImages[0]}
                        alt={product.title}
                        className="w-full rounded-lg"
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="block text-gray-700 text-sm mb-1">Product Title</label>
                        <input
                          type="text"
                          value={product.title}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          readOnly
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 text-sm mb-1">Description</label>
                        <textarea
                          value={product.description}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          readOnly
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-gray-700 text-sm mb-1">Category</label>
                          <input
                            type="text"
                            value={product.category}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            readOnly
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 text-sm mb-1">Suggested Price</label>
                          <input
                            type="text"
                            value={product.suggestedPrice}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            readOnly
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 text-sm mb-1">Tags</label>
                        <div className="flex flex-wrap gap-2">
                          {product.tags.map((tag: string, i: number) => (
                            <span key={i} className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => setStep(2)}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Back
            </button>
            <button
              onClick={() => setStep(4)}
              className="flex-1 bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors"
            >
              Looks Good - Publish Store
            </button>
          </div>
        </div>
      )}

      {/* Processing State */}
      {processing && (
        <div className="bg-white rounded-xl p-12 shadow-sm text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-200 border-t-orange-600 mx-auto mb-4"></div>
          <h3 className="text-gray-800 mb-2">AI is working its magic...</h3>
          <div className="space-y-2 text-gray-600">
            <p className="flex items-center gap-2 justify-center">
              <Sparkles className="w-4 h-4 text-orange-600" />
              Analyzing product images with Google Vision AI
            </p>
            <p className="flex items-center gap-2 justify-center">
              <Sparkles className="w-4 h-4 text-orange-600" />
              Generating descriptions with Gemini AI
            </p>
            <p className="flex items-center gap-2 justify-center">
              <Sparkles className="w-4 h-4 text-orange-600" />
              Creating optimized product listings
            </p>
          </div>
        </div>
      )}

      {/* Step 4: Success */}
      {step === 4 && (
        <div className="bg-white rounded-xl p-12 shadow-sm text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          
          <h2 className="text-gray-800 mb-2">🎉 Your Store is Live!</h2>
          <p className="text-gray-600 mb-6">Congratulations! Your mini storefront is now live and ready to receive orders.</p>
          
          <div className="max-w-md mx-auto mb-6 p-4 bg-gray-50 rounded-lg">
            <label className="block text-gray-700 text-sm mb-2">Your Storefront URL</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={generateStorefront()}
                readOnly
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-white"
              />
              <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
                Copy
              </button>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-6">
            <div className="p-4 bg-orange-50 rounded-lg">
              <div className="text-orange-600 mb-1">{uploadedImages.length}</div>
              <p className="text-gray-600 text-sm">Products Listed</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <div className="text-orange-600 mb-1">100%</div>
              <p className="text-gray-600 text-sm">AI Enhanced</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <div className="text-orange-600 mb-1">Live</div>
              <p className="text-gray-600 text-sm">Status</p>
            </div>
          </div>
          
          <div className="flex gap-3 justify-center">
            <button className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center gap-2">
              <Store className="w-5 h-5" />
              View My Store
            </button>
            <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Share on WhatsApp
            </button>
          </div>
        </div>
      )}

      {/* Benefits Section */}
      {step === 1 && (
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-gray-800 mb-4">Why Sell on SnapLab?</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h4 className="text-gray-800 mb-1">AI-Powered Listing</h4>
                <p className="text-gray-600 text-sm">Upload photos and let AI create perfect product descriptions</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h4 className="text-gray-800 mb-1">WhatsApp Integration</h4>
                <p className="text-gray-600 text-sm">Customers contact you directly via WhatsApp</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Store className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h4 className="text-gray-800 mb-1">Instant Storefront</h4>
                <p className="text-gray-600 text-sm">Get a professional mini store in minutes</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Check className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h4 className="text-gray-800 mb-1">Zero Setup Fees</h4>
                <p className="text-gray-600 text-sm">No technical knowledge or investment required</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
