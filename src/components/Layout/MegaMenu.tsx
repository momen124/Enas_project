import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Category } from '../../types';
import { useStore } from '../../store/useStore';

interface MegaMenuProps {
  category: Category;
}

const MegaMenu: React.FC<MegaMenuProps> = ({ category }) => {
  const { language } = useStore();
  const isRTL = language === 'ar';

  if (!category.children) return null;

  return (
    <div className="absolute top-full left-0 w-screen max-w-xs bg-white shadow-lg border border-gray-200 rounded-lg mt-1 z-40">
      <div className="p-4">
        <h3 className="font-semibold text-egyptian-blue mb-3">
          {isRTL ? category.nameAr : category.name}
        </h3>
        <div className="space-y-2">
          {category.children.map((child) => (
            <Link
              key={child.id}
              to={`/category/${child.slug}`}
              className="block px-3 py-2 text-gray-600 hover:text-egyptian-blue hover:bg-gray-50 rounded transition-colors"
            >
              {isRTL ? child.nameAr : child.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;