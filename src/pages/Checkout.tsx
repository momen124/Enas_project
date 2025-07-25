import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CreditCardIcon, TruckIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { useStore } from '../store/useStore';
import { toast } from 'react-hot-toast';

const Checkout: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { cart, clearCart, language, currency } = useStore();

  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Review
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    governorate: '',
    postalCode: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardInfo, setCardInfo] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
  });

  const isRTL = language === 'ar';

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = subtotal > 1000 ? 0 : 50;
  const tax = subtotal * 0.14; // 14% VAT in Egypt
  const total = subtotal + shipping + tax;

  const formatPrice = (price: number) => {
    const symbol = currency === 'EGP' ? 'ج.م' : currency === 'USD' ? '$' : '€';
    const convertedPrice = currency === 'EGP' ? price : currency === 'USD' ? price / 30 : price / 32;
    return `${convertedPrice.toFixed(2)} ${symbol}`;
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(shippingInfo).every(value => value.trim() !== '')) {
      setStep(2);
    } else {
      toast.error('Please fill in all shipping information');
    }
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentMethod === 'cod') {
      setStep(3);
    } else if (Object.values(cardInfo).every(value => value.trim() !== '')) {
      setStep(3);
    } else {
      toast.error('Please fill in all payment information');
    }
  };

  const handleOrderSubmit = async () => {
    try {
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      clearCart();
      toast.success('Order placed successfully!');
      navigate('/account/orders');
    } catch (error) {
      toast.error('Failed to place order. Please try again.');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-[var(--text-color)] mb-4">Your cart is empty</h2>
        <p className="text-[var(--secondary-text-color)] mb-8">Add some products to continue with checkout</p>
        <button
          onClick={() => navigate('/shop')}
          className="bg-[var(--primary-color)] text-[var(--cream-white-500)] px-6 py-3 rounded-lg hover:bg-[var(--egyptian-blue-800)] transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--text-color)] mb-4">Checkout</h1>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          {[1, 2, 3].map((stepNumber) => (
            <React.Fragment key={stepNumber}>
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  step >= stepNumber
                    ? 'bg-[var(--primary-color)] text-[var(--cream-white-500)]'
                    : 'bg-[var(--hover-bg-color)] text-[var(--secondary-text-color)]'
                }`}
              >
                {stepNumber}
              </div>
              {stepNumber < 3 && (
                <div
                  className={`w-16 h-1 ${
                    step > stepNumber ? 'bg-[var(--primary-color)]' : 'bg-[var(--border-color)]'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {step === 1 && (
            <div className="bg-[var(--card-bg-color)] rounded-lg shadow-sm border border-[var(--border-color)] p-6">
              <h2 className="text-xl font-semibold text-[var(--text-color)] mb-6 flex items-center">
                <TruckIcon className="w-6 h-6 mr-2 text-[var(--text-color)]" />
                Shipping Information
              </h2>

              <form onSubmit={handleShippingSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-color)] mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingInfo.firstName}
                      onChange={(e) => setShippingInfo(prev => ({ ...prev, firstName: e.target.value }))}
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
                      value={shippingInfo.lastName}
                      onChange={(e) => setShippingInfo(prev => ({ ...prev, lastName: e.target.value }))}
                      className="w-full border border-[var(--border-color)] rounded-lg px-3 py-2 bg-[var(--card-bg-color)] text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-color)] mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={shippingInfo.email}
                      onChange={(e) => setShippingInfo(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full border border-[var(--border-color)] rounded-lg px-3 py-2 bg-[var(--card-bg-color)] text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-color)] mb-1">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={shippingInfo.phone}
                      onChange={(e) => setShippingInfo(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full border border-[var(--border-color)] rounded-lg px-3 py-2 bg-[var(--card-bg-color)] text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-color)] mb-1">
                    Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.address}
                    onChange={(e) => setShippingInfo(prev => ({ ...prev, address: e.target.value }))}
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
                      value={shippingInfo.city}
                      onChange={(e) => setShippingInfo(prev => ({ ...prev, city: e.target.value }))}
                      className="w-full border border-[var(--border-color)] rounded-lg px-3 py-2 bg-[var(--card-bg-color)] text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-color)] mb-1">
                      Governorate *
                    </label>
                    <select
                      required
                      value={shippingInfo.governorate}
                      onChange={(e) => setShippingInfo(prev => ({ ...prev, governorate: e.target.value }))}
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
                      value={shippingInfo.postalCode}
                      onChange={(e) => setShippingInfo(prev => ({ ...prev, postalCode: e.target.value }))}
                      className="w-full border border-[var(--border-color)] rounded-lg px-3 py-2 bg-[var(--card-bg-color)] text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[var(--primary-color)] text-[var(--cream-white-500)] py-3 px-6 rounded-lg hover:bg-[var(--egyptian-blue-800)] transition-colors mt-6"
                >
                  Continue to Payment
                </button>
              </form>
            </div>
          )}

          {step === 2 && (
            <div className="bg-[var(--card-bg-color)] rounded-lg shadow-sm border border-[var(--border-color)] p-6">
              <h2 className="text-xl font-semibold text-[var(--text-color)] mb-6 flex items-center">
                <CreditCardIcon className="w-6 h-6 mr-2 text-[var(--text-color)]" />
                Payment Method
              </h2>

              <div className="space-y-4 mb-6">
                {/* Payment Method Options */}
                <div className="space-y-3">
                  <label className="flex items-center p-4 border border-[var(--border-color)] rounded-lg cursor-pointer hover:bg-[var(--hover-bg-color)]">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-[var(--primary-color)] focus:ring-[var(--primary-color)]"
                    />
                    <div className="ml-3">
                      <div className="font-medium text-[var(--text-color)]">Credit/Debit Card</div>
                      <div className="text-sm text-[var(--secondary-text-color)]">Visa, Mastercard</div>
                    </div>
                  </label>

                  <label className="flex items-center p-4 border border-[var(--border-color)] rounded-lg cursor-pointer hover:bg-[var(--hover-bg-color)]">
                    <input
                      type="radio"
                      name="payment"
                      value="fawry"
                      checked={paymentMethod === 'fawry'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-[var(--primary-color)] focus:ring-[var(--primary-color)]"
                    />
                    <div className="ml-3">
                      <div className="font-medium text-[var(--text-color)]">Fawry</div>
                      <div className="text-sm text-[var(--secondary-text-color)]">Pay at Fawry locations</div>
                    </div>
                  </label>

                  <label className="flex items-center p-4 border border-[var(--border-color)] rounded-lg cursor-pointer hover:bg-[var(--hover-bg-color)]">
                    <input
                      type="radio"
                      name="payment"
                      value="vodafone"
                      checked={paymentMethod === 'vodafone'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-[var(--primary-color)] focus:ring-[var(--primary-color)]"
                    />
                    <div className="ml-3">
                      <div className="font-medium text-[var(--text-color)]">Vodafone Cash</div>
                      <div className="text-sm text-[var(--secondary-text-color)]">Mobile wallet payment</div>
                    </div>
                  </label>

                  <label className="flex items-center p-4 border border-[var(--border-color)] rounded-lg cursor-pointer hover:bg-[var(--hover-bg-color)]">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-[var(--primary-color)] focus:ring-[var(--primary-color)]"
                    />
                    <div className="ml-3">
                      <div className="font-medium text-[var(--text-color)]">Cash on Delivery</div>
                      <div className="text-sm text-[var(--secondary-text-color)]">Pay when you receive your order</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Card Details Form */}
              {paymentMethod === 'card' && (
                <form onSubmit={handlePaymentSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-color)] mb-1">
                      Card Number *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="1234 5678 9012 3456"
                      value={cardInfo.number}
                      onChange={(e) => setCardInfo(prev => ({ ...prev, number: e.target.value }))}
                      className="w-full border border-[var(--border-color)] rounded-lg px-3 py-2 bg-[var(--card-bg-color)] text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[var(--text-color)] mb-1">
                        Expiry Date *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="MM/YY"
                        value={cardInfo.expiry}
                        onChange={(e) => setCardInfo(prev => ({ ...prev, expiry: e.target.value }))}
                        className="w-full border border-[var(--border-color)] rounded-lg px-3 py-2 bg-[var(--card-bg-color)] text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--text-color)] mb-1">
                        CVV *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="123"
                        value={cardInfo.cvv}
                        onChange={(e) => setCardInfo(prev => ({ ...prev, cvv: e.target.value }))}
                        className="w-full border border-[var(--border-color)] rounded-lg px-3 py-2 bg-[var(--card-bg-color)] text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--text-color)] mb-1">
                      Cardholder Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={cardInfo.name}
                      onChange={(e) => setCardInfo(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full border border-[var(--border-color)] rounded-lg px-3 py-2 bg-[var(--card-bg-color)] text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[var(--primary-color)] text-[var(--cream-white-500)] py-3 px-6 rounded-lg hover:bg-[var(--egyptian-blue-800)] transition-colors mt-6"
                  >
                    Review Order
                  </button>
                </form>
              )}

              {paymentMethod !== 'card' && (
                <button
                  onClick={() => setStep(3)}
                  className="w-full bg-[var(--primary-color)] text-[var(--cream-white-500)] py-3 px-6 rounded-lg hover:bg-[var(--egyptian-blue-800)] transition-colors"
                >
                  Review Order
                </button>
              )}

              <button
                onClick={() => setStep(1)}
                className="w-full border border-[var(--border-color)] text-[var(--text-color)] py-3 px-6 rounded-lg hover:bg-[var(--hover-bg-color)] transition-colors mt-3"
              >
                Back to Shipping
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="bg-[var(--card-bg-color)] rounded-lg shadow-sm border border-[var(--border-color)] p-6">
              <h2 className="text-xl font-semibold text-[var(--text-color)] mb-6 flex items-center">
                <ShieldCheckIcon className="w-6 h-6 mr-2 text-[var(--text-color)]" />
                Review Order
              </h2>

              {/* Order Items */}
              <div className="space-y-4 mb-6">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center space-x-4 py-4 border-b border-[var(--border-color)]">
                    <img
                      src={item.color.image}
                      alt={isRTL ? item.product.nameAr : item.product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-[var(--text-color)]">
                        {isRTL ? item.product.nameAr : item.product.name}
                      </h4>
                      <p className="text-sm text-[var(--secondary-text-color)]">
                        {isRTL ? item.color.nameAr : item.color.name} • {item.size}
                      </p>
                      <p className="text-sm text-[var(--secondary-text-color)]">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-[var(--text-color)]">{formatPrice(item.product.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Shipping & Payment Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-medium text-[var(--text-color)] mb-2">Shipping Address</h4>
                  <div className="text-sm text-[var(--secondary-text-color)] space-y-1">
                    <p>{shippingInfo.firstName} {shippingInfo.lastName}</p>
                    <p>{shippingInfo.address}</p>
                    <p>{shippingInfo.city}, {shippingInfo.governorate}</p>
                    <p>{shippingInfo.phone}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-[var(--text-color)] mb-2">Payment Method</h4>
                  <p className="text-sm text-[var(--secondary-text-color)] capitalize">
                    {paymentMethod === 'cod' ? 'Cash on Delivery' : 
                     paymentMethod === 'fawry' ? 'Fawry' :
                     paymentMethod === 'vodafone' ? 'Vodafone Cash' : 'Credit Card'}
                  </p>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleOrderSubmit}
                  className="flex-1 bg-[var(--primary-color)] text-[var(--cream-white-500)] py-3 px-6 rounded-lg hover:bg-[var(--egyptian-blue-800)] transition-colors"
                >
                  Place Order
                </button>
                <button
                  onClick={() => setStep(2)}
                  className="border border-[var(--border-color)] text-[var(--text-color)] py-3 px-6 rounded-lg hover:bg-[var(--hover-bg-color)] transition-colors"
                >
                  Back
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-[var(--card-bg-color)] rounded-lg shadow-sm border border-[var(--border-color)] p-6 sticky top-4">
            <h3 className="text-lg font-semibold text-[var(--text-color)] mb-4">Order Summary</h3>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-[var(--text-color)]">
                <span>Subtotal ({cart.length} items)</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-[var(--text-color)]">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between text-[var(--text-color)]">
                <span>Tax (VAT 14%)</span>
                <span>{formatPrice(tax)}</span>
              </div>
              <div className="border-t border-[var(--border-color)] pt-3">
                <div className="flex justify-between text-lg font-semibold text-[var(--text-color)]">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="space-y-3 text-sm text-[var(--secondary-text-color)]">
              <div className="flex items-center space-x-2">
                <ShieldCheckIcon className="w-4 h-4 text-green-600 dark:text-green-400" />
                <span>Secure SSL encryption</span>
              </div>
              <div className="flex items-center space-x-2">
                <TruckIcon className="w-4 h-4 text-[var(--primary-color)]" />
                <span>Free shipping over 1000 EGP</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;