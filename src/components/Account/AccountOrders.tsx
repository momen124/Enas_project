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
        return <CheckCircleIcon className="w-5 h-5 text-green-600 dark:text-green-400" />;
      case 'shipped':
        return <TruckIcon className="w-5 h-5 text-[var(--primary-color)]" />;
      case 'processing':
        return <ClockIcon className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />;
      case 'cancelled':
        return <XCircleIcon className="w-5 h-5 text-red-600 dark:text-red-400" />;
      default:
        return <ClockIcon className="w-5 h-5 text-[var(--secondary-text-color)]" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20';
      case 'shipped':
        return 'text-[var(--primary-color)] bg-[var(--hover-bg-color)]';
      case 'processing':
        return 'text-yellow-600 bg-yellow-50 dark:text-yellow-400 dark:bg-yellow-900/20';
      case 'cancelled':
        return 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20';
      default:
        return 'text-[var(--secondary-text-color)] bg-[var(--hover-bg-color)]';
    }
  };

  const filteredOrders = filterStatus === 'all' 
    ? mockOrders 
    : mockOrders.filter(order => order.status === filterStatus);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[var(--card-bg-color)] rounded-lg shadow-sm border border-[var(--border-color)] p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-semibold text-[var(--text-color)] mb-4 sm:mb-0">Order History</h2>
          
          {/* Filter Dropdown */}
          <div className="flex items-center space-x-4">
            <label className="text-sm text-[var(--secondary-text-color)]">Filter by status:</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-[var(--border-color)] rounded-lg px-3 py-2 text-sm bg-[var(--card-bg-color)] text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
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
        <div className="bg-[var(--card-bg-color)] rounded-lg shadow-sm border border-[var(--border-color)] p-12 text-center">
          <div className="text-[var(--secondary-text-color)] mb-4">
            <ClockIcon className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-lg font-semibold text-[var(--text-color)] mb-2">No orders found</h3>
          <p className="text-[var(--secondary-text-color)] mb-6">
            {filterStatus === 'all' 
              ? "You haven't placed any orders yet." 
              : `No orders with status "${filterStatus}" found.`}
          </p>
          <Link
            to="/shop"
            className="bg-[var(--primary-color)] text-[var(--cream-white-500)] px-6 py-3 rounded-lg hover:bg-[var(--egyptian-blue-800)] transition-colors inline-block"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div key={order.id} className="bg-[var(--card-bg-color)] rounded-lg shadow-sm border border-[var(--border-color)]">
              {/* Order Header */}
              <div className="p-6 border-b border-[var(--border-color)]">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                    <div>
                      <h3 className="font-semibold text-[var(--text-color)]">Order #{order.id}</h3>
                      <p className="text-sm text-[var(--secondary-text-color)]">
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
                      <p className="font-semibold text-[var(--text-color)]">{formatPrice(order.total)}</p>
                      <p className="text-sm text-[var(--secondary-text-color)]">{order.items.length} item(s)</p>
                    </div>
                    <button className="flex items-center space-x-2 text-[var(--primary-color)] hover:text-[var(--egyptian-blue-800)] transition-colors">
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
                        <h4 className="font-medium text-[var(--text-color)]">
                          {language === 'ar' ? item.nameAr : item.name}
                        </h4>
                        <p className="text-sm text-[var(--secondary-text-color)]">
                          {item.color} • {item.size} • Qty: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-[var(--text-color)]">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6 pt-6 border-t border-[var(--border-color)]">
                  <div className="flex space-x-4 mb-4 sm:mb-0">
                    {order.status === 'delivered' && (
                      <button className="text-[var(--primary-color)] hover:text-[var(--egyptian-blue-800)] transition-colors">
                        Write Review
                      </button>
                    )}
                    {order.status === 'processing' && (
                      <button className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors">
                        Cancel Order
                      </button>
                    )}
                    <button className="text-[var(--secondary-text-color)] hover:text-[var(--text-color)] transition-colors">
                      Download Invoice
                    </button>
                  </div>
                  
                  {(order.status === 'shipped' || order.status === 'delivered') && (
                    <button className="text-[var(--primary-color)] hover:text-[var(--egyptian-blue-800)] transition-colors flex items-center space-x-2">
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