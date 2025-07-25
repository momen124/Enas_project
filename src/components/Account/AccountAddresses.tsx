import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PlusIcon, PencilIcon, TrashIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';

const AccountAddresses: React.FC = () => {
  const { t } = useTranslation();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    type: 'home' as 'home' | 'work' | 'other',
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    governorate: '',
    postalCode: '',
    phone: '',
    isDefault: false,
  });

  // Mock addresses data
  const [addresses, setAddresses] = useState([
    {
      id: '1',
      type: 'home' as const,
      firstName: 'Ahmed',
      lastName: 'Hassan',
      street: '123 Nile Street, Zamalek',
      city: 'Cairo',
      governorate: 'Cairo',
      postalCode: '11211',
      phone: '+20 100 123 4567',
      isDefault: true,
    },
    {
      id: '2',
      type: 'work' as const,
      firstName: 'Ahmed',
      lastName: 'Hassan',
      street: '456 Tahrir Square',
      city: 'Cairo',
      governorate: 'Cairo',
      postalCode: '11511',
      phone: '+20 100 123 4567',
      isDefault: false,
    },
  ]);

  const resetForm = () => {
    setFormData({
      type: 'home',
      firstName: '',
      lastName: '',
      street: '',
      city: '',
      governorate: '',
      postalCode: '',
      phone: '',
      isDefault: false,
    });
    setShowForm(false);
    setEditingId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      // Update existing address
      setAddresses(prev => prev.map(addr =>
        addr.id === editingId
          ? { ...formData, id: editingId }
          : formData.isDefault
            ? { ...addr, isDefault: false }
            : addr
      ));
      toast.success('Address updated successfully');
    } else {
      // Add new address
      const newAddress = {
        ...formData,
        id: Date.now().toString(),
      };

      setAddresses(prev =>
        formData.isDefault
          ? [...prev.map(addr => ({ ...addr, isDefault: false })), newAddress]
          : [...prev, newAddress]
      );
      toast.success('Address added successfully');
    }

    resetForm();
  };

  const handleEdit = (address: any) => {
    setFormData(address);
    setEditingId(address.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      setAddresses(prev => prev.filter(addr => addr.id !== id));
      toast.success('Address deleted successfully');
    }
  };

  const handleSetDefault = (id: string) => {
    setAddresses(prev => prev.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
    toast.success('Default address updated');
  };

  const getTypeIcon = (type: string) => {
    return <MapPinIcon className="w-5 h-5 text-[var(--text-color)]" />;
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'home':
        return 'text-[var(--primary-color)] bg-[var(--hover-bg-color)]';
      case 'work':
        return 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20';
      case 'other':
        return 'text-purple-600 bg-purple-50 dark:text-purple-400 dark:bg-purple-900/20';
      default:
        return 'text-[var(--secondary-text-color)] bg-[var(--hover-bg-color)]';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[var(--card-bg-color)] rounded-lg shadow-sm border border-[var(--border-color)] p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-[var(--text-color)]">Delivery Addresses</h2>
          <button
            onClick={() => setShowForm(true)}
            className="bg-[var(--primary-color)] text-[var(--cream-white-500)] px-4 py-2 rounded-lg hover:bg-[var(--egyptian-blue-800)] transition-colors flex items-center space-x-2"
          >
            <PlusIcon className="w-4 h-4" />
            <span>Add New Address</span>
          </button>
        </div>
      </div>

      {/* Address Form */}
      {showForm && (
        <div className="bg-[var(--card-bg-color)] rounded-lg shadow-sm border border-[var(--border-color)] p-6">
          <h3 className="text-lg font-semibold text-[var(--text-color)] mb-4">
            {editingId ? 'Edit Address' : 'Add New Address'}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Address Type */}
            <div>
              <label className="block text-sm font-medium text-[var(--text-color)] mb-2">
                Address Type
              </label>
              <div className="flex space-x-4">
                {['home', 'work', 'other'].map((type) => (
                  <label key={type} className="flex items-center">
                    <input
                      type="radio"
                      name="type"
                      value={type}
                      checked={formData.type === type}
                      onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as any }))}
                      className="text-[var(--primary-color)] focus:ring-[var(--primary-color)]"
                    />
                    <span className="ml-2 capitalize text-[var(--text-color)]">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-color)] mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  className="w-full border border-[var(--border-color)] rounded-lg px-3 py-2 bg-[var(--card-bg-color)] text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-color)] mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                  className="w-full border border-[var(--border-color)] rounded-lg px-3 py-2 bg-[var(--card-bg-color)] text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                />
              </div>
            </div>

            {/* Address Fields */}
            <div>
              <label className="block text-sm font-medium text-[var(--text-color)] mb-1">
                Street Address *
              </label>
              <input
                type="text"
                required
                value={formData.street}
                onChange={(e) => setFormData(prev => ({ ...prev, street: e.target.value }))}
                className="w-full border border-[var(--border-color)] rounded-lg px-3 py-2 bg-[var(--card-bg-color)] text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-color)] mb-1">
                  City *
                </label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                  className="w-full border border-[var(--border-color)] rounded-lg px-3 py-2 bg-[var(--card-bg-color)] text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-color)] mb-1">
                  Governorate *
                </label>
                <select
                  required
                  value={formData.governorate}
                  onChange={(e) => setFormData(prev => ({ ...prev, governorate: e.target.value }))}
                  className="w-full border border-[var(--border-color)] rounded-lg px-3 py-2 bg-[var(--card-bg-color)] text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                >
                  <option value="">Select Governorate</option>
                  <option value="cairo">Cairo</option>
                  <option value="giza">Giza</option>
                  <option value="alexandria">Alexandria</option>
                  <option value="dakahlia">Dakahlia</option>
                  <option value="red-sea">Red Sea</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-color)] mb-1">
                  Postal Code
                </label>
                <input
                  type="text"
                  value={formData.postalCode}
                  onChange={(e) => setFormData(prev => ({ ...prev, postalCode: e.target.value }))}
                  className="w-full border border-[var(--border-color)] rounded-lg px-3 py-2 bg-[var(--card-bg-color)] text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--text-color)] mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full border border-[var(--border-color)] rounded-lg px-3 py-2 bg-[var(--card-bg-color)] text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
              />
            </div>

            {/* Default Address Checkbox */}
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isDefault}
                  onChange={(e) => setFormData(prev => ({ ...prev, isDefault: e.target.checked }))}
                  className="rounded border-[var(--border-color)] text-[var(--primary-color)] focus:ring-[var(--primary-color)]"
                />
                <span className="ml-2 text-sm text-[var(--text-color)]">Set as default address</span>
              </label>
            </div>

            {/* Form Actions */}
            <div className="flex space-x-4 pt-4">
              <button
                type="submit"
                className="bg-[var(--primary-color)] text-[var(--cream-white-500)] px-6 py-2 rounded-lg hover:bg-[var(--egyptian-blue-800)] transition-colors"
              >
                {editingId ? 'Update Address' : 'Add Address'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="border border-[var(--border-color)] text-[var(--text-color)] px-6 py-2 rounded-lg hover:bg-[var(--hover-bg-color)] transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Addresses List */}
      <div className="space-y-4">
        {addresses.map((address) => (
          <div key={address.id} className="bg-[var(--card-bg-color)] rounded-lg shadow-sm border border-[var(--border-color)] p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(address.type)}`}>
                    {getTypeIcon(address.type)}
                    <span className="capitalize">{address.type}</span>
                  </div>
                  {address.isDefault && (
                    <span className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 text-xs px-2 py-1 rounded-full font-medium">
                      Default
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <p className="font-medium text-[var(--text-color)]">
                    {address.firstName} {address.lastName}
                  </p>
                  <p className="text-[var(--secondary-text-color)]">{address.street}</p>
                  <p className="text-[var(--secondary-text-color)]">
                    {address.city}, {address.governorate} {address.postalCode}
                  </p>
                  <p className="text-[var(--secondary-text-color)]">{address.phone}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {!address.isDefault && (
                  <button
                    onClick={() => handleSetDefault(address.id)}
                    className="text-sm text-[var(--primary-color)] hover:text-[var(--egyptian-blue-800)] transition-colors"
                  >
                    Set Default
                  </button>
                )}
                <button
                  onClick={() => handleEdit(address)}
                  className="p-2 text-[var(--secondary-text-color)] hover:text-[var(--primary-color)] transition-colors"
                >
                  <PencilIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(address.id)}
                  className="p-2 text-[var(--secondary-text-color)] hover:text-red-600 dark:hover:text-red-400 transition-colors"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountAddresses;