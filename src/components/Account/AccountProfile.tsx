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
      <div className="bg-[var(--card-bg-color)] rounded-lg shadow-sm border border-[var(--border-color)] p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-[var(--text-color)]">Profile Information</h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center space-x-2 text-[var(--primary-color)] hover:text-[var(--egyptian-blue-800)]"
          >
            <PencilIcon className="w-4 h-4" />
            <span>{isEditing ? 'Cancel' : 'Edit'}</span>
          </button>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-color)] mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  className="w-full border border-[var(--border-color)] rounded-lg px-3 py-2 bg-[var(--card-bg-color)] text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-color)] mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                  className="w-full border border-[var(--border-color)] rounded-lg px-3 py-2 bg-[var(--card-bg-color)] text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--text-color)] mb-1">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full border border-[var(--border-color)] rounded-lg px-3 py-2 bg-[var(--card-bg-color)] text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--text-color)] mb-1">
                Phone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full border border-[var(--border-color)] rounded-lg px-3 py-2 bg-[var(--card-bg-color)] text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-[var(--primary-color)] text-[var(--cream-white-500)] px-6 py-2 rounded-lg hover:bg-[var(--egyptian-blue-800)] transition-colors"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="border border-[var(--border-color)] text-[var(--text-color)] px-6 py-2 rounded-lg hover:bg-[var(--hover-bg-color)] transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-[var(--secondary-text-color)]">First Name</label>
                <p className="font-medium text-[var(--text-color)]">{currentUser.firstName}</p>
              </div>
              <div>
                <label className="text-sm text-[var(--secondary-text-color)]">Last Name</label>
                <p className="font-medium text-[var(--text-color)]">{currentUser.lastName}</p>
              </div>
            </div>
            <div>
              <label className="text-sm text-[var(--secondary-text-color)]">Email</label>
              <p className="font-medium text-[var(--text-color)]">{currentUser.email}</p>
            </div>
            <div>
              <label className="text-sm text-[var(--secondary-text-color)]">Phone</label>
              <p className="font-medium text-[var(--text-color)]">{currentUser.phone}</p>
            </div>
          </div>
        )}
      </div>

      {/* Account Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[var(--card-bg-color)] rounded-lg shadow-sm border border-[var(--border-color)] p-6 text-center">
          <div className="text-2xl font-bold text-[var(--primary-color)] mb-2">
            {currentUser.loyaltyPoints}
          </div>
          <div className="text-sm text-[var(--secondary-text-color)]">Loyalty Points</div>
        </div>
        <div className="bg-[var(--card-bg-color)] rounded-lg shadow-sm border border-[var(--border-color)] p-6 text-center">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
            {currentUser.totalOrders}
          </div>
          <div className="text-sm text-[var(--secondary-text-color)]">Total Orders</div>
        </div>
        <div className="bg-[var(--card-bg-color)] rounded-lg shadow-sm border border-[var(--border-color)] p-6 text-center">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">
            {currentUser.totalSpent.toLocaleString()} EGP
          </div>
          <div className="text-sm text-[var(--secondary-text-color)]">Total Spent</div>
        </div>
        <div className="bg-[var(--card-bg-color)] rounded-lg shadow-sm border border-[var(--border-color)] p-6 text-center">
          <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
            Gold
          </div>
          <div className="text-sm text-[var(--secondary-text-color)]">Member Status</div>
        </div>
      </div>

      {/* Loyalty Program */}
      <div className="bg-[var(--primary-color)] rounded-lg p-6 text-[var(--cream-white-500)]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Loyalty Program</h3>
          <div className="flex items-center space-x-1">
            <StarIcon className="w-5 h-5 text-yellow-400 dark:text-yellow-300" />
            <span className="font-medium">Gold Member</span>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span>Progress to Platinum</span>
            <span>{currentUser.loyaltyPoints}/1000 points</span>
          </div>
          <div className="w-full bg-[var(--egyptian-blue-800)] rounded-full h-2">
            <div 
              className="bg-yellow-400 dark:bg-yellow-300 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentUser.loyaltyPoints / 1000) * 100}%` }}
            />
          </div>
        </div>
        
        <p className="text-sm text-[var(--cream-white-500)]/80">
          Earn 1 point for every 10 EGP spent. Unlock exclusive benefits and early access to sales.
        </p>
      </div>

      {/* Recent Activity */}
      <div className="bg-[var(--card-bg-color)] rounded-lg shadow-sm border border-[var(--border-color)] p-6">
        <h3 className="text-xl font-semibold text-[var(--text-color)] mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-[var(--border-color)]">
            <div>
              <p className="font-medium text-[var(--text-color)]">Order #12345 delivered</p>
              <p className="text-sm text-[var(--secondary-text-color)]">Egyptian Cotton Luxury Sheet Set</p>
            </div>
            <div className="text-sm text-[var(--secondary-text-color)]">2 days ago</div>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-[var(--border-color)]">
            <div>
              <p className="font-medium text-[var(--text-color)]">Earned 25 loyalty points</p>
              <p className="text-sm text-[var(--secondary-text-color)]">From order #12344</p>
            </div>
            <div className="text-sm text-[var(--secondary-text-color)]">1 week ago</div>
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium text-[var(--text-color)]">Welcome bonus applied</p>
              <p className="text-sm text-[var(--secondary-text-color)]">100 loyalty points added</p>
            </div>
            <div className="text-sm text-[var(--secondary-text-color)]">2 weeks ago</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountProfile;