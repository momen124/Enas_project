import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { StarIcon, HeartIcon, ShoppingBagIcon, TruckIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-hot-toast';
import { products } from '../data/mockData';
import { useStore } from '../store/useStore';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const { 
    language, 
    currency, 
    addToCart, 
    wishlist, 
    addToWishlist, 
    removeFromWishlist 
  } = useStore();
  
  const [selectedSize, setSelectedSize] = useState<{ name: string; cm: string } | null>(null);
  const [selectedColor, setSelectedColor] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const product = products.find(p => p.id === id);
  const isRTL = language === 'ar';
  const isInWishlist = product ? wishlist.includes(product.id) : false;

  if (!product) {
    return <div className="text-center py-20 text-[var(--text-color)]">Product not found</div>;
  }

  const formatPrice = (price: number) => {
    const symbol = currency === 'EGP' ? 'ج.م' : currency === 'USD' ? '$' : '€';
    const convertedPrice = currency === 'EGP' ? price : currency === 'USD' ? price / 30 : price / 32;
    return `${convertedPrice.toFixed(2)} ${symbol}`;
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error(t('selectSize'));
      return;
    }
    if (!selectedColor) {
      toast.error(t('selectColor'));
      return;
    }
    
    addToCart(product, selectedSize.name, selectedColor, quantity);
    toast.success(`Added to cart!`);
  };

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      removeFromWishlist(product.id);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist(product.id);
      toast.success('Added to wishlist');
    }
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-[var(--card-bg-color)]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg">
            <img
              src={selectedColor ? selectedColor.image : product.images[activeImageIndex]}
              alt={isRTL ? product.nameAr : product.name}
              className="w-full h-full object-cover cursor-zoom-in"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setActiveImageIndex(index)}
                className={`aspect-square overflow-hidden rounded-lg border-2 ${
                  activeImageIndex === index ? 'border-[var(--primary-color)]' : 'border-[var(--border-color)]'
                }`}
              >
                <img
                  src={image}
                  alt={`${isRTL ? product.nameAr : product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Information */}
        <div className="space-y-6">
          <div>
            <p className="text-sm text-[var(--secondary-text-color)] mb-2">
              {isRTL ? product.categoryAr : product.category}
            </p>
            <h1 className="text-3xl font-bold text-[var(--text-color)] mb-4">
              {isRTL ? product.nameAr : product.name}
            </h1>
            
            {/* Rating */}
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-[var(--border-color)]'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-[var(--secondary-text-color)]">
                {product.rating} ({product.reviewCount} {t('reviews')})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-3xl font-bold text-[var(--text-color)]">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-[var(--secondary-text-color)] line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="bg-red-100 text-red-800 text-sm px-2 py-1 rounded-full">
                    {discountPercentage}% OFF
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-[var(--text-color)] mb-2">{t('description')}</h3>
            <p className="text-[var(--secondary-text-color)]">
              {isRTL ? product.descriptionAr : product.description}
            </p>
          </div>

          {/* Color Selection */}
          <div>
            <h3 className="text-lg font-semibold text-[var(--text-color)] mb-3">{t('selectColor')}</h3>
            <div className={`flex space-x-3 ${isRTL ? 'space-x-reverse' : ''}`}>
              {product.colors.map((color, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedColor(color)}
                  className={`relative w-12 h-12 rounded-full border-4 ${
                    selectedColor?.name === color.name
                      ? 'border-[var(--primary-color)]'
                      : 'border-[var(--border-color)]'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={isRTL ? color.nameAr : color.name}
                >
                  {selectedColor?.name === color.name && (
                    <div className="absolute inset-0 rounded-full border-2 border-[var(--card-bg-color)]" />
                  )}
                </button>
              ))}
            </div>
            {selectedColor && (
              <p className="text-sm text-[var(--secondary-text-color)] mt-2">
                {isRTL ? selectedColor.nameAr : selectedColor.name}
              </p>
            )}
          </div>

          {/* Size Selection */}
          <div>
            <h3 className="text-lg font-semibold text-[var(--text-color)] mb-3">{t('selectSize')}</h3>
            <div className={`grid grid-cols-2 gap-3 ${isRTL ? 'grid-cols-2-reverse' : ''}`}>
              {product.sizes.map((size) => (
                <button
                  key={size.name}
                  onClick={() => setSelectedSize(size)}
                  className={`py-2 px-4 border rounded-lg text-center transition-colors flex flex-col items-center ${
                    selectedSize?.name === size.name
                      ? 'border-[var(--primary-color)] bg-[var(--primary-color)] text-[var(--card-bg-color)]'
                      : 'border-[var(--border-color)] hover:border-[var(--hover-bg-color)]'
                  }`}
                >
                  <span className="font-medium">{size.name}</span>
                  <span className="text-xs text-[var(--secondary-text-color)]">{size.cm} cm</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <h3 className="text-lg font-semibold text-[var(--text-color)] mb-3">{t('quantity')}</h3>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 border border-[var(--border-color)] rounded-lg hover:bg-[var(--hover-bg-color)]"
              >
                -
              </button>
              <span className="px-4 py-2 border border-[var(--border-color)] rounded-lg min-w-[3rem] text-center text-[var(--text-color)]">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 border border-[var(--border-color)] rounded-lg hover:bg-[var(--hover-bg-color)]"
              >
                +
              </button>
            </div>
          </div>

          {/* Stock Status */}
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {product.stock > 0 ? `${t('inStock')} (${product.stock} available)` : t('outOfStock')}
            </span>
          </div>

          {/* Actions */}
          <div className={`flex space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1 bg-[var(--primary-color)] text-[var(--card-bg-color)] py-3 px-6 rounded-lg hover:bg-[var(--hover-bg-color)] transition-colors disabled:bg-[var(--border-color)] disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <ShoppingBagIcon className="w-5 h-5" />
              <span>{t('addToCart')}</span>
            </button>
            <button
              onClick={handleWishlistToggle}
              className="p-3 border border-[var(--border-color)] rounded-lg hover:bg-[var(--hover-bg-color)] transition-colors"
            >
              {isInWishlist ? (
                <HeartIconSolid className="w-6 h-6 text-red-500" />
              ) : (
                <HeartIcon className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Features */}
          <div className="space-y-3 pt-6 border-t border-[var(--border-color)]">
            <div className="flex items-center space-x-3">
              <TruckIcon className="w-5 h-5 text-[var(--secondary-text-color)]" />
              <span className="text-sm text-[var(--secondary-text-color)]">Free shipping on orders over 1000 EGP</span>
            </div>
            <div className="flex items-center space-x-3">
              <ShieldCheckIcon className="w-5 h-5 text-[var(--secondary-text-color)]" />
              <span className="text-sm text-[var(--secondary-text-color)]">30-day return policy</span>
            </div>
          </div>

          {/* Specifications */}
          <div className="pt-6 border-t border-[var(--border-color)]">
            <h3 className="text-lg font-semibold text-[var(--text-color)] mb-4">{t('specifications')}</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-[var(--secondary-text-color)]">{t('material')}</span>
                <span className="font-medium text-[var(--text-color)]">{isRTL ? product.materialAr : product.material}</span>
              </div>
              {product.threadCount && (
                <div className="flex justify-between">
                  <span className="text-[var(--secondary-text-color)]">{t('threadCount')}</span>
                  <span className="font-medium text-[var(--text-color)]">{product.threadCount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-[var(--secondary-text-color)]">{t('careInstructions')}</span>
                <span className="font-medium text-[var(--text-color)]">{isRTL ? product.careInstructionsAr : product.careInstructions}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;