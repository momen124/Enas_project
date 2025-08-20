import React from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon, StarIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { Product } from '../../types';
import { useStore } from '../../store/useStore';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-hot-toast';

interface ProductListItemProps {
  product: Product;
}

const ProductListItem: React.FC<ProductListItemProps> = ({ product }) => {
  const { t } = useTranslation();
  const { language, currency, wishlist, addToWishlist, removeFromWishlist, addToCart } = useStore();
  const isRTL = language === 'ar';
  const isInWishlist = wishlist.includes(product.id);

  const formatPrice = (price: number) => {
    const symbol = currency === 'EGP' ? 'ج.م' : currency === 'USD' ? '$' : '€';
    const convertedPrice = currency === 'EGP' ? price : currency === 'USD' ? price / 30 : price / 32;
    return `${convertedPrice.toFixed(2)} ${symbol}`;
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isInWishlist) {
      removeFromWishlist(product.id);
      toast.success(t('removedFromWishlist', { defaultValue: 'Removed from wishlist' }));
    } else {
      addToWishlist(product.id);
      toast.success(t('addedToWishlist', { defaultValue: 'Added to wishlist' }));
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (product.stock <= 0) {
      toast.error(t('outOfStock', { defaultValue: 'Out of stock' }));
      return;
    }
    if (!product.sizes?.length) {
      toast.error(t('selectSize', { defaultValue: 'Please select a size' }));
      return;
    }
    if (!product.colors?.length) {
      toast.error(t('selectColor', { defaultValue: 'Please select a color' }));
      return;
    }
    addToCart(product, product.sizes[0].name, product.colors[0], 1);
    toast.success(t('addedToCart', { defaultValue: 'Added to cart' }));
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group bg-card rounded-lg overflow-hidden shadow-medium hover:shadow-glow transition-all duration-300 border border-border">
      <div className="flex p-4">
        {/* Product Image */}
        <div className="flex-shrink-0 w-32 sm:w-48 h-32 sm:h-48 relative overflow-hidden rounded-lg">
          <Link to={`/product/${product.id}`}>
            <img
              src={product.images[0] || '/placeholder.svg'}
              alt={`${isRTL ? product.nameAr : product.name} main image`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </Link>
          
          {/* Badges */}
          <div className={`absolute top-3 flex flex-col gap-2 ${isRTL ? 'right-3' : 'left-3'}`}>
            {product.newArrival && (
              <span className="bg-primary text-card text-xs px-2 py-1 rounded-full shadow-sm">
                {t('new', { defaultValue: 'NEW' })}
              </span>
            )}
            {discountPercentage > 0 && (
              <span className="bg-error-500 text-white text-xs px-2 py-1 rounded-full shadow-sm">
                {discountPercentage}% {t('off', { defaultValue: 'OFF' })}
              </span>
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className={`flex-1 flex flex-col justify-between ${isRTL ? 'mr-4' : 'ml-4'}`}>
          <div>
            <div className="flex items-start justify-between mb-1">
              <div>
                <div className="text-sm text-accent uppercase mb-2">
                  {(isRTL ? product.categoryAr : product.category)?.replace("-", " ")}
                </div>
                <Link to={`/product/${product.id}`}>
                  <h3 className="text-xl font-bold text-text-primary mb-4 group-hover:text-primary transition-colors">
                    {isRTL ? product.nameAr : product.name}
                  </h3>
                </Link>
              </div>
              <button
                onClick={handleWishlistToggle}
                className={`p-3 border border-border rounded-lg hover:bg-hover-bg-color transition-all duration-200 ${isRTL ? 'ml-2' : 'mr-2'}`}
                aria-label={isInWishlist ? t('removeFromWishlist') : t('addToWishlist')}
              >
                {isInWishlist ? (
                  <HeartIconSolid className="h-6 w-6 text-error-500" />
                ) : (
                  <HeartIcon className="h-6 w-6 text-text-secondary" />
                )}
              </button>
            </div>

            <p className="text-text-secondary mb-4 line-clamp-2 text-sm">
              {isRTL ? product.descriptionAr : product.description}
            </p>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-warning-400 fill-warning-400' : 'text-neutral-300'}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-text-secondary">
                  {product.rating} ({product.reviewCount} {t('reviews', { defaultValue: 'reviews' })})
                </span>
              </div>
            )}

            {/* Specifications */}
            <div className={`space-y-3 ${isRTL ? 'space-x-reverse' : ''}`}>
              <div className="flex justify-between">
                <span className="text-text-secondary">{t('material', { defaultValue: 'Material' })}</span>
                <span className="font-medium text-text-primary">{isRTL ? product.materialAr : product.material}</span>
              </div>
              {product.threadCount && (
                <div className="flex justify-between">
                  <span className="text-text-secondary">{t('threadCount', { defaultValue: 'Thread Count' })}</span>
                  <span className="font-medium text-text-primary">{product.threadCount}</span>
                </div>
              )}
            </div>
          </div>

          {/* Price and Actions */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center space-x-4">
              <span className="text-2xl font-bold text-text-primary">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-text-secondary line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              {product.stock <= 5 && product.stock > 0 && (
                <span className="text-xs text-warning-400">
                  {t('lowStock', { defaultValue: `Only ${product.stock} left` })}
                </span>
              )}
            </div>

            <div className={`flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
              <span className={`text-sm ${product.stock > 0 ? 'text-success-500' : 'text-error-500'}`}>
                {product.stock > 0 ? t('inStock', { defaultValue: 'In Stock' }) : t('outOfStock', { defaultValue: 'Out of Stock' })}
              </span>
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="bg-primary text-card py-2 px-4 rounded-lg shadow-medium hover:bg-primary-600 hover:shadow-glow transition-all duration-300 disabled:bg-neutral-300 disabled:text-neutral-500 disabled:cursor-not-allowed flex items-center space-x-2"
                aria-label={t('addToCart', { defaultValue: 'Add to cart' })}
              >
                <ShoppingBagIcon className="w-5 h-5" />
                <span>{t('quickAdd', { defaultValue: 'Quick Add' })}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductListItem);