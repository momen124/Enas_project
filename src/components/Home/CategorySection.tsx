import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useStore } from '../../store/useStore';
import { Button } from '@headlessui/react';

// Dynamic categories (replace with backend data in production)
const categories = [
  {
    id: '1',
    name: { en: 'Bedding', ar: 'الفراش' },
    slug: 'bedding',
    image: 'https://images.pexels.com/photos/1099816/pexels-photo-1099816.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: '2',
    name: { en: 'Bath', ar: 'الحمام' },
    slug: 'bath',
    image: 'https://images.pexels.com/photos/6197119/pexels-photo-6197119.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: '3',
    name: { en: 'Decor', ar: 'الديكور' },
    slug: 'decor',
    image: 'https://images.pexels.com/photos/5996971/pexels-photo-5996971.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: '4',
    name: { en: 'Kitchen', ar: 'المطبخ' },
    slug: 'kitchen',
    image: 'https://images.pexels.com/photos/3747234/pexels-photo-3747234.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: '5',
    name: { en: 'Living Room', ar: 'غرفة المعيشة' },
    slug: 'living-room',
    image: 'https://images.pexels.com/photos/276624/pexels-photo-276624.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: '6',
    name: { en: 'Outdoor', ar: 'الخارجي' },
    slug: 'outdoor',
    image: 'https://images.pexels.com/photos/1679646/pexels-photo-1679646.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
];

const CategorySection: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useStore();
  const isRTL = language === 'ar';
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // Touch support
  let touchStartX = 0;
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX = e.touches[0].clientX;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (scrollRef.current) {
      const touchEndX = e.touches[0].clientX;
      const diff = touchStartX - touchEndX;
      scrollRef.current.scrollBy({ left: diff, behavior: 'smooth' });
      touchStartX = touchEndX;
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-semibold text-text-primary">
            {t('exploreCollections', { defaultValue: 'Explore Each Unique Collection' })}
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mt-2 rounded" data-testid="divider"></div>
        </div>

        <div className="relative">
          <Button
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-card shadow-medium hover:bg-hover-bg-color rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={() => scroll('left')}
            aria-label={t('scrollLeft', { defaultValue: 'Scroll categories left' })}
          >
            <ChevronLeftIcon className={`h-5 w-5 text-text-primary ${isRTL ? 'rotate-180' : ''}`} />
          </Button>

          <nav
            ref={scrollRef}
            className="overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            aria-label={t('categoryCarousel', { defaultValue: 'Category carousel' })}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
          >
            <div className={`flex gap-4 sm:gap-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/categories/${category.slug}`}
                  className="flex-shrink-0 group snap-center"
                  aria-label={isRTL ? category.name.ar : category.name.en}
                >
                  <div className="w-40 sm:w-48 text-center">
                    <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden mb-3 bg-neutral-100 group-hover:scale-105 transition-transform duration-300">
                      <img
                        src={category.image}
                        alt={isRTL ? category.name.ar : category.name.en}
                        className="object-cover w-full h-full"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="text-base sm:text-lg font-medium text-text-primary group-hover:text-secondary-500 transition-colors">
                      {isRTL ? category.name.ar : category.name.en}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </nav>

          <Button
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-card shadow-medium hover:bg-hover-bg-color rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={() => scroll('right')}
            aria-label={t('scrollRight', { defaultValue: 'Scroll categories right' })}
          >
            <ChevronRightIcon className={`h-5 w-5 text-text-primary ${isRTL ? 'rotate-180' : ''}`} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;