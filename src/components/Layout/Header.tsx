import React, { useState, useCallback } from 'react'; // Added useState
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ShoppingBagIcon,
  HeartIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { useStore } from '../../store/useStore';
import { categories } from '../../data/mockData';
import MegaMenu from './MegaMenu';
import CartSidebar from '../Cart/CartSidebar';
import Logo from '../../assets/logo.png'; // Adjust the path as necessary
import ThemeToggle from '../ThemeToggle/ThemeToggle'; // Adjust the import path

type CurrencyCode = 'EGP' | 'USD' | 'EUR';

interface Currency {
  code: CurrencyCode;
  symbol: string;
}

const MemoizedMegaMenu = React.memo(MegaMenu);

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { cart, setCartOpen, language, setLanguage, currency, setCurrency } = useStore(); // Removed unused cartOpen
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);

  const isRTL = language === 'ar';
  const cartItemsCount = cart ? cart.reduce((sum, item) => sum + item.quantity, 0) : 0;

  const toggleLanguage = useCallback(() => {
    const newLang = language === 'en' ? 'ar' : 'en';
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
    document.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  }, [language, setLanguage, i18n]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const toggleCategory = (categoryId: string) => { // Typed categoryId as string
    setExpandedCategories(prev => // Typed prev as string[]
      prev.includes(categoryId) ? prev.filter(id => id !== categoryId) : [...prev, categoryId]
    );
  };

  const currencies: Currency[] = [
    { code: 'EGP', symbol: 'ج.م' },
    { code: 'USD', symbol: '$' },
    { code: 'EUR', symbol: '€' },
  ];

  return (
    <>
      <header className="bg-white shadow-sm relative z-50">
        {/* Top Bar */}
        <div className="bg-egyptian-blue text-white py-2">
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-sm">
            <div className={`flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
              <span>{t('promotionalBanner')}</span>
            </div>
            <div className={`flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
              <button
                onClick={toggleLanguage}
                className="hover:text-gold-accent transition-colors"
                aria-label={t('toggleLanguage', { lang: language === 'en' ? 'Arabic' : 'English' })}
                aria-pressed={language === 'en' ? 'false' : 'true'}
              >
                {language === 'en' ? 'العربية' : 'English'}
              </button>
              <ThemeToggle />
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                className="bg-transparent border-none text-white focus:outline-none cursor-pointer"
                aria-label={t('selectCurrency')}
              >
                {currencies.map(curr => (
                  <option key={curr.code} value={curr.code} className="text-gray-900">
                    {curr.code} ({curr.symbol})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2" title={t('home')}>
              <img src={Logo} alt="Joud logo" className="h-20 w-auto" />
              <span className="text-2xl font-bold text-egyptian-blue"> cmona </span>
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <label htmlFor="desktop-search" className="sr-only">{t('search')}</label>
                <input
                  id="desktop-search"
                  type="text"
                  placeholder={t('search')}
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-egyptian-blue ${isRTL ? 'pe-10' : 'ps-10'}`}
                />
                <MagnifyingGlassIcon className={`absolute top-2.5 w-5 h-5 text-gray-400 ${isRTL ? 'right-3' : 'left-3'}`} />
              </div>
            </div>

            {/* Actions */}
            <div className={`flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
              <Link to="/account" className="p-2 hover:text-egyptian-blue transition-colors" aria-label={t('account')}>
                <UserIcon className="w-6 h-6" />
              </Link>
              <Link to="/wishlist" className="p-2 hover:text-egyptian-blue transition-colors" aria-label={t('wishlist')}>
                <HeartIcon className="w-6 h-6" />
              </Link>
              <button
                onClick={() => setCartOpen(true)}
                className="p-2 hover:text-egyptian-blue transition-colors relative"
                aria-label={t('openCart', { count: cartItemsCount })}
              >
                <ShoppingBagIcon className="w-6 h-6" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2"
                aria-label={mobileMenuOpen ? t('closeMenu') : t('openMenu')}
              >
                {mobileMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="border-t border-gray-200 hidden md:block" aria-label={t('mainNavigation')}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-center space-x-8">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="relative group"
                  onMouseEnter={() => setActiveCategoryId(category.id)}
                  onMouseLeave={() => setActiveCategoryId(null)}
                >
                  <Link
                    to={`/category/${category.slug}`}
                    className={`flex items-center py-4 px-2 text-gray-700 hover:text-egyptian-blue transition-colors ${isRTL ? 'space-x-reverse' : ''} space-x-1`}
                  >
                    <span>{isRTL ? category.nameAr : category.name}</span>
                    {category.children && (
                      <ChevronDownIcon className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                    )}
                  </Link>
                  {activeCategoryId === category.id && category.children && (
                    <MemoizedMegaMenu category={category} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            {/* Mobile Search */}
            <div className="p-4">
              <div className="relative">
                <label htmlFor="mobile-search" className="sr-only">{t('search')}</label>
                <input
                  id="mobile-search"
                  type="text"
                  placeholder={t('search')}
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-egyptian-blue ${isRTL ? 'pe-10' : 'ps-10'}`}
                />
                <MagnifyingGlassIcon className={`absolute top-2.5 w-5 h-5 text-gray-400 ${isRTL ? 'right-3' : 'left-3'}`} />
              </div>
            </div>

            {/* Mobile Navigation */}
            <div className="py-2">
              {categories.map((category) => (
                <div key={category.id}>
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="w-full flex justify-between px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-egyptian-blue transition-colors"
                  >
                    <span>{isRTL ? category.nameAr : category.name}</span>
                    {category.children && (
                      <ChevronDownIcon
                        className={`w-4 h-4 transition-transform ${expandedCategories.includes(category.id) ? 'rotate-180' : ''}`}
                      />
                    )}
                  </button>
                  {category.children && expandedCategories.includes(category.id) && (
                    <div className="ps-6">
                      {category.children.map((subCategory) => (
                        <Link
                          key={subCategory.id}
                          to={`/category/${subCategory.slug}`}
                          className="block px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-egyptian-blue"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {isRTL ? subCategory.nameAr : subCategory.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </header>

      <CartSidebar />
    </>
  );
};

export default Header;