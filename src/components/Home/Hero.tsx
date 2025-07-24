import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useStore } from '../../store/useStore';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import cmon from  '../../assets/cmon.jpg'

const Hero: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useStore();
  const isRTL = language === 'ar';

  const handleShopNowClick = useCallback(() => {
    document.querySelector('#shop-section')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-egyptian-blue-800 via-egyptian-blue-900 to-deep-navy-500 text-cream-white-50 py-24 overflow-hidden">
      {/* Enhanced Egyptian Pattern Overlay */}
      <div className="absolute inset-0 opacity-20 mix-blend-overlay">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e0bc94' fill-opacity='0.3'%3E%3Cpath d='M50 50c0-15.464-12.536-28-28-28s-28 12.536-28 28 12.536 28 28 28 28-12.536 28-28zm0 0c0 15.464 12.536 28 28 28s28-12.536 28-28-12.536-28-28-28-28 12.536-28 28z'/%3E%3Cpath d='M10 10h80v80H10z' fill='%23f8eed0' fill-opacity='0.1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '20px 20px',
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={`${isRTL ? 'lg:order-2' : ''} animate-fade-in`}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight tracking-wide text-cream-white-100 drop-shadow-lg">
              {t('heroTitle')}
            </h1>
            <p className="text-lg md:text-xl mb-8 text-sand-beige-200">
              {t('heroSubtitle')}
            </p>
            <div className={`flex space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
              <Link
                to="/shop"
                onClick={handleShopNowClick}
                className="bg-gold-accent-500 text-deep-navy-900 px-6 py-3 rounded-xl font-semibold hover:bg-gold-accent-600 transition-all duration-300 inline-flex items-center space-x-2 shadow-md hover:shadow-lg"
                aria-label={t('shopNow')}
              >
                <ShoppingBagIcon className="w-5 h-5" />
                <span>{t('shopNow')}</span>
              </Link>
              <Link
                to="/about"
                className="border-2 border-nile-teal-400 text-nile-teal-300 px-6 py-3 rounded-xl font-semibold hover:bg-nile-teal-500 hover:text-cream-white-50 transition-all duration-300 inline-flex items-center space-x-2 shadow-md hover:shadow-lg"
                aria-label="Learn more about us"
              >
                <span>Learn More</span>
              </Link>
            </div>
            <div className="mt-6 text-sm text-sand-beige-300">
              <span>★ ★ ★ ★ ★</span> <span>{t('customerRating', { defaultValue: 'Rated 4.9/5 by 10k+ customers' })}</span>
            </div>
          </div>

          <div className={`${isRTL ? 'lg:order-1' : ''} animate-zoom-in`}>
            <div className="relative group">
              <img
                src={cmon}
                alt={t('heroImageAlt', { defaultValue: 'Luxurious Egyptian Cotton Bedding' })}
                loading="lazy"
                className="rounded-2xl shadow-2xl w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute -bottom-8 -right-8 bg-gold-accent-600 text-deep-navy-900 p-5 rounded-xl shadow-2xl animate-slide-up">
                <div className="text-lg font-bold">40+ Years</div>
                <div className="text-sm">of Craftsmanship</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;