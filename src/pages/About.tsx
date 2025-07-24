import React from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from '../store/useStore';

const About: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useStore();
  const isRTL = language === 'ar';

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-egyptian-blue-900 to-egyptian-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {isRTL ? 'حول سي مون السونون' : 'About Cmon Elsonon'}
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              {isRTL 
                ? 'أكثر من ٤٠ عاماً من الخبرة في صناعة منتجات القطن المصري الفاخرة، نجمع بين التراث والحداثة لنقدم لك أفضل منتجات النوم والمنزل'
                : '40+ years of expertise in premium Egyptian cotton products, combining heritage craftsmanship with modern innovation to deliver the finest sleep and home essentials'
              }
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`${isRTL ? 'lg:order-2' : ''}`}>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {isRTL ? 'قصتنا' : 'Our Story'}
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  {isRTL
                    ? 'بدأت رحلتنا في أوائل الثمانينيات برؤية بسيطة: إنتاج أجود منتجات القطن المصري التي تجمع بين الجودة التقليدية والتصميم العصري. منذ ذلك الحين، نمت شركتنا لتصبح رائدة في صناعة المنسوجات المنزلية في مصر والمنطقة.'
                    : 'Founded in the early 1980s with a simple vision: to create the finest Egyptian cotton products that combine traditional quality with contemporary design. Since then, we have grown to become a leading manufacturer of premium home textiles in Egypt and the region.'
                  }
                </p>
                <p>
                  {isRTL
                    ? 'نحن نؤمن بأن النوم الجيد هو أساس الحياة الصحية، ولذلك نحرص على استخدام أجود أنواع القطن المصري طويل التيلة، والذي يتميز بنعومته الاستثنائية ومتانته العالية.'
                    : 'We believe that quality sleep is the foundation of a healthy life. That\'s why we exclusively use premium long-staple Egyptian cotton, renowned for its exceptional softness, durability, and breathability.'
                  }
                </p>
                <p>
                  {isRTL
                    ? 'اليوم، تواصل سي مون السونون تقديم منتجات عالية الجودة تلبي احتياجات العائلات المصرية والعالمية، مع الحفاظ على التراث والابتكار في كل قطعة ننتجها.'
                    : 'Today, Cmon Elsonon continues to deliver exceptional quality products that meet the needs of Egyptian families and international customers, maintaining our heritage of craftsmanship and innovation in every piece we create.'
                  }
                </p>
              </div>
            </div>
            <div className={`${isRTL ? 'lg:order-1' : ''}`}>
              <img
                src="https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Our Story"
                className="rounded-2xl shadow-xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {isRTL ? 'قيمنا' : 'Our Values'}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {isRTL
                ? 'نحن نسترشد بقيم أساسية تحدد كل ما نقوم به، من اختيار المواد الخام إلى تسليم المنتج النهائي'
                : 'We are guided by core values that define everything we do, from selecting raw materials to delivering the final product'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-egyptian-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-egyptian-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {isRTL ? 'الجودة' : 'Quality'}
              </h3>
              <p className="text-gray-600">
                {isRTL
                  ? 'نحن ملتزمون بأعلى معايير الجودة في كل خطوة من خطوات الإنتاج'
                  : 'We are committed to the highest quality standards in every step of production'
                }
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {isRTL ? 'الاستدامة' : 'Sustainability'}
              </h3>
              <p className="text-gray-600">
                {isRTL
                  ? 'نحرص على استخدام مواد صديقة للبيئة وممارسات إنتاج مستدامة'
                  : 'We prioritize eco-friendly materials and sustainable production practices'
                }
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gold-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gold-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {isRTL ? 'العملاء' : 'Customer Focus'}
              </h3>
              <p className="text-gray-600">
                {isRTL
                  ? 'رضا عملائنا هو هدفنا الأول، ونسعى دائماً لتجاوز توقعاتهم'
                  : 'Customer satisfaction is our top priority, and we strive to exceed expectations'
                }
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-egyptian-blue-600 mb-2">40+</div>
              <div className="text-gray-600">
                {isRTL ? 'سنة من الخبرة' : 'Years of Experience'}
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold text-egyptian-blue-600 mb-2">500K+</div>
              <div className="text-gray-600">
                {isRTL ? 'عميل راضٍ' : 'Happy Customers'}
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold text-egyptian-blue-600 mb-2">50+</div>
              <div className="text-gray-600">
                {isRTL ? 'منتج مختلف' : 'Different Products'}
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold text-egyptian-blue-600 mb-2">15</div>
              <div className="text-gray-600">
                {isRTL ? 'دولة نصدر إليها' : 'Countries Served'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-egyptian-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {isRTL 
              ? 'اكتشف مجموعتنا من منتجات القطن المصري الفاخرة'
              : 'Discover Our Premium Egyptian Cotton Collection'
            }
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            {isRTL
              ? 'تسوق الآن واحصل على أفضل منتجات النوم والمنزل'
              : 'Shop now and experience the finest sleep and home essentials'
            }
          </p>
          <a
            href="/shop"
            className="bg-gold-accent-500 text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gold-accent-400 transition-colors inline-block"
          >
            {isRTL ? 'تسوق الآن' : 'Shop Now'}
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;