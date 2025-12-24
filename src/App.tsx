import { useState } from 'react';
import { SearchView } from './components/SearchView';
import { ImageSearch } from './components/ImageSearch';
import { LocalSnap } from './components/LocalSnap';
import { SellerOnboarding } from './components/SellerOnboarding';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { ShoppingBag, Camera, Store, PlusCircle, BarChart3 } from 'lucide-react';

type View = 'search' | 'image' | 'local' | 'seller' | 'analytics';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('search');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-8 h-8 text-purple-600" />
              <h1 className="text-purple-600">SnapLab</h1>
              <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">AI-Powered</span>
            </div>
            <nav className="hidden md:flex gap-6">
              <button
                onClick={() => setCurrentView('search')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  currentView === 'search' ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                Search
              </button>
              <button
                onClick={() => setCurrentView('image')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  currentView === 'image' ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Camera className="w-4 h-4" />
                Image Search
              </button>
              <button
                onClick={() => setCurrentView('local')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  currentView === 'local' ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Store className="w-4 h-4" />
                Local Snap
              </button>
              <button
                onClick={() => setCurrentView('seller')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  currentView === 'seller' ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <PlusCircle className="w-4 h-4" />
                Sell
              </button>
              <button
                onClick={() => setCurrentView('analytics')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  currentView === 'analytics' ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                Analytics
              </button>
            </nav>
          </div>
          
          {/* Mobile Navigation */}
          <div className="md:hidden mt-4 flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setCurrentView('search')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg whitespace-nowrap ${
                currentView === 'search' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              Search
            </button>
            <button
              onClick={() => setCurrentView('image')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg whitespace-nowrap ${
                currentView === 'image' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'
              }`}
            >
              <Camera className="w-4 h-4" />
              Image
            </button>
            <button
              onClick={() => setCurrentView('local')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg whitespace-nowrap ${
                currentView === 'local' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'
              }`}
            >
              <Store className="w-4 h-4" />
              Local
            </button>
            <button
              onClick={() => setCurrentView('seller')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg whitespace-nowrap ${
                currentView === 'seller' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              Sell
            </button>
            <button
              onClick={() => setCurrentView('analytics')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg whitespace-nowrap ${
                currentView === 'analytics' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              Stats
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {currentView === 'search' && <SearchView />}
        {currentView === 'image' && <ImageSearch />}
        {currentView === 'local' && <LocalSnap />}
        {currentView === 'seller' && <SellerOnboarding />}
        {currentView === 'analytics' && <AnalyticsDashboard />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-gray-600">
          <p>Powered by Google Cloud Vision API + Gemini AI + Firebase</p>
          <p className="text-sm mt-2 text-gray-500">Empowering small sellers, simplifying shopping decisions</p>
        </div>
      </footer>
    </div>
  );
}