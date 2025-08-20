import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  StarIcon, 
  HeartIcon, 
  ShoppingBagIcon, 
  TruckIcon, 
  ShieldCheckIcon,
  ShareIcon,
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckIcon,
  XMarkIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid, StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
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
  const [isZoomed, setIsZoomed] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const product = products.find(p => p.id === id);
  const isRTL = language === 'ar';
  const isInWishlist = product ? wishlist.includes(product.id) : false;

  // Set default selections
  useEffect(() => {
    if (product && !selectedColor) {
      setSelectedColor(product.colors[0]);
    }
    if (product && !selectedSize) {
      setSelectedSize(product.sizes[0]);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-50 to-neutral-50 dark:from-neutral-900 dark:to-neutral-800">
        <div className="text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-error-400 to-error-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <XMarkIcon className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h2>
          <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist.</p>
          <Link to="/shop" className="btn-primary">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    const symbol = currency === 'EGP' ? 'ج.م' : currency === 'USD' ? '$' : '€';
    const convertedPrice = currency === 'EGP' ? price : currency === 'USD' ? price / 30 : price / 32;
    return `${convertedPrice.toFixed(2)} ${symbol}`;
  };

  const handleAddToCart = async () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }
    if (!selectedColor) {
      toast.error('Please select a color');
      return;
    }
    
    setIsAddingToCart(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    addToCart(product, selectedSize.name, selectedColor, quantity);
    toast.success(`Added ${quantity} item(s) to cart!`);
    setIsAddingToCart(false);
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

  const currentImages = selectedColor ? [selectedColor.image, ...product.images] : product.images;

  const relatedProducts = products
    .filter(p => p.id !== product.id && (isRTL ? p.categoryAr : p.category) === (isRTL ? product.categoryAr : product.category))
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-neutral-50 dark:from-neutral-900 dark:to-neutral-800">
      {/* Enhanced Breadcrumb */}
      <div className="bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-brand-500 transition-colors">Home</Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-brand-500 transition-colors">Shop</Link>
            <span>/</span>
            <Link 
              to={`/shop/${product.category.toLowerCase()}`} 
              className="hover:text-brand-500 transition-colors"
            >
              {isRTL ? product.categoryAr : product.category}
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium truncate">
              {isRTL ? product.nameAr : product.name}
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Enhanced Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative group">
              <div className="aspect-square overflow-hidden rounded-2xl bg-white shadow-soft">
                <img
                  src={currentImages[activeImageIndex]}
                  alt={isRTL ? product.nameAr : product.name}
                  className={`w-full h-full object-cover transition-transform duration-500 ${
                    isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in hover:scale-105'
                  }`}
                  onClick={() => setIsZoomed(!isZoomed)}
                />
                
                {/* Image Navigation */}
                {currentImages.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveImageIndex(prev => 
                        prev === 0 ? currentImages.length - 1 : prev - 1
                      )}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm p-2 rounded-full shadow-soft opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                    >
                      <ChevronLeftIcon className="w-5 h-5 text-foreground" />
                    </button>
                    <button
                      onClick={() => setActiveImageIndex(prev => 
                        prev === currentImages.length - 1 ? 0 : prev + 1
                      )}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm p-2 rounded-full shadow-soft opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                    >
                      <ChevronRightIcon className="w-5 h-5 text-foreground" />
                    </button>
                  </>
                )}

                {/* Zoom Indicator */}
                <div className="absolute top-4 left-4 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <MagnifyingGlassIcon className="w-3 h-3 inline mr-1" />
                  Click to zoom
                </div>

                {/* Badges */}
                <div className="absolute top-4 right-4 flex flex-col space-y-2">
                  {product.newArrival && (
                    <span className="bg-success-500 text-white text-xs px-3 py-1 rounded-full font-medium shadow-soft animate-bounce-subtle">
                      NEW
                    </span>
                  )}
                  {product.originalPrice && (
                    <span className="bg-error-500 text-white text-xs px-3 py-1 rounded-full font-medium shadow-soft">
                      {discountPercentage}% OFF
                    </span>
                  )}
                  {product.featured && (
                    <span className="bg-brand-500 text-white text-xs px-3 py-1 rounded-full font-medium shadow-soft">
                      FEATURED
                    </span>
                  )}
                </div>
              </div>

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-6 gap-3">
                {currentImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`aspect-square overflow-hidden rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                      activeImageIndex === index 
                        ? 'border-brand-500 shadow-soft' 
                        : 'border-border hover:border-brand-300'
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
          </div>

          {/* Enhanced Product Information */}
          <div className="space-y-8">
            {/* Product Header */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-brand-500 bg-brand-50 dark:bg-brand-950 px-3 py-1 rounded-full">
                  {isRTL ? product.categoryAr : product.category}
                </span>
                <button
                  onClick={handleWishlistToggle}
                  className="p-3 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-all duration-300 hover:scale-110"
                >
                  {isInWishlist ? (
                    <HeartIconSolid className="w-6 h-6 text-error-500" />
                  ) : (
                    <HeartIcon className="w-6 h-6 text-muted-foreground hover:text-error-500" />
                  )}
                </button>
              </div>

              <h1 className="text-4xl font-bold text-foreground leading-tight">
                {isRTL ? product.nameAr : product.name}
              </h1>
              
              {/* Enhanced Rating */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <StarIconSolid
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-warning-400'
                          : 'text-neutral-300'
                      }`}
                    />
                  ))}
                  <span className="text-sm font-medium text-foreground ml-2">
                    {product.rating}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">
                  ({product.reviewCount} reviews)
                </span>
                <button className="text-sm text-brand-500 hover:text-brand-600 transition-colors font-medium">
                  Read Reviews
                </button>
              </div>

              {/* Enhanced Price */}
              <div className="flex items-center space-x-4">
                <span className="text-4xl font-bold text-foreground">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-muted-foreground line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <span className="bg-gradient-to-r from-error-500 to-error-600 text-white text-sm px-3 py-1 rounded-full font-bold shadow-soft">
                      Save {discountPercentage}%
                    </span>
                  </>
                )}
              </div>

              {/* Stock Status */}
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${product.stock > 0 ? 'bg-success-500' : 'bg-error-500'} animate-pulse-soft`} />
                <span className={`font-medium ${product.stock > 0 ? 'text-success-600' : 'text-error-600'}`}>
                  {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                </span>
                {product.stock <= 5 && product.stock > 0 && (
                  <span className="text-xs text-warning-600 bg-warning-50 dark:bg-warning-950 px-2 py-1 rounded-full">
                    Only {product.stock} left!
                  </span>
                )}
              </div>
            </div>

            {/* Enhanced Color Selection */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-foreground flex items-center">
                Color Selection
                {selectedColor && (
                  <span className="ml-3 text-sm font-normal text-muted-foreground">
                    ({isRTL ? selectedColor.nameAr : selectedColor.name})
                  </span>
                )}
              </h3>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(color)}
                    className={`relative group transition-all duration-300 hover:scale-110 ${
                      selectedColor?.name === color.name ? 'animate-bounce-subtle' : ''
                    }`}
                  >
                    <div
                      className={`w-16 h-16 rounded-2xl border-4 shadow-soft transition-all duration-300 ${
                        selectedColor?.name === color.name
                          ? 'border-brand-500 shadow-medium'
                          : 'border-white dark:border-neutral-700 group-hover:border-brand-300'
                      }`}
                      style={{ backgroundColor: color.hex }}
                    />
                    {selectedColor?.name === color.name && (
                      <div className="absolute inset-0 rounded-2xl border-2 border-white dark:border-neutral-900 pointer-events-none">
                        <CheckIcon className="w-6 h-6 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 drop-shadow-lg" />
                      </div>
                    )}
                    
                    {/* Color Name Tooltip */}
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-neutral-900 text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                      {isRTL ? color.nameAr : color.name}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Enhanced Size Selection */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-foreground">Size Selection</h3>
                <button className="text-sm text-brand-500 hover:text-brand-600 transition-colors font-medium flex items-center">
                  <InformationCircleIcon className="w-4 h-4 mr-1" />
                  Size Guide
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size.name}
                    onClick={() => setSelectedSize(size)}
                    className={`p-4 border-2 rounded-xl text-center transition-all duration-300 hover:scale-105 ${
                      selectedSize?.name === size.name
                        ? 'border-brand-500 bg-brand-500 text-white shadow-medium'
                        : 'border-border hover:border-brand-300 hover:bg-brand-50 dark:hover:bg-brand-950'
                    }`}
                  >
                    <div className="font-bold text-lg">{size.name}</div>
                    <div className="text-sm opacity-75">{size.cm} cm</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Enhanced Quantity Selector */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-foreground">Quantity</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center bg-neutral-100 dark:bg-neutral-800 rounded-xl p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-white dark:hover:bg-neutral-700 rounded-lg transition-colors"
                    disabled={quantity <= 1}
                  >
                    <span className="text-xl font-bold">−</span>
                  </button>
                  <span className="px-6 py-2 text-xl font-bold text-foreground min-w-[4rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-white dark:hover:bg-neutral-700 rounded-lg transition-colors"
                    disabled={quantity >= product.stock}
                  >
                    <span className="text-xl font-bold">+</span>
                  </button>
                </div>
                
                {quantity > 1 && (
                  <div className="text-sm text-muted-foreground">
                    Total: <span className="font-bold text-foreground">{formatPrice(product.price * quantity)}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Enhanced Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0 || isAddingToCart}
                className={`w-full relative overflow-hidden transition-all duration-300 ${
                  product.stock === 0
                    ? 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                    : 'btn-primary text-lg py-4 hover:shadow-glow'
                } ${isAddingToCart ? 'animate-pulse' : ''}`}
              >
                <div className="flex items-center justify-center space-x-3">
                  {isAddingToCart ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <ShoppingBagIcon className="w-6 h-6" />
                  )}
                  <span>
                    {isAddingToCart ? 'Adding to Cart...' : 
                     product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                  </span>
                </div>
              </button>

              <div className="grid grid-cols-2 gap-3">
                <button className="btn-secondary py-3 flex items-center justify-center space-x-2">
                  <HeartIcon className="w-5 h-5" />
                  <span>Buy Now</span>
                </button>
                <button className="btn-outline py-3 flex items-center justify-center space-x-2">
                  <ShareIcon className="w-5 h-5" />
                  <span>Share</span>
                </button>
              </div>
            </div>

            {/* Enhanced Features */}
            <div className="bg-gradient-to-r from-brand-50 to-accent-50 dark:from-brand-950 dark:to-accent-950 rounded-2xl p-6 space-y-4">
              <h4 className="font-bold text-foreground mb-4">Why Choose This Product?</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-success-100 dark:bg-success-900 rounded-full flex items-center justify-center">
                    <TruckIcon className="w-5 h-5 text-success-600" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Free Shipping</div>
                    <div className="text-sm text-muted-foreground">On orders over 1000 EGP</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-brand-100 dark:bg-brand-900 rounded-full flex items-center justify-center">
                    <ShieldCheckIcon className="w-5 h-5 text-brand-600" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">30-Day Returns</div>
                    <div className="text-sm text-muted-foreground">Hassle-free returns</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-warning-100 dark:bg-warning-900 rounded-full flex items-center justify-center">
                    <StarIcon className="w-5 h-5 text-warning-600" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Premium Quality</div>
                    <div className="text-sm text-muted-foreground">100% Egyptian Cotton</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-accent-100 dark:bg-accent-900 rounded-full flex items-center justify-center">
                    <CheckIcon className="w-5 h-5 text-accent-600" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Authentic</div>
                    <div className="text-sm text-muted-foreground">Certified genuine</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Product Details Tabs */}
        <div className="mb-16">
          <div className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl rounded-2xl shadow-soft border border-white/20 dark:border-neutral-700/20 overflow-hidden">
            {/* Tab Navigation */}
            <div className="flex border-b border-border">
              {[
                { id: 'description', label: 'Description', icon: InformationCircleIcon },
                { id: 'specifications', label: 'Specifications', icon: CheckIcon },
                { id: 'care', label: 'Care Instructions', icon: ShieldCheckIcon },
                { id: 'reviews', label: 'Reviews', icon: StarIcon }
              ].map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-brand-500 text-white shadow-soft'
                        : 'text-muted-foreground hover:text-foreground hover:bg-brand-50 dark:hover:bg-brand-950'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="hidden sm:inline font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Content */}
            <div className="p-8">
              {activeTab === 'description' && (
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  <h3 className="text-2xl font-bold text-foreground mb-4">Product Description</h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {isRTL ? product.descriptionAr : product.description}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div className="bg-brand-50 dark:bg-brand-950 rounded-xl p-6">
                      <h4 className="font-bold text-foreground mb-3">Key Features</h4>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-center">
                          <CheckIcon className="w-4 h-4 text-success-500 mr-2" />
                          100% Premium Egyptian Cotton
                        </li>
                        <li className="flex items-center">
                          <CheckIcon className="w-4 h-4 text-success-500 mr-2" />
                          Hypoallergenic & Breathable
                        </li>
                        <li className="flex items-center">
                          <CheckIcon className="w-4 h-4 text-success-500 mr-2" />
                          Machine Washable
                        </li>
                        <li className="flex items-center">
                          <CheckIcon className="w-4 h-4 text-success-500 mr-2" />
                          Fade Resistant Colors
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-accent-50 dark:bg-accent-950 rounded-xl p-6">
                      <h4 className="font-bold text-foreground mb-3">Sustainability</h4>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-center">
                          <CheckIcon className="w-4 h-4 text-success-500 mr-2" />
                          Ethically Sourced Cotton
                        </li>
                        <li className="flex items-center">
                          <CheckIcon className="w-4 h-4 text-success-500 mr-2" />
                          Eco-Friendly Production
                        </li>
                        <li className="flex items-center">
                          <CheckIcon className="w-4 h-4 text-success-500 mr-2" />
                          Supporting Local Farmers
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'specifications' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-foreground">Product Specifications</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="flex justify-between py-3 border-b border-border">
                        <span className="font-medium text-muted-foreground">Material</span>
                        <span className="font-bold text-foreground">{isRTL ? product.materialAr : product.material}</span>
                      </div>
                      {product.threadCount && (
                        <div className="flex justify-between py-3 border-b border-border">
                          <span className="font-medium text-muted-foreground">Thread Count</span>
                          <span className="font-bold text-foreground">{product.threadCount}</span>
                        </div>
                      )}
                      <div className="flex justify-between py-3 border-b border-border">
                        <span className="font-medium text-muted-foreground">Available Sizes</span>
                        <span className="font-bold text-foreground">
                          {product.sizes.map(s => s.name).join(', ')}
                        </span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-border">
                        <span className="font-medium text-muted-foreground">Colors Available</span>
                        <span className="font-bold text-foreground">{product.colors.length} colors</span>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between py-3 border-b border-border">
                        <span className="font-medium text-muted-foreground">Weight</span>
                        <span className="font-bold text-foreground">500g</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-border">
                        <span className="font-medium text-muted-foreground">Country of Origin</span>
                        <span className="font-bold text-foreground">Egypt</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-border">
                        <span className="font-medium text-muted-foreground">SKU</span>
                        <span className="font-bold text-foreground font-mono">{product.id.toUpperCase()}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-border">
                        <span className="font-medium text-muted-foreground">Certification</span>
                        <span className="font-bold text-foreground">OEKO-TEX Standard 100</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'care' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-foreground">Care Instructions</h3>
                  
                  <div className="bg-gradient-to-br from-brand-50 to-accent-50 dark:from-brand-950 dark:to-accent-950 rounded-2xl p-6">
                    <h4 className="font-bold text-foreground mb-4">General Care</h4>
                    <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                      {isRTL ? product.careInstructionsAr : product.careInstructions}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold text-foreground mb-3 text-success-600">Do's</h5>
                        <ul className="space-y-2">
                          <li className="flex items-center text-sm">
                            <CheckIcon className="w-4 h-4 text-success-500 mr-2" />
                            Wash in cold water (30°C max)
                          </li>
                          <li className="flex items-center text-sm">
                            <CheckIcon className="w-4 h-4 text-success-500 mr-2" />
                            Use mild detergent
                          </li>
                          <li className="flex items-center text-sm">
                            <CheckIcon className="w-4 h-4 text-success-500 mr-2" />
                            Air dry when possible
                          </li>
                          <li className="flex items-center text-sm">
                            <CheckIcon className="w-4 h-4 text-success-500 mr-2" />
                            Iron on medium heat
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold text-foreground mb-3 text-error-600">Don'ts</h5>
                        <ul className="space-y-2">
                          <li className="flex items-center text-sm">
                            <XMarkIcon className="w-4 h-4 text-error-500 mr-2" />
                            Don't use bleach
                          </li>
                          <li className="flex items-center text-sm">
                            <XMarkIcon className="w-4 h-4 text-error-500 mr-2" />
                            Avoid fabric softener
                          </li>
                          <li className="flex items-center text-sm">
                            <XMarkIcon className="w-4 h-4 text-error-500 mr-2" />
                            Don't wring or twist
                          </li>
                          <li className="flex items-center text-sm">
                            <XMarkIcon className="w-4 h-4 text-error-500 mr-2" />
                            Avoid high heat drying
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-foreground">Customer Reviews</h3>
                    <button className="btn-outline">Write a Review</button>
                  </div>
                  
                  {/* Rating Summary */}
                  <div className="bg-gradient-to-r from-brand-50 to-accent-50 dark:from-brand-950 dark:to-accent-950 rounded-2xl p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="text-center">
                        <div className="text-5xl font-bold text-foreground mb-2">{product.rating}</div>
                        <div className="flex items-center justify-center space-x-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <StarIconSolid
                              key={i}
                              className={`w-6 h-6 ${
                                i < Math.floor(product.rating) ? 'text-warning-400' : 'text-neutral-300'
                              }`}
                            />
                          ))}
                        </div>
                        <div className="text-muted-foreground">Based on {product.reviewCount} reviews</div>
                      </div>
                      
                      <div className="space-y-3">
                        {[5, 4, 3, 2, 1].map(stars => {
                          const percentage = Math.random() * 100; // Mock data
                          return (
                            <div key={stars} className="flex items-center space-x-3">
                              <span className="text-sm font-medium w-8">{stars}</span>
                              <StarIcon className="w-4 h-4 text-warning-400" />
                              <div className="flex-1 bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                                <div 
                                  className="bg-warning-400 h-2 rounded-full transition-all duration-1000"
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                              <span className="text-sm text-muted-foreground w-12">
                                {Math.round(percentage)}%
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Sample Reviews */}
                  <div className="space-y-6">
                    {[
                      {
                        name: "Sarah Ahmed",
                        rating: 5,
                        date: "2 weeks ago",
                        review: "Absolutely love these sheets! The quality is exceptional and they get softer with every wash.",
                        verified: true
                      },
                      {
                        name: "Mohamed Hassan",
                        rating: 4,
                        date: "1 month ago", 
                        review: "Great quality cotton, very comfortable. Delivery was faster than expected.",
                        verified: true
                      }
                    ].map((review, index) => (
                      <div key={index} className="bg-white dark:bg-neutral-900 rounded-xl p-6 shadow-soft border border-border">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-brand-400 to-accent-400 rounded-full flex items-center justify-center text-white font-bold">
                              {review.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-semibold text-foreground">{review.name}</div>
                              <div className="text-sm text-muted-foreground">{review.date}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <StarIconSolid
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating ? 'text-warning-400' : 'text-neutral-300'
                                  }`}
                                />
                              ))}
                            </div>
                            {review.verified && (
                              <span className="bg-success-100 dark:bg-success-900 text-success-600 text-xs px-2 py-1 rounded-full font-medium">
                                Verified
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground leading-relaxed">{review.review}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Enhanced Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">Related Products</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Complete your collection with these perfectly matched items
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct, index) => (
                <div
                  key={relatedProduct.id}
                  className="animate-fade-in-up hover-lift"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <ProductCard product={relatedProduct} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Enhanced Recently Viewed */}
        <section className="bg-gradient-to-r from-brand-100 to-accent-100 dark:from-brand-900 dark:to-accent-900 rounded-3xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Recently Viewed</h2>
            <p className="text-muted-foreground">Products you've looked at recently</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {products.slice(0, 4).map((recentProduct, index) => (
              <Link
                key={recentProduct.id}
                to={`/product/${recentProduct.id}`}
                className="group block animate-fade-in-up hover-lift"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-square overflow-hidden rounded-xl mb-3">
                  <img
                    src={recentProduct.images[0]}
                    alt={isRTL ? recentProduct.nameAr : recentProduct.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h4 className="font-semibold text-foreground text-sm line-clamp-2 group-hover:text-brand-500 transition-colors">
                  {isRTL ? recentProduct.nameAr : recentProduct.name}
                </h4>
                <p className="text-brand-500 font-bold text-sm mt-1">
                  {formatPrice(recentProduct.price)}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDetail;