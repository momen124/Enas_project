'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useStore } from '@/store/useStore';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useStore();
  const isRTL = language === 'ar';

  return (
    <footer className="bg-[var(--background-color)] text-[var(--text-color)] border-t border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <h3 className="text-2xl font-bold text-[var(--primary-color)] mb-4">
              Cmon Elsonon
            </h3>
            <p className="text-[var(--secondary-text-color)] mb-4">
              {t('brandDescription')}
            </p>
            <div className={`flex space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
              <a href="#" className="text-[var(--secondary-text-color)] hover:text-[var(--primary-color)] transition-colors">
                Facebook
              </a>
              <a href="#" className="text-[var(--secondary-text-color)] hover:text-[var(--primary-color)] transition-colors">
                Instagram
              </a>
              <a href="#" className="text-[var(--secondary-text-color)] hover:text-[var(--primary-color)] transition-colors">
                Twitter
              </a>
            </div>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4 text-[var(--text-color)]">{t('customerService')}</h4>
            <div className="space-y-2">
              <Link href={`/${language}/static/about`} className="block text-[var(--secondary-text-color)] hover:text-[var(--text-color)] transition-colors">
                {t('aboutUs')}
              </Link>
              <Link href={`/${language}/shipping`} className="block text-[var(--secondary-text-color)] hover:text-[var(--text-color)] transition-colors">
                {t('shippingInfo')}
              </Link>
              <Link href={`/${language}/returns`} className="block text-[var(--secondary-text-color)] hover:text-[var(--text-color)] transition-colors">
                {t('returnPolicy')}
              </Link>
              <Link href={`/${language}/size-guide`} className="block text-[var(--secondary-text-color)] hover:text-[var(--text-color)] transition-colors">
                {t('sizeGuide')}
              </Link>
              <Link href={`/${language}/static/contact`} className="block text-[var(--secondary-text-color)] hover:text-[var(--text-color)] transition-colors">
                {t('contactUs')}
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-[var(--text-color)]">Quick Links</h4>
            <div className="space-y-2">
              <Link href={`/${language}/shop?category=bed-sheets`} className="block text-[var(--secondary-text-color)] hover:text-[var(--text-color)] transition-colors">
                {t('bedSheetsSets')}
              </Link>
              <Link href={`/${language}/shop?category=duvets`} className="block text-[var(--secondary-text-color)] hover:text-[var(--text-color)] transition-colors">
                {t('duvets')}
              </Link>
              <Link href={`/${language}/shop?category=towels-bathrobes`} className="block text-[var(--secondary-text-color)] hover:text-[var(--text-color)] transition-colors">
                {t('towelsBathrobes')}
              </Link>
              <Link href={`/${language}/shop?sale=true`} className="block text-[var(--secondary-text-color)] hover:text-[var(--text-color)] transition-colors">
                {t('sale')}
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4 text-[var(--text-color)]">{t('newsletter')}</h4>
            <p className="text-[var(--secondary-text-color)] mb-4">
              {t('newsletterDiscount')}
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Email"
                className={`flex-1 px-3 py-2 bg-[var(--card-bg-color)] border border-[var(--border-color)] rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] ${isRTL ? 'rounded-l-none rounded-r-lg' : ''}`}
              />
              <button className={`px-4 py-2 bg-[var(--primary-color)] text-[var(--card-bg-color)] rounded-r-lg hover:bg-opacity-90 transition-colors ${isRTL ? 'rounded-r-none rounded-l-lg' : ''}`}>
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-[var(--border-color)] mt-8 pt-8 text-center">
          <p className="text-[var(--secondary-text-color)]">
            {t('copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;