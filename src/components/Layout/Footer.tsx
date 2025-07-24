import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useStore } from '../../store/useStore';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useStore();
  const isRTL = language === 'ar';

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <h3 className="text-2xl font-bold text-gold-accent mb-4">
              Cmon Elsonon
            </h3>
            <p className="text-gray-300 mb-4">
              {isRTL 
                ? 'خبرة تزيد عن ٤٠ عاماً في صناعة منتجات القطن المصري الفاخر'
                : '40+ years of expertise in premium Egyptian cotton products'
              }
            </p>
            <div className={`flex space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
              <a href="#" className="text-gray-300 hover:text-gold-accent transition-colors">
                Facebook
              </a>
              <a href="#" className="text-gray-300 hover:text-gold-accent transition-colors">
                Instagram
              </a>
              <a href="#" className="text-gray-300 hover:text-gold-accent transition-colors">
                Twitter
              </a>
            </div>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4">{t('customerService')}</h4>
            <div className="space-y-2">
              <Link to="/about" className="block text-gray-300 hover:text-white transition-colors">
                {t('aboutUs')}
              </Link>
              <Link to="/shipping" className="block text-gray-300 hover:text-white transition-colors">
                {t('shippingInfo')}
              </Link>
              <Link to="/returns" className="block text-gray-300 hover:text-white transition-colors">
                {t('returnPolicy')}
              </Link>
              <Link to="/size-guide" className="block text-gray-300 hover:text-white transition-colors">
                {t('sizeGuide')}
              </Link>
              <Link to="/contact" className="block text-gray-300 hover:text-white transition-colors">
                {t('contactUs')}
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link to="/category/bed-sheets" className="block text-gray-300 hover:text-white transition-colors">
                {t('bedSheetsSets')}
              </Link>
              <Link to="/category/duvets" className="block text-gray-300 hover:text-white transition-colors">
                {t('duvets')}
              </Link>
              <Link to="/category/towels-bathrobes" className="block text-gray-300 hover:text-white transition-colors">
                {t('towelsBathrobes')}
              </Link>
              <Link to="/category/sale" className="block text-gray-300 hover:text-white transition-colors">
                {t('sale')}
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4">{t('newsletter')}</h4>
            <p className="text-gray-300 mb-4">
              {t('newsletterDiscount')}
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Email"
                className={`flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-egyptian-blue ${isRTL ? 'rounded-l-none rounded-r-lg' : ''}`}
              />
              <button className={`px-4 py-2 bg-egyptian-blue text-white rounded-r-lg hover:bg-blue-700 transition-colors ${isRTL ? 'rounded-r-none rounded-l-lg' : ''}`}>
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            {t('copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;