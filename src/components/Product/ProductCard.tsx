import React from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon, StarIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { Product } from '../../types';
import { useStore } from '../../store/useStore';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { language, currency, wishlist, addToWishlist, removeFromWishlist } = useStore();
  const isRTL = language === 'ar';
  const isInWishlist = wishlist.includes(product.id);

  const formatPrice = (price: number) => {
    const symbol = currency === 'EGP' ? 'EGP' : currency === 'USD' ? '$' : '€';
    const convertedPrice = currency === 'EGP' ? price : currency === 'USD' ? price / 30 : price / 32;
    return `${convertedPrice.toFixed(2)} ${symbol}`;
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Safely handle images
  const mainImage = product.images && product.images.length > 0 ? product.images[0] : "/placeholder.svg";

  return (
    <div className="group relative bg-[var(--card-bg-color)] rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 border border-[var(--border-color)]">
      <Link to={`/product/${product.id}`}>
        <div className="relative w-full h-64 overflow-hidden bg-[var(--card-bg-color)]">
          <img
            src={mainImage}
            alt={isRTL ? product.nameAr : product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Badges */}
          <div className={`absolute top-3 flex flex-col gap-2 ${isRTL ? 'right-3' : 'left-3'}`}>
            {product.newArrival && (
              <span className="bg-[var(--primary-color)] text-[var(--card-bg-color)] text-xs px-2 py-1 rounded-full hover:bg-[var(--hover-bg-color)]">
                NEW
              </span>
            )}
            {discountPercentage > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {discountPercentage}% OFF
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            className={`absolute top-3 p-2 bg-[var(--card-bg-color)]/80 rounded-full hover:bg-[var(--card-bg-color)] shadow-md hover:shadow-lg transition-all duration-200 ${isRTL ? 'left-3' : 'right-3'}`}
          >
            {isInWishlist ? (
              <HeartIconSolid className="h-4 w-4 fill-red-500 text-red-500" />
            ) : (
              <HeartIcon className="h-4 w-4 text-[var(--secondary-text-color)]" />
            )}
          </button>

          {/* Quick Add to Cart - shown on hover */}
          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              className="w-full bg-[var(--primary-color)] hover:bg-[var(--hover-bg-color)] text-[var(--card-bg-color)] text-sm px-4 py-2 rounded-lg transition-colors"
              onClick={(e) => {
                e.preventDefault();
                // Placeholder for addToCart functionality
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>

        <div className="p-4">
          <div className="text-xs text-[var(--accent-color)] font-medium mb-1">
            {(isRTL ? product.categoryAr : product.category)?.replace("-", " ").toUpperCase()}
          </div>

          <h3 className="text-sm font-medium text-[var(--text-color)] line-clamp-2 mb-2 group-hover:text-[var(--primary-color)] transition-colors">
            {isRTL ? product.nameAr : product.name}
          </h3>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-1 mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <span className="text-xs text-[var(--secondary-text-color)]">({product.reviewCount})</span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg font-semibold text-[var(--text-color)]">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-[var(--secondary-text-color)] line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Color Swatches */}
          <div className={`flex gap-1 ${isRTL ? 'space-x-reverse' : ''}`}>
            {product.colors.slice(0, 4).map((color, index) => (
              <div
                key={index}
                className="w-4 h-4 rounded-full border border-[var(--border-color)]"
                style={{ backgroundColor: color.hex }}
                title={isRTL ? color.nameAr : color.name}
              />
            ))}
            {product.colors.length > 4 && (
              <div className="w-4 h-4 rounded-full border border-[var(--border-color)] bg-[var(--card-bg-color)] flex items-center justify-center">
                <span className="text-xs text-[var(--secondary-text-color)]">+{product.colors.length - 4}</span>
              </div>
            )}
          </div>

          {/* Sizes */}
          {product.sizes.length > 0 && (
            <div className="mt-2 text-xs text-[var(--secondary-text-color)]">
              Sizes: {product.sizes.map(size => size.name).join(', ')}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;