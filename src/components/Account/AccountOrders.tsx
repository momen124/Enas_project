import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  EyeIcon, 
  TruckIcon, 
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon 
} from '@heroicons/react/24/outline';
import { useStore } from '../../store/useStore';

const AccountOrders: React.FC = () => {
  const { t } = useTranslation();
  const { language, currency } = useStore();
  const [filterStatus, setFilterStatus] = useState('all');

  const formatPrice = (price: number) => {
    const symbol = currency === 'EGP' ? 'ج.م' : currency === 'USD' ? '$' : '€';
    const convertedPrice = currency === 'EGP' ? price : currency === 'USD' ? price / 30 : price / 32;
    return `${convertedPrice.toFixed(2)} ${symbol}`;
  };

  // Mock orders data
  const mockOrders = [
    {
      id: '12345',
      date: '2025-01-15',
      status: 'delivered',
      total: 2500,
      items: [
        {
          name: 'Egyptian Cotton Luxury Sheet Set',
          nameAr: 'طقم ملاءات القطن المصري الفاخر',
          image: 'https://images.pexels.com/photos/1099816/pexels-photo-1099816.jpeg?auto=compress&cs=tinysrgb&w=400',
          quantity: 1,
          price: 2500,
          size: 'Queen',
          color: 'White'
        }
      ]
    },
    {
      id: '12344',
      date: '2025-01-10',
      status: 'shipped',
      total: 1800,
      items: [
        {
          name: 'Premium Cotton Duvet Cover',
          nameAr: 'غطاء لحاف القطن الفاخر',
          image: 'https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=400',
          quantity: 1,
          price: 1800,
          size: 'King',
          color: 'Navy'
        }
      ]
    },
    {
      id: '12343',
      date: '2025-01-05',
      status: 'processing',
      total: 3600,
      items: [
        {
          name: 'Egyptian Cotton Bath Towel Set',
          nameAr: 'طقم مناشف القطن المصري',
          image: 'https://images.pexels.com/photos/6197119/pexels-photo-6197119.jpeg?auto=compress&cs=tinysrgb&w=400',
          quantity: 2,
          price: 1200,
          size: 'Standard',
          color: 'White'
        },
        {
          name: 'Honeycomb Weave Coverlet',
          nameAr: 'غطاء نسج خلية النحل',
          image: 'https://images.pexels.com/photos/6636464/pexels-photo-6636464.jpeg?auto=compress&cs=tinysrgb&w=400',
          quantity: 1,
          price: 1500,
          size: 'Queen',
          color: 'Sage'
        }
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircleIcon className="w-5 h-5 text-green-600" />;
      case 'shipped':
        return <TruckIcon className="w-5 h-5 text-blue-600" />;
      case 'processing':
        return <ClockIcon className="w-5 h-5 text-yellow-600" />;
      case 'cancelled':
        return <XCircleIcon className="w-5 h-5 text-red-600" />;
      default:
        return <ClockIcon className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'text-green-600 bg-green-50';
      case 'shipped':
        return 'text-blue-600 bg-blue-50';
      case 'processing':
        return 'text-yellow-600 bg-yellow-50';
      case 'cancelled':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const filteredOrders = filterStatus === 'all' 
    ? mockOrders 
    : mockOrders.filter(order => order.status === filterStatus);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-semibold mb-4 sm:mb-0">Order History</h2>
          
          {/* Filter Dropdown */}
          <div className="flex items-center space-x-4">
            <label className="text-sm text-gray-600">Filter by status:</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-egyptian-blue-500"
            >
              <option value="all">All Orders</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
          <div className="text-gray-400 mb-4">
            <ClockIcon className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders found</h3>
          <p className="text-gray-600 mb-6">
            {filterStatus === 'all' 
              ? "You haven't placed any orders yet." 
              : `No orders with status "${filterStatus}" found.`}
          </p>
          <Link
            to="/shop"
            className="bg-egyptian-blue-600 text-white px-6 py-3 rounded-lg hover:bg-egyptian-blue-700 transition-colors inline-block"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-sm border">
              {/* Order Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                    <div>
                      <h3 className="font-semibold text-gray-900">Order #{order.id}</h3>
                      <p className="text-sm text-gray-600">
                        Placed on {new Date(order.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span className="capitalize">{order.status}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{formatPrice(order.total)}</p>
                      <p className="text-sm text-gray-600">{order.items.length} item(s)</p>
                    </div>
                    <button className="flex items-center space-x-2 text-egyptian-blue-600 hover:text-egyptian-blue-700 transition-colors">
                      <EyeIcon className="w-4 h-4" />
                      <span>View Details</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-6">
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={language === 'ar' ? item.nameAr : item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">
                          {language === 'ar' ? item.nameAr : item.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {item.color} • {item.size} • Qty: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6 pt-6 border-t border-gray-100">
                  <div className="flex space-x-4 mb-4 sm:mb-0">
                    {order.status === 'delivered' && (
                      <button className="text-egyptian-blue-600 hover:text-egyptian-blue-700 transition-colors">
                        Write Review
                      </button>
                    )}
                    {order.status === 'processing' && (
                      <button className="text-red-600 hover:text-red-700 transition-colors">
                        Cancel Order
                      </button>
                    )}
                    <button className="text-gray-600 hover:text-gray-700 transition-colors">
                      Download Invoice
                    </button>
                  </div>
                  
                  {(order.status === 'shipped' || order.status === 'delivered') && (
                    <button className="text-egyptian-blue-600 hover:text-egyptian-blue-700 transition-colors flex items-center space-x-2">
                      <TruckIcon className="w-4 h-4" />
                      <span>Track Package</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AccountOrders;