import { useState, useEffect } from 'react';
import { 
  CubeIcon, 
  CurrencyDollarIcon, 
  ChartBarIcon,
  PlusIcon,
  UsersIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import ApiService from '../services/api';
import AddProductModal from '../components/AddProduct.jsx';

function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalValue: 0,
    lowStock: 0,
    users: 0,
    mostAddedProduct: null
  });
  const [recentProducts, setRecentProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const productsResponse = await ApiService.getProducts(1, 5); // Get 5 most recent
      setRecentProducts(productsResponse || []);
      
      const analyticsResponse = await ApiService.getAnalytics();
      
      setStats({
        totalProducts: analyticsResponse.products || 0,
        totalValue: analyticsResponse.totalInventoryValue || 0,
        lowStock: analyticsResponse.lowStockAlerts || 0,
        users: analyticsResponse.users || 0,
        mostAddedProduct: analyticsResponse.mostAddedProduct || null,
      });

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { title: 'Total Products', value: stats.totalProducts, icon: CubeIcon, color: 'text-sky-600', bgColor: 'bg-sky-100' },
    { title: 'Total Value', value: `$${stats.totalValue.toFixed(2)}`, icon: CurrencyDollarIcon, color: 'text-emerald-600', bgColor: 'bg-emerald-100' },
    { title: 'Low Stock Alerts', value: stats.lowStock, icon: ChartBarIcon, color: 'text-amber-600', bgColor: 'bg-amber-100' },
    { title: 'Total Users', value: stats.users, icon: UsersIcon, color: 'text-violet-600', bgColor: 'bg-violet-100' },
    { title: 'Most Popular', value: stats.mostAddedProduct ? stats.mostAddedProduct.name : 'N/A', icon: StarIcon, color: 'text-pink-600', bgColor: 'bg-pink-100' }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {statCards.map((stat) => (
          <div key={stat.title} className="overflow-hidden rounded-lg bg-white shadow-md">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={`rounded-md p-3 ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} aria-hidden="true" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="truncate text-sm font-medium text-slate-500">{stat.title}</dt>
                    <dd className="text-lg font-semibold text-slate-900">{stat.value}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Products */}
      <div className="overflow-hidden rounded-lg bg-white shadow-md">
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-slate-900">Recent Products</h2>
            <button 
              className="inline-flex items-center rounded-md border border-transparent bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
              onClick={() => setShowAddModal(true)}
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Product
            </button>
          </div>
          
          {recentProducts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Quantity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {recentProducts.map((product) => (
                    <tr key={product._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{product.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">${product.price.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{product.quantity}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          product.quantity < 10 
                            ? 'bg-red-100 text-red-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {product.quantity < 10 ? 'Low Stock' : 'In Stock'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <CubeIcon className="mx-auto h-12 w-12 text-slate-400" />
              <h3 className="mt-2 text-sm font-medium text-slate-900">No products</h3>
              <p className="mt-1 text-sm text-slate-500">Get started by adding a new product.</p>
            </div>
          )}
        </div>
      </div>

      {showAddModal && (
        <AddProductModal 
          onClose={() => setShowAddModal(false)}
          onSuccess={() => {
            setShowAddModal(false);
            fetchDashboardData();
          }}
        />
      )}
    </div>
  );
}

export default Dashboard;
