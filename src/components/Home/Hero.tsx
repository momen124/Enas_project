import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useStore } from '../../store/useStore';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import cmon from '../../assets/cmon.jpg';

const Hero: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useStore();
  const isRTL = language === 'ar';

  const handleShopNowClick = useCallback(() => {
    document.querySelector('#shop-section')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-br from-primary-800 to-primary-600 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className={`${isRTL ? 'lg:order-2' : ''} animate-fade-in`}>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight text-text-primary drop-shadow-md">
              {t('heroTitle')}
            </h1>
            <p className="text-base sm:text-lg mb-6 text-text-secondary max-w-xl">
              {t('heroSubtitle')}
            </p>
            <div className={`flex space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
              <Link
                to="/shop"
                onClick={handleShopNowClick}
                className="bg-primary text-card px-6 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-all duration-300 flex items-center space-x-2 shadow-medium hover:shadow-glow"
                aria-label={t('shopNow')}
              >
                <ShoppingBagIcon className="w-5 h-5" />
                <span>{t('shopNow')}</span>
              </Link>
              <Link
                to="/about"
                className="border-2 border-border text-text-primary px-6 py-3 rounded-lg font-semibold hover:bg-hover-bg-color transition-all duration-300 flex items-center space-x-2 shadow-medium hover:shadow-glow"
                aria-label={t('learnMore', { defaultValue: 'Learn more about us' })}
              >
                <span>{t('learnMore', { defaultValue: 'Learn More' })}</span>
              </Link>
            </div>
            <div className="mt-6 text-sm text-text-secondary flex items-center space-x-2">
              <span>★ ★ ★ ★ ★</span>
              <span>{t('customerRating', { defaultValue: 'Rated 4.9/5 by 10k+ customers' })}</span>
            </div>
          </div>

          <div className={`${isRTL ? 'lg:order-1' : ''} animate-zoom-in`}>
            <div className="relative group">
              <img
                src={cmon}
                alt={t('heroImageAlt', { defaultValue: 'Luxurious Egyptian Cotton Bedding' })}
                loading="eager"
                className="rounded-xl shadow-medium w-full h-[40vh] sm:h-[50vh] object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-4 right-4 bg-primary text-card px-4 py-2 rounded-lg shadow-medium animate-slide-up">
                <div className="text-base font-semibold">40+ Years</div>
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