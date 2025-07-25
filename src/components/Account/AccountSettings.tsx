import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  GlobeAltIcon, 
  CurrencyDollarIcon,
  BellIcon,
  ShieldCheckIcon,
  EyeIcon,
  EyeSlashIcon
} from '@heroicons/react/24/outline';
import { useStore } from '../../store/useStore';
import { toast } from 'react-hot-toast';

const AccountSettings: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { language, setLanguage, currency, setCurrency } = useStore();
  
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: true,
    newsletter: false,
    smsAlerts: true,
  });

  const [privacy, setPrivacy] = useState({
    profileVisible: false,
    shareData: false,
    trackingCookies: true,
  });

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const handleLanguageChange = (newLang: 'en' | 'ar') => {
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
    document.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.body.className = newLang === 'ar' ? 'font-arabic' : 'font-english';
    toast.success(`Language changed to ${newLang === 'ar' ? 'Arabic' : 'English'}`);
  };

  const handleCurrencyChange = (newCurrency: 'EGP' | 'USD' | 'EUR') => {
    setCurrency(newCurrency);
    toast.success(`Currency changed to ${newCurrency}`);
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
    toast.success('Notification preferences updated');
  };

  const handlePrivacyChange = (key: string, value: boolean) => {
    setPrivacy(prev => ({ ...prev, [key]: value }));
    toast.success('Privacy settings updated');
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.new !== passwordData.confirm) {
      toast.error('New passwords do not match');
      return;
    }
    if (passwordData.new.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }
    
    // Simulate password change
    toast.success('Password updated successfully');
    setPasswordData({ current: '', new: '', confirm: '' });
    setShowPasswordForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Language & Region */}
      <div className="bg-[var(--card-bg-color)] rounded-lg shadow-sm border border-[var(--border-color)] p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center text-[var(--text-color)]">
          <GlobeAltIcon className="w-5 h-5 mr-2 text-[var(--secondary-text-color)]" />
          Language & Region
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--text-color)] mb-2">
              Language
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="language"
                  value="en"
                  checked={language === 'en'}
                  onChange={() => handleLanguageChange('en')}
                  className="text-[var(--primary-color)] focus:ring-[var(--primary-color)]"
                />
                <span className="ml-2 text-[var(--text-color)]">English</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="language"
                  value="ar"
                  checked={language === 'ar'}
                  onChange={() => handleLanguageChange('ar')}
                  className="text-[var(--primary-color)] focus:ring-[var(--primary-color)]"
                />
                <span className="ml-2 text-[var(--text-color)]">العربية (Arabic)</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text-color)] mb-2">
              Currency
            </label>
            <select
              value={currency}
              onChange={(e) => handleCurrencyChange(e.target.value as any)}
              className="border border-[var(--border-color)] rounded-lg px-3 py-2 bg-[var(--card-bg-color)] text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
            >
              <option value="EGP">Egyptian Pound (EGP)</option>
              <option value="USD">US Dollar (USD)</option>
              <option value="EUR">Euro (EUR)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="bg-[var(--card-bg-color)] rounded-lg shadow-sm border border-[var(--border-color)] p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center text-[var(--text-color)]">
          <BellIcon className="w-5 h-5 mr-2 text-[var(--secondary-text-color)]" />
          Notification Preferences
        </h3>
        
        <div className="space-y-4">
          {Object.entries(notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <label className="font-medium text-[var(--text-color)] capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                <p className="text-sm text-[var(--secondary-text-color)]">
                  {key === 'orderUpdates' && 'Get notified about your order status'}
                  {key === 'promotions' && 'Receive special offers and discounts'}
                  {key === 'newsletter' && 'Weekly newsletter with new products'}
                  {key === 'smsAlerts' && 'SMS notifications for important updates'}
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => handleNotificationChange(key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[var(--hover-bg-color)] rounded-full peer peer-focus:ring-4 peer-focus:ring-[var(--primary-color)]/50 peer-checked:after:translate-x-full peer-checked:after:border-[var(--border-color)] after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-[var(--card-bg-color)] after:border after:border-[var(--border-color)] after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--primary-color)]"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="bg-[var(--card-bg-color)] rounded-lg shadow-sm border border-[var(--border-color)] p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center text-[var(--text-color)]">
          <ShieldCheckIcon className="w-5 h-5 mr-2 text-[var(--secondary-text-color)]" />
          Privacy Settings
        </h3>
        
        <div className="space-y-4">
          {Object.entries(privacy).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <label className="font-medium text-[var(--text-color)] capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                <p className="text-sm text-[var(--secondary-text-color)]">
                  {key === 'profileVisible' && 'Make your profile visible to other users'}
                  {key === 'shareData' && 'Share anonymized data for product recommendations'}
                  {key === 'trackingCookies' && 'Allow cookies for personalized experience'}
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => handlePrivacyChange(key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[var(--hover-bg-color)] rounded-full peer peer-focus:ring-4 peer-focus:ring-[var(--primary-color)]/50 peer-checked:after:translate-x-full peer-checked:after:border-[var(--border-color)] after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-[var(--card-bg-color)] after:border after:border-[var(--border-color)] after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--primary-color)]"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Security */}
      <div className="bg-[var(--card-bg-color)] rounded-lg shadow-sm border border-[var(--border-color)] p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center text-[var(--text-color)]">
          <ShieldCheckIcon className="w-5 h-5 mr-2 text-[var(--secondary-text-color)]" />
          Security
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-[var(--text-color)]">Password</h4>
              <p className="text-sm text-[var(--secondary-text-color)]">Change your account password</p>
            </div>
            <button
              onClick={() => setShowPasswordForm(!showPasswordForm)}
              className="text-[var(--primary-color)] hover:text-[var(--egyptian-blue-800)] transition-colors"
            >
              Change Password
            </button>
          </div>

          {showPasswordForm && (
            <form onSubmit={handlePasswordSubmit} className="space-y-4 p-4 bg-[var(--hover-bg-color)] rounded-lg">
              <div>
                <label className="block text-sm font-medium text-[var(--text-color)] mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  required
                  value={passwordData.current}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, current: e.target.value }))}
                  className="w-full border border-[var(--border-color)] rounded-lg px-3 py-2 bg-[var(--card-bg-color)] text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[var(--text-color)] mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={passwordData.new}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, new: e.target.value }))}
                  className="w-full border border-[var(--border-color)] rounded-lg px-3 py-2 bg-[var(--card-bg-color)] text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[var(--text-color)] mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  required
                  value={passwordData.confirm}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, confirm: e.target.value }))}
                  className="w-full border border-[var(--border-color)] rounded-lg px-3 py-2 bg-[var(--card-bg-color)] text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                />
              </div>
              
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="bg-[var(--primary-color)] text-[var(--cream-white-500)] px-4 py-2 rounded-lg hover:bg-[var(--egyptian-blue-800)] transition-colors"
                >
                  Update Password
                </button>
                <button
                  type="button"
                  onClick={() => setShowPasswordForm(false)}
                  className="border border-[var(--border-color)] text-[var(--text-color)] px-4 py-2 rounded-lg hover:bg-[var(--hover-bg-color)] transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-[var(--border-color)]">
            <div>
              <h4 className="font-medium text-[var(--text-color)]">Two-Factor Authentication</h4>
              <p className="text-sm text-[var(--secondary-text-color)]">Add an extra layer of security to your account</p>
            </div>
            <button className="text-[var(--primary-color)] hover:text-[var(--egyptian-blue-800)] transition-colors">
              Enable 2FA
            </button>
          </div>
        </div>
      </div>

      {/* Account Actions */}
      <div className="bg-[var(--card-bg-color)] rounded-lg shadow-sm border border-[var(--border-color)] p-6">
        <h3 className="text-lg font-semibold text-[var(--text-color)] mb-4">Account Actions</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-[var(--text-color)]">Export Data</h4>
              <p className="text-sm text-[var(--secondary-text-color)]">Download a copy of your account data</p>
            </div>
            <button className="text-[var(--primary-color)] hover:text-[var(--egyptian-blue-800)] transition-colors">
              Download Data
            </button>
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-[var(--border-color)]">
            <div>
              <h4 className="font-medium text-red-600 dark:text-red-400">Delete Account</h4>
              <p className="text-sm text-[var(--secondary-text-color)]">Permanently delete your account and all data</p>
            </div>
            <button className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
