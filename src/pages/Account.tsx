import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  UserIcon, 
  ShoppingBagIcon, 
  HeartIcon, 
  MapPinIcon,
  CogIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
import { useStore } from '../store/useStore';
import AccountProfile from '../components/Account/AccountProfile';
import AccountOrders from '../components/Account/AccountOrders';
import AccountAddresses from '../components/Account/AccountAddresses';
import AccountSettings from '../components/Account/AccountSettings';

const Account: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { language, user, setUser } = useStore();
  const isRTL = language === 'ar';

  const menuItems = [
    { id: 'profile', label: 'Profile', icon: UserIcon, path: '/account' },
    { id: 'orders', label: 'Orders', icon: ShoppingBagIcon, path: '/account/orders' },
    { id: 'addresses', label: 'Addresses', icon: MapPinIcon, path: '/account/addresses' },
    { id: 'settings', label: 'Settings', icon: CogIcon, path: '/account/settings' },
  ];

  const handleLogout = () => {
    setUser(null);
    // Redirect to home page
    window.location.href = '/';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
        <p className="text-gray-600 mt-2">Manage your account settings and orders</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            {/* User Info */}
            <div className="text-center mb-6 pb-6 border-b">
              <div className="w-16 h-16 bg-egyptian-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <UserIcon className="w-8 h-8 text-egyptian-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900">
                {user ? `${user.firstName} ${user.lastName}` : 'Guest User'}
              </h3>
              <p className="text-sm text-gray-600">{user?.email || 'guest@example.com'}</p>
            </div>

            {/* Navigation Menu */}
            <nav className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path || 
                  (item.path === '/account' && location.pathname === '/account');
                
                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-egyptian-blue-50 text-egyptian-blue-700 border-r-2 border-egyptian-blue-700' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    } ${isRTL ? 'space-x-reverse border-r-0 border-l-2' : ''}`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              
              <button
                onClick={handleLogout}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors ${isRTL ? 'space-x-reverse' : ''}`}
              >
                <ArrowRightOnRectangleIcon className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Routes>
            <Route path="/" element={<AccountProfile />} />
            <Route path="/orders" element={<AccountOrders />} />
            <Route path="/addresses" element={<AccountAddresses />} />
            <Route path="/settings" element={<AccountSettings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Account;