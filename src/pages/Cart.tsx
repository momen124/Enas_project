import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MinusIcon, PlusIcon, TrashIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { useStore } from '../store/useStore';

const Cart: React.FC = () => {
  const { t } = useTranslation();
  const { cart, updateQuantity, removeFromCart, language, currency } = useStore();
  const isRTL = language === 'ar';

  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = subtotal > 1000 ? 0 : 50;
  const tax = subtotal * 0.14; // 14% VAT in Egypt
  const total = subtotal + shipping + tax;

  const formatPrice = (price: number) => {
    const symbol = currency === 'EGP' ? 'ج.م' : currency === 'USD' ? '$' : '€';
    const convertedPrice = currency === 'EGP' ? price : currency === 'USD' ? price / 30 : price / 32;
    return `${convertedPrice.toFixed(2)} ${symbol}`;
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center bg-[var(--card-bg-color)]">
        <div className="text-[var(--secondary-text-color)] mb-6">
          <ShoppingBagIcon className="w-24 h-24 mx-auto" />
        </div>
        <h2 className="text-2xl font-bold text-[var(--text-color)] mb-4">Your cart is empty</h2>
        <p className="text-[var(--secondary-text-color)] mb-8">
          Looks like you haven't added any products to your cart yet.
        </p>
        <Link
          to="/shop"
          className="bg-[var(--primary-color)] text-[var(--card-bg-color)] px-8 py-3 rounded-lg hover:bg-[var(--hover-bg-color)] transition-colors inline-block"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-[var(--card-bg-color)]">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--text-color)] mb-2">{t('shoppingCart')}</h1>
        <p className="text-[var(--secondary-text-color)]">
          {cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-[var(--card-bg-color)] rounded-lg shadow-sm border border-[var(--border-color)]">
            <div className="p-6">
              <div className="space-y-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 pb-6 border-b border-[var(--border-color)] last:border-b-0">
                    <div className="flex-shrink-0 w-24 h-24 overflow-hidden rounded-lg">
                      <img
                        src={item.color.image}
                        alt={isRTL ? item.product.nameAr : item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <Link to={`/product/${item.product.id}`}>
                        <h3 className="text-lg font-semibold text-[var(--text-color)] hover:text-[var(--primary-color)] transition-colors">
                          {isRTL ? item.product.nameAr : item.product.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-[var(--secondary-text-color)] mt-1">
                        {isRTL ? item.color.nameAr : item.color.name} • {item.size}
                      </p>
                      <p className="text-sm text-[var(--secondary-text-color)] mt-1">
                        {isRTL ? item.product.materialAr : item.product.material}
                      </p>
                      
                      {/* Mobile Price */}
                      <div className="mt-2 lg:hidden">
                        <p className="text-lg font-bold text-[var(--text-color)]">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-[var(--hover-bg-color)] rounded transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        <MinusIcon className="w-4 h-4" />
                      </button>
                      <span className="text-center min-w-[2rem] font-medium text-[var(--text-color)]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-[var(--hover-bg-color)] rounded transition-colors"
                      >
                        <PlusIcon className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Desktop Price */}
                    <div className="hidden lg:block text-right min-w-[100px]">
                      <p className="text-lg font-bold text-[var(--text-color)]">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                      {item.quantity > 1 && (
                        <p className="text-sm text-[var(--secondary-text-color)]">
                          {formatPrice(item.product.price)} each
                        </p>
                      )}
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                      title="Remove item"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Continue Shopping */}
          <div className="mt-6">
            <Link
              to="/shop"
              className="text-[var(--primary-color)] hover:text-[var(--hover-bg-color)] transition-colors inline-flex items-center"
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-[var(--card-bg-color)] rounded-lg shadow-sm border border-[var(--border-color)] p-6 sticky top-4">
            <h2 className="text-lg font-semibold text-[var(--text-color)] mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span>{t('subtotal')} ({cart.length} items)</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>{t('shipping')}</span>
                <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between">
                <span>{t('tax')} (VAT 14%)</span>
                <span>{formatPrice(tax)}</span>
              </div>
              <div className="border-t pt-3 border-[var(--border-color)]">
                <div className="flex justify-between text-lg font-semibold">
                  <span>{t('total')}</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </div>

            {/* Free Shipping Progress */}
            {subtotal < 1000 && (
              <div className="mb-6 p-4 bg-[var(--primary-color)] rounded-lg">
                <p className="text-sm text-[var(--card-bg-color)] mb-2">
                  Add {formatPrice(1000 - subtotal)} more for free shipping!
                </p>
                <div className="w-full bg-[var(--border-color)] rounded-full h-2">
                  <div 
                    className="bg-[var(--card-bg-color)] h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(subtotal / 1000) * 100}%` }}
                  />
                </div>
              </div>
            )}

            <Link
              to="/checkout"
              className="w-full bg-[var(--primary-color)] text-[var(--card-bg-color)] py-3 px-6 rounded-lg hover:bg-[var(--hover-bg-color)] transition-colors text-center font-semibold block"
            >
              {t('checkout')}
            </Link>

            {/* Trust Badges */}
            <div className="mt-6 space-y-3 text-sm text-[var(--secondary-text-color)]">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Secure SSL encryption</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
                <span>30-day return policy</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
                <span>24/7 customer support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;