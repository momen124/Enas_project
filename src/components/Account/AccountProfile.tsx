import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PencilIcon, StarIcon } from '@heroicons/react/24/outline';
import { useStore } from '../../store/useStore';
import { toast } from 'react-hot-toast';

const AccountProfile: React.FC = () => {
  const { t } = useTranslation();
  const { user, setUser, language } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Update user profile
    if (user) {
      setUser({ ...user, ...formData });
      toast.success('Profile updated successfully');
      setIsEditing(false);
    }
  };

  const mockUser = {
    firstName: 'Ahmed',
    lastName: 'Hassan',
    email: 'ahmed.hassan@example.com',
    phone: '+20 100 123 4567',
    loyaltyPoints: 850,
    totalOrders: 12,
    totalSpent: 15420,
    memberSince: 'January 2023',
  };

  const currentUser = user || mockUser;

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Profile Information</h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center space-x-2 text-egyptian-blue-600 hover:text-egyptian-blue-700"
          >
            <PencilIcon className="w-4 h-4" />
            <span>{isEditing ? 'Cancel' : 'Edit'}</span>
          </button>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-egyptian-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-egyptian-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-egyptian-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-egyptian-blue-500"
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-egyptian-blue-600 text-white px-6 py-2 rounded-lg hover:bg-egyptian-blue-700 transition-colors"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-gray-500">First Name</label>
                <p className="font-medium">{currentUser.firstName}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Last Name</label>
                <p className="font-medium">{currentUser.lastName}</p>
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-500">Email</label>
              <p className="font-medium">{currentUser.email}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Phone</label>
              <p className="font-medium">{currentUser.phone}</p>
            </div>
          </div>
        )}
      </div>

      {/* Account Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
          <div className="text-2xl font-bold text-egyptian-blue-600 mb-2">
            {currentUser.loyaltyPoints}
          </div>
          <div className="text-sm text-gray-600">Loyalty Points</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
          <div className="text-2xl font-bold text-green-600 mb-2">
            {currentUser.totalOrders}
          </div>
          <div className="text-sm text-gray-600">Total Orders</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
          <div className="text-2xl font-bold text-purple-600 mb-2">
            {currentUser.totalSpent.toLocaleString()} EGP
          </div>
          <div className="text-sm text-gray-600">Total Spent</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
          <div className="text-2xl font-bold text-gold-accent-600 mb-2">
            Gold
          </div>
          <div className="text-sm text-gray-600">Member Status</div>
        </div>
      </div>

      {/* Loyalty Program */}
      <div className="bg-gradient-to-r from-egyptian-blue-600 to-egyptian-blue-700 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Loyalty Program</h3>
          <div className="flex items-center space-x-1">
            <StarIcon className="w-5 h-5 text-gold-accent-400" />
            <span className="font-medium">Gold Member</span>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span>Progress to Platinum</span>
            <span>{currentUser.loyaltyPoints}/1000 points</span>
          </div>
          <div className="w-full bg-egyptian-blue-500 rounded-full h-2">
            <div 
              className="bg-gold-accent-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentUser.loyaltyPoints / 1000) * 100}%` }}
            />
          </div>
        </div>
        
        <p className="text-sm text-blue-100">
          Earn 1 point for every 10 EGP spent. Unlock exclusive benefits and early access to sales.
        </p>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <p className="font-medium">Order #12345 delivered</p>
              <p className="text-sm text-gray-600">Egyptian Cotton Luxury Sheet Set</p>
            </div>
            <div className="text-sm text-gray-500">2 days ago</div>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <p className="font-medium">Earned 25 loyalty points</p>
              <p className="text-sm text-gray-600">From order #12344</p>
            </div>
            <div className="text-sm text-gray-500">1 week ago</div>
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium">Welcome bonus applied</p>
              <p className="text-sm text-gray-600">100 loyalty points added</p>
            </div>
            <div className="text-sm text-gray-500">2 weeks ago</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountProfile;