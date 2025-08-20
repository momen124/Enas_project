import React from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon, StarIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { Product } from '../../types';
import { useStore } from '../../store/useStore';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
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

  const mainImage = product.images?.length > 0 ? product.images[0] : '/placeholder.svg';

  return (
    <div className="group relative bg-card rounded-xl overflow-hidden shadow-medium hover:shadow-glow transition-all duration-300 border border-border">
      <Link to={`/product/${product.id}`}>
        <div className="relative w-full h-48 sm:h-64 overflow-hidden bg-card">
          <img
            src={mainImage}
            alt={`${isRTL ? product.nameAr : product.name} main image`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />

          {/* Badges */}
          <div className={`absolute top-3 flex flex-col gap-2 ${isRTL ? 'right-3' : 'left-3'}`}>
            {product.newArrival && (
              <span className="bg-primary text-card text-xs px-2 py-1 rounded-full shadow-sm hover:bg-primary-600 transition-colors">
                {t('new', { defaultValue: 'NEW' })}
              </span>
            )}
            {discountPercentage > 0 && (
              <span className="bg-error-500 text-white text-xs px-2 py-1 rounded-full shadow-sm">
                {discountPercentage}% {t('off', { defaultValue: 'OFF' })}
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            className={`absolute top-3 p-2 bg-card/90 rounded-full shadow-medium hover:bg-card hover:shadow-glow transition-all duration-200 ${isRTL ? 'left-3' : 'right-3'}`}
            aria-label={isInWishlist ? t('removeFromWishlist') : t('addToWishlist')}
          >
            {isInWishlist ? (
              <HeartIconSolid className="h-5 w-5 text-error-500" />
            ) : (
              <HeartIcon className="h-5 w-5 text-text-secondary" />
            )}
          </button>

          {/* Quick Add to Cart */}
          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleAddToCart}
              className="w-full bg-primary text-card text-sm px-4 py-2 rounded-lg shadow-medium hover:bg-primary-600 hover:shadow-glow transition-all duration-300 flex items-center justify-center gap-2"
              aria-label={t('addToCart', { defaultValue: 'Add to cart' })}
              disabled={product.stock <= 0}
            >
              <ShoppingBagIcon className="w-4 h-4" />
              {t('addToCart', { defaultValue: 'Add to Cart' })}
            </button>
          </div>
        </div>

        <div className="p-4">
          <div className="text-xs text-accent font-medium mb-1 uppercase">
            {(isRTL ? product.categoryAr : product.category)?.replace("-", " ")}
          </div>

          <h3 className="text-sm font-medium text-text-primary line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {isRTL ? product.nameAr : product.name}
          </h3>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-1 mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-warning-400 text-warning-400' : 'text-neutral-300'}`}
                  />
                ))}
              </div>
              <span className="text-xs text-text-secondary">({product.reviewCount})</span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg font-semibold text-text-primary">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-text-secondary line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            {product.stock <= 5 && product.stock > 0 && (
              <span className="text-xs text-warning-400">
                {t('lowStock', { defaultValue: `Only ${product.stock} left` })}
              </span>
            )}
          </div>

          {/* Color Swatches */}
          <div className={`flex gap-1 ${isRTL ? 'justify-end' : 'justify-start'}`}>
            {product.colors.slice(0, 4).map((color, index) => (
              <div
                key={index}
                className="w-4 h-4 rounded-full border border-border hover:scale-110 transition-transform"
                style={{ backgroundColor: color.hex }}
                title={isRTL ? color.nameAr : color.name}
              />
            ))}
            {product.colors.length > 4 && (
              <div className="w-4 h-4 rounded-full border border-border bg-card flex items-center justify-center">
                <span className="text-xs text-text-secondary">+{product.colors.length - 4}</span>
              </div>
            )}
          </div>

          {/* Sizes */}
          {product.sizes.length > 0 && (
            <div className="mt-2 text-xs text-text-secondary">
              {t('sizes', { defaultValue: 'Sizes' })}: {product.sizes.map(size => size.name).join(', ')}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default React.memo(ProductCard);