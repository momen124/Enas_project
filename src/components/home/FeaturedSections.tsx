'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { useStore } from '@/store/useStore';
import { products } from '@/data/mockData';
import ProductCard from '@/components/product/ProductCard';

const FeaturedSections: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useStore();
  const isRTL = language === 'ar';

  const newArrivals = products.filter((p) => p.newArrival).slice(0, 4);
  const bestSellers = products.filter((p) => p.bestseller).slice(0, 4);
  const featured = products.filter((p) => p.featured).slice(0, 4);

  const Section = ({ title, products, viewAllLink }: { title: string; products: typeof newArrivals; viewAllLink: string }) => (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-[var(--text-color)]">{title}</h2>
          <Link
            href={`/${language}${viewAllLink}`}
            className={`flex items-center text-[var(--primary-color)] hover:text-opacity-90 transition-colors space-x-1 ${isRTL ? 'space-x-reverse' : ''}`}
          >
            <span>View All</span>
            <ChevronRightIcon className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );

  return (
    <div className="bg-[var(--background-color)]">
      <Section title={t('newArrivals')} products={newArrivals} viewAllLink="/shop?filter=new" />
      <div className="bg-[var(--card-bg-color)]">
        <Section title={t('bestSellers')} products={bestSellers} viewAllLink="/shop?filter=bestseller" />
      </div>
      <Section title={t('myCuteBsbs')} products={featured} viewAllLink="/shop?filter=featured" />
    </div>
  );
};

export default FeaturedSections;