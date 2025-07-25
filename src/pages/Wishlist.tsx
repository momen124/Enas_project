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
    toast.success('Removed from wishlist');
  };

  const handleAddToCart = (product: any) => {
    if (product.stock > 0) {
      addToCart(product, product.sizes[0], product.colors[0], 1);
      toast.success('Added to cart!');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-[var(--card-bg-color)]">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--text-color)] mb-2">My Wishlist</h1>
        <p className="text-[var(--secondary-text-color)]">
          {wishlistProducts.length} {wishlistProducts.length === 1 ? 'item' : 'items'} saved for later
        </p>
      </div>

      {wishlistProducts.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-[var(--secondary-text-color)] mb-6">
            <HeartIcon className="w-24 h-24 mx-auto" />
          </div>
          <h2 className="text-2xl font-semibold text-[var(--text-color)] mb-4">Your wishlist is empty</h2>
          <p className="text-[var(--secondary-text-color)] mb-8 max-w-md mx-auto">
            Save your favorite products here and never lose track of what you love.
          </p>
          <Link
            to="/shop"
            className="bg-[var(--primary-color)] text-[var(--card-bg-color)] px-8 py-3 rounded-lg hover:bg-[var(--hover-bg-color)] transition-colors inline-block"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistProducts.map(product => (
            <div key={product.id} className="bg-[var(--card-bg-color)] rounded-lg shadow-sm border border-[var(--border-color)] hover:shadow-md transition-shadow duration-300">
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
                  className={`absolute top-2 p-2 bg-[var(--card-bg-color)] rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:bg-[var(--hover-bg-color)] ${isRTL ? 'left-2' : 'right-2'}`}
                  title="Remove from wishlist"
                >
                  <TrashIcon className="w-5 h-5 text-red-500" />
                </button>

                {/* Badges */}
                <div className={`absolute top-2 flex flex-col space-y-1 ${isRTL ? 'right-2' : 'left-2'}`}>
                  {product.newArrival && (
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      NEW
                    </span>
                  )}
                  {product.originalPrice && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      SALE
                    </span>
                  )}
                </div>
              </div>

              <div className="p-4">
                <div className="mb-2">
                  <span className="text-sm text-[var(--secondary-text-color)]">
                    {isRTL ? product.categoryAr : product.category}
                  </span>
                </div>

                <Link to={`/product/${product.id}`}>
                  <h3 className="font-semibold text-[var(--text-color)] mb-2 hover:text-[var(--primary-color)] transition-colors line-clamp-2">
                    {isRTL ? product.nameAr : product.name}
                  </h3>
                </Link>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-[var(--text-color)]">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-[var(--secondary-text-color)] line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                  
                  {product.stock > 0 ? (
                    <span className="text-sm text-green-600 font-medium">In Stock</span>
                  ) : (
                    <span className="text-sm text-red-600 font-medium">Out of Stock</span>
                  )}
                </div>

                {/* Color Options Preview */}
                <div className={`flex space-x-2 mb-4 ${isRTL ? 'space-x-reverse' : ''}`}>
                  {product.colors.slice(0, 4).map((color, index) => (
                    <div
                      key={index}
                      className="w-6 h-6 rounded-full border-2 border-[var(--border-color)]"
                      style={{ backgroundColor: color.hex }}
                      title={isRTL ? color.nameAr : color.name}
                    />
                  ))}
                  {product.colors.length > 4 && (
                    <div className="w-6 h-6 rounded-full border-2 border-[var(--border-color)] bg-[var(--card-bg-color)] flex items-center justify-center">
                      <span className="text-xs text-[var(--secondary-text-color)]">+{product.colors.length - 4}</span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock === 0}
                    className="flex-1 bg-[var(--primary-color)] text-[var(--card-bg-color)] py-2 px-4 rounded-lg hover:bg-[var(--hover-bg-color)] transition-colors disabled:bg-[var(--border-color)] disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    <ShoppingBagIcon className="w-4 h-4" />
                    <span>Add to Cart</span>
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
          <h2 className="text-2xl font-bold text-[var(--text-color)] mb-6">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products
              .filter(product => !wishlist.includes(product.id))
              .slice(0, 4)
              .map(product => (
                <div key={product.id} className="bg-[var(--card-bg-color)] rounded-lg shadow-sm border border-[var(--border-color)]">
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={product.images[0]}
                      alt={isRTL ? product.nameAr : product.name}
                      className="w-full h-48 object-cover rounded-t-lg hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                  <div className="p-4">
                    <h3 className="font-semibold text-[var(--text-color)] mb-2 line-clamp-2">
                      {isRTL ? product.nameAr : product.name}
                    </h3>
                    <p className="text-lg font-bold text-[var(--text-color)]">
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