import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HeartIcon, ShoppingBagIcon, TrashIcon } from '@heroicons/react/24/outline';
import { products } from '../data/mockData';
import { useStore } from '../store/useStore';
import { toast } from 'react-hot-toast';

const Wishlist: React.FC = () => {
  const { t } = useTranslation();
  const { wishlist, removeFromWishlist, addToCart, language, currency } = useStore();
  const isRTL = language === 'ar';

  const wishlistProducts = products.filter(product => wishlist.includes(product.id));

  const formatPrice = (price: number) => {
    const symbol = currency === 'EGP' ? 'ج.م' : currency === 'USD' ? '$' : '€';
    const convertedPrice = currency === 'EGP' ? price : currency === 'USD' ? price / 30 : price / 32;
    return `${convertedPrice.toFixed(2)} ${symbol}`;
  };

  const handleRemoveFromWishlist = (productId: string) => {
    removeFromWishlist(productId);
    toast.success(t('removedFromWishlist'));
  };

  const handleAddToCart = (product: any) => {
    if (product.stock > 0) {
      addToCart(product, product.sizes[0], product.colors[0], 1);
      toast.success(t('addedToCart'));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-card">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary mb-2">{t('myWishlist')}</h1>
        <p className="text-text-secondary">
          {wishlistProducts.length} {t(wishlistProducts.length === 1 ? 'item' : 'items')} {t('savedForLater')}
        </p>
      </div>

      {wishlistProducts.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-text-secondary mb-6">
            <HeartIcon className="w-24 h-24 mx-auto" />
          </div>
          <h2 className="text-2xl font-semibold text-text-primary mb-4">{t('wishlistEmpty')}</h2>
          <p className="text-text-secondary mb-8 max-w-md mx-auto">{t('wishlistEmptyMessage')}</p>
          <Link
            to="/shop"
            className="bg-primary text-card px-8 py-3 rounded-lg hover:bg-primary-600 transition-colors inline-block"
            aria-label={t('startShopping')}
          >
            {t('startShopping')}
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistProducts.map(product => (
            <div key={product.id} className="bg-card rounded-lg shadow-soft border border-border hover:shadow-medium transition-shadow duration-300">
              <div className="relative overflow-hidden rounded-t-lg">
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.images[0]}
                    alt={isRTL ? product.nameAr : product.name}
                    className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </Link>
                
                {/* Remove from Wishlist Button */}
                <button
                  onClick={() => handleRemoveFromWishlist(product.id)}
                  className={`absolute top-2 p-2 bg-card rounded-full shadow-soft hover:shadow-medium transition-all duration-200 hover:bg-card-hover ${isRTL ? 'left-2' : 'right-2'}`}
                  aria-label={t('removeFromWishlist')}
                >
                  <TrashIcon className="w-5 h-5 text-error-500" />
                </button>

                {/* Badges */}
                <div className={`absolute top-2 flex flex-col space-y-1 ${isRTL ? 'right-2' : 'left-2'}`}>
                  {product.newArrival && (
                    <span className="bg-success-500 text-card text-xs px-2 py-1 rounded-full">
                      {t('new')}
                    </span>
                  )}
                  {product.originalPrice && (
                    <span className="bg-error-500 text-card text-xs px-2 py-1 rounded-full">
                      {t('sale')}
                    </span>
                  )}
                </div>
              </div>

              <div className="p-4">
                <div className="mb-2">
                  <span className="text-sm text-text-secondary">
                    {isRTL ? product.categoryAr : product.category}
                  </span>
                </div>

                <Link to={`/product/${product.id}`}>
                  <h3 className="font-semibold text-text-primary mb-2 hover:text-primary transition-colors line-clamp-2">
                    {isRTL ? product.nameAr : product.name}
                  </h3>
                </Link>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-text-primary">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-text-secondary line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                  
                  {product.stock > 0 ? (
                    <span className="text-sm text-success-600 font-medium">{t('inStock')}</span>
                  ) : (
                    <span className="text-sm text-error-600 font-medium">{t('outOfStock')}</span>
                  )}
                </div>

                {/* Color Options Preview */}
                <div className={`flex space-x-2 mb-4 ${isRTL ? 'space-x-reverse' : ''}`}>
                  {product.colors.slice(0, 4).map((color, index) => (
                    <div
                      key={index}
                      className="w-6 h-6 rounded-full border-2 border-border"
                      style={{ backgroundColor: color.hex }}
                      title={isRTL ? color.nameAr : color.name}
                    />
                  ))}
                  {product.colors.length > 4 && (
                    <div className="w-6 h-6 rounded-full border-2 border-border bg-card flex items-center justify-center">
                      <span className="text-xs text-text-secondary">+{product.colors.length - 4}</span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock === 0}
                    className="flex-1 bg-primary text-card py-2 px-4 rounded-lg hover:bg-primary-600 transition-colors disabled:bg-border disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    aria-label={t('addToCart')}
                  >
                    <ShoppingBagIcon className="w-4 h-4" />
                    <span>{t('addToCart')}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Recommendations */}
      {wishlistProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">{t('youMightAlsoLike')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products
              .filter(product => !wishlist.includes(product.id))
              .slice(0, 4)
              .map(product => (
                <div key={product.id} className="bg-card rounded-lg shadow-soft border border-border">
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={product.images[0]}
                      alt={isRTL ? product.nameAr : product.name}
                      className="w-full h-48 object-cover rounded-t-lg hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                  <div className="p-4">
                    <h3 className="font-semibold text-text-primary mb-2 line-clamp-2">
                      {isRTL ? product.nameAr : product.name}
                    </h3>
                    <p className="text-lg font-bold text-text-primary">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Wishlist;