import { TrendingUp, Users, Eye, MessageCircle, ShoppingBag, Star, ArrowUp, ArrowDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export function AnalyticsDashboard() {
  const statsData = [
    { label: 'Total Views', value: '2,347', change: '+12.5%', trend: 'up', icon: Eye },
    { label: 'Product Clicks', value: '892', change: '+8.3%', trend: 'up', icon: ShoppingBag },
    { label: 'WhatsApp Contacts', value: '156', change: '+24.1%', trend: 'up', icon: MessageCircle },
    { label: 'Avg. Rating', value: '4.8', change: '+0.2', trend: 'up', icon: Star }
  ];

  const viewsData = [
    { day: 'Mon', views: 234, clicks: 45 },
    { day: 'Tue', views: 312, clicks: 67 },
    { day: 'Wed', views: 289, clicks: 52 },
    { day: 'Thu', views: 356, clicks: 78 },
    { day: 'Fri', views: 423, clicks: 89 },
    { day: 'Sat', views: 398, clicks: 82 },
    { day: 'Sun', views: 335, clicks: 71 }
  ];

  const productPerformance = [
    { name: 'Handcrafted Vase', views: 456, clicks: 89, conversion: 19.5 },
    { name: 'Coffee Mug Set', views: 389, clicks: 72, conversion: 18.5 },
    { name: 'Decorative Plate', views: 312, clicks: 58, conversion: 18.6 },
    { name: 'Ceramic Bowl', views: 267, clicks: 45, conversion: 16.9 },
    { name: 'Wall Art', views: 234, clicks: 38, conversion: 16.2 }
  ];

  const categoryData = [
    { name: 'Home Decor', value: 45 },
    { name: 'Accessories', value: 30 },
    { name: 'Gifts', value: 15 },
    { name: 'Other', value: 10 }
  ];

  const COLORS = ['#9333ea', '#ec4899', '#f59e0b', '#3b82f6'];

  const topRegions = [
    { city: 'Mumbai', orders: 45, percentage: 28.8 },
    { city: 'Delhi', orders: 32, percentage: 20.5 },
    { city: 'Bangalore', orders: 28, percentage: 17.9 },
    { city: 'Pune', orders: 24, percentage: 15.4 },
    { city: 'Hyderabad', orders: 18, percentage: 11.5 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-linear-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
        <div className="flex items-center gap-3 mb-2">
          <TrendingUp className="w-8 h-8" />
          <h2>Analytics Dashboard</h2>
        </div>
        <p className="opacity-90">
          Track your store performance, understand customer behavior, and grow your business
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Icon className="w-6 h-6 text-purple-600" />
                </div>
                <div className={`flex items-center gap-1 ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend === 'up' ? (
                    <ArrowUp className="w-4 h-4" />
                  ) : (
                    <ArrowDown className="w-4 h-4" />
                  )}
                  <span className="text-sm">{stat.change}</span>
                </div>
              </div>
              <div className="text-gray-800 mb-1">{stat.value}</div>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Views & Clicks Over Time */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-gray-800 mb-4">Views & Clicks This Week</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={viewsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="day" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip />
            <Line type="monotone" dataKey="views" stroke="#9333ea" strokeWidth={2} name="Views" />
            <Line type="monotone" dataKey="clicks" stroke="#ec4899" strokeWidth={2} name="Clicks" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Product Performance & Category Distribution */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Product Performance */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-gray-800 mb-4">Top Performing Products</h3>
          <div className="space-y-3">
            {productPerformance.map((product, idx) => (
              <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="text-gray-800 text-sm">{product.name}</h4>
                    <p className="text-gray-600 text-xs">{product.views} views • {product.clicks} clicks</p>
                  </div>
                  <span className="text-purple-600">{product.conversion}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full"
                    style={{ width: `${product.conversion * 5}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-gray-800 mb-4">Sales by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.name} (${entry.value}%)`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Geographic Insights */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-gray-800 mb-4">Top Regions</h3>
        <div className="space-y-3">
          {topRegions.map((region, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <div className="w-8 text-center text-gray-600">{idx + 1}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-gray-800">{region.city}</span>
                  <span className="text-gray-600 text-sm">{region.orders} orders ({region.percentage}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${region.percentage * 3}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Insights */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-gray-800">Customer Insights</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Returning Customers</span>
              <span className="text-gray-800">34%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Avg. Time on Page</span>
              <span className="text-gray-800">2m 34s</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Bounce Rate</span>
              <span className="text-gray-800">23%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-orange-600" />
            </div>
            <h3 className="text-gray-800">Engagement</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Response Rate</span>
              <span className="text-gray-800">94%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Avg. Response Time</span>
              <span className="text-gray-800">12 min</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Customer Satisfaction</span>
              <span className="text-gray-800">4.8/5</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-gray-800">Growth</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Week over Week</span>
              <span className="text-green-600">+12.5%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Month over Month</span>
              <span className="text-green-600">+28.3%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">New Followers</span>
              <span className="text-gray-800">+234</span>
            </div>
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="bg-linear-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center shrink-0">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-gray-800 mb-2">AI-Powered Recommendations</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-purple-600">•</span>
                <span>Your "Handcrafted Vase" has 19.5% conversion rate. Consider featuring it prominently.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600">•</span>
                <span>Peak traffic is between 6-9 PM. Schedule WhatsApp availability during these hours.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600">•</span>
                <span>Mumbai shows highest demand. Consider offering local delivery promotions.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600">•</span>
                <span>Your response time is excellent! Keep maintaining quick replies to maximize conversions.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
