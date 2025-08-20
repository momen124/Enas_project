import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { toast } from 'react-hot-toast';

const CartSidebar: React.FC = () => {
  const { t } = useTranslation();
  const { cart, cartOpen, setCartOpen, updateQuantity, removeFromCart, clearCart, language, currency } = useStore();
  const isRTL = language === 'ar';

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 1000 ? 0 : 50;
  const tax = subtotal * 0.14; // 14% VAT in Egypt
  const total = subtotal + shipping + tax;

  const formatPrice = (price: number) => {
    const symbol = currency === 'EGP' ? 'ج.م' : currency === 'USD' ? '$' : '€';
    const convertedPrice = currency === 'EGP' ? price : currency === 'USD' ? price / 30 : price / 32;
    return `${convertedPrice.toFixed(2)} ${symbol}`;
  };

  const handleClearCart = () => {
    clearCart();
    toast.success(t('cartCleared', { defaultValue: 'Cart cleared successfully' }));
  };

  const handleUpdateQuantity = (id: string, quantity: number, stock: number) => {
    if (quantity <= 0 || quantity > stock) {
      toast.error(
        quantity <= 0
          ? t('minQuantity', { defaultValue: 'Quantity cannot be less than 1' })
          : t('maxQuantity', { defaultValue: 'Quantity exceeds available stock' })
      );
      return;
    }
    updateQuantity(id, quantity);
  };

  return (
    <Transition.Root show={cartOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setCartOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-neutral-700 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className={`pointer-events-none fixed inset-y-0 flex max-w-lg ${isRTL ? 'left-0' : 'right-0'}`}>
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500"
                enterFrom={isRTL ? '-translate-x-full' : 'translate-x-full'}
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500"
                leaveFrom="translate-x-0"
                leaveTo={isRTL ? '-translate-x-full' : 'translate-x-full'}
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-lg animate-fade-in">
                  <div className="flex h-full flex-col overflow-y-auto bg-card shadow-xl scroll-smooth">
                    <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6">
                      <div className="flex items-center justify-between">
                        <Dialog.Title className="text-xl font-semibold text-text-primary">
                          {t('shoppingCart')}
                        </Dialog.Title>
                        <div className={`flex items-center gap-4 ${isRTL ? 'mr-4' : 'ml-4'}`}>
                          {cart.length > 0 && (
                            <button
                              type="button"
                              className="text-sm font-medium text-error-500 hover:text-error-600 transition-colors"
                              onClick={handleClearCart}
                              aria-label={t('clearCart', { defaultValue: 'Clear all items from cart' })}
                            >
                              {t('clearCart', { defaultValue: 'Clear All' })}
                            </button>
                          )}
                          <button
                            type="button"
                            className="p-2 text-text-secondary hover:text-primary rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
                            onClick={() => setCartOpen(false)}
                            aria-label={t('closeCart', { defaultValue: 'Close cart' })}
                          >
                            <XMarkIcon className="h-6 w-6" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-6">
                        {cart.length === 0 ? (
                          <div className="text-center py-8">
                            <p className="text-text-secondary mb-4">{t('cartEmpty')}</p>
                            <Link
                              to="/shop"
                              onClick={() => setCartOpen(false)}
                              className="inline-block bg-primary text-card px-6 py-2 rounded-lg font-semibold hover:bg-primary-600 transition-colors shadow-medium hover:shadow-glow"
                              aria-label={t('continueShopping')}
                            >
                              {t('continueShopping')}
                            </Link>
                          </div>
                        ) : (
                          <div className="flow-root">
                            <ul role="listbox" className="-my-6 divide-y divide-border">
                              {cart.map((item) => (
                                <li key={item.id} className="flex py-4 sm:py-6">
                                  <div className="h-20 w-20 sm:h-24 sm:w-24 flex-shrink-0 overflow-hidden rounded-md border border-border">
                                    <img
                                      src={item.color.image}
                                      alt={isRTL ? item.product.nameAr : item.product.name}
                                      className="h-full w-full object-cover object-center"
                                      loading="lazy"
                                    />
                                  </div>

                                  <div className={`flex flex-1 flex-col ${isRTL ? 'mr-4' : 'ml-4'}`}>
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-text-primary">
                                        <h3>
                                          <Link
                                            to={`/product/${item.product.id}`}
                                            onClick={() => setCartOpen(false)}
                                            aria-label={isRTL ? item.product.nameAr : item.product.name}
                                          >
                                            {isRTL ? item.product.nameAr : item.product.name}
                                          </Link>
                                        </h3>
                                        <p className={`min-w-[4rem] text-right ${isRTL ? 'mr-4' : 'ml-4'}`}>
                                          {formatPrice(item.product.price * item.quantity)}
                                        </p>
                                      </div>
                                      <p className="mt-1 text-sm text-text-secondary">
                                        {isRTL ? item.color.nameAr : item.color.name} • {item.size}
                                      </p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <div className="flex items-center gap-2">
                                        <button
                                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1, item.product.stock)}
                                          className="p-2 bg-card hover:bg-hover-bg-color rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                                          aria-label={t('decreaseQuantity', { defaultValue: 'Decrease quantity' })}
                                        >
                                          <MinusIcon className="w-4 h-4 text-text-primary" />
                                        </button>
                                        <span className="min-w-[2.5rem] text-center text-text-primary font-medium">
                                          {item.quantity}
                                        </span>
                                        <button
                                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1, item.product.stock)}
                                          className="p-2 bg-card hover:bg-hover-bg-color rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                                          aria-label={t('increaseQuantity', { defaultValue: 'Increase quantity' })}
                                        >
                                          <PlusIcon className="w-4 h-4 text-text-primary" />
                                        </button>
                                      </div>
                                      <button
                                        type="button"
                                        onClick={() => removeFromCart(item.id)}
                                        className="font-medium text-error-500 hover:text-error-600 transition-colors focus:outline-none focus:ring-2 focus:ring-error-500"
                                        aria-label={t('removeItem', { defaultValue: 'Remove item from cart' })}
                                      >
                                        <TrashIcon className="w-5 h-5" />
                                      </button>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>

                    {cart.length > 0 && (
                      <div className="border-t border-border px-4 sm:px-6 py-6">
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between text-text-primary">
                            <span>{t('subtotal')}</span>
                            <span>{formatPrice(subtotal)}</span>
                          </div>
                          <div className="flex justify-between text-text-primary">
                            <span>{t('shipping')}</span>
                            <span>{shipping === 0 ? t('free', { defaultValue: 'Free' }) : formatPrice(shipping)}</span>
                          </div>
                          <div className="flex justify-between text-text-primary">
                            <span>{t('tax')}</span>
                            <span>{formatPrice(tax)}</span>
                          </div>
                          <div className="flex justify-between text-base font-semibold text-text-primary border-t border-border pt-3">
                            <span>{t('total')}</span>
                            <span>{formatPrice(total)}</span>
                          </div>
                        </div>
                        <div className="mt-6">
                          <Link
                            to="/checkout"
                            onClick={() => setCartOpen(false)}
                            className="block text-center bg-primary text-card px-6 py-3 rounded-lg font-semibold shadow-medium hover:bg-primary-600 hover:shadow-glow transition-all duration-300"
                            aria-label={t('checkout')}
                          >
                            {t('checkout')}
                          </Link>
                        </div>
                        <div className="mt-4 flex justify-center text-sm text-text-secondary">
                          <p>
                            {t('or', { defaultValue: 'or' })}{' '}
                            <button
                              type="button"
                              className="font-medium text-primary hover:text-primary-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                              onClick={() => setCartOpen(false)}
                              aria-label={t('continueShopping')}
                            >
                              {t('continueShopping')}
                            </button>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default CartSidebar;