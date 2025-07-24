import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  DevicePhoneMobileIcon
} from '@heroicons/react/24/outline';
import { useStore } from '../store/useStore';
import { toast } from 'react-hot-toast';

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useStore();
  const isRTL = language === 'ar';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    toast.success(isRTL ? 'تم إرسال رسالتك بنجاح' : 'Message sent successfully!');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const contactMethods = [
    {
      icon: PhoneIcon,
      title: isRTL ? 'اتصل بنا' : 'Call Us',
      details: ['+20 2 1234 5678', '+20 100 123 4567'],
      description: isRTL ? 'متاح من السبت إلى الخميس، 9 صباحاً - 6 مساءً' : 'Available Sat-Thu, 9 AM - 6 PM',
    },
    {
      icon: EnvelopeIcon,
      title: isRTL ? 'راسلنا' : 'Email Us',
      details: ['info@cmonelsonon.com', 'support@cmonelsonon.com'],
      description: isRTL ? 'سنرد عليك خلال 24 ساعة' : 'We\'ll respond within 24 hours',
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: isRTL ? 'محادثة مباشرة' : 'Live Chat',
      details: [isRTL ? 'محادثة فورية' : 'Instant messaging'],
      description: isRTL ? 'متاح من 9 صباحاً - 6 مساءً' : 'Available 9 AM - 6 PM',
    },
    {
      icon: DevicePhoneMobileIcon,
      title: isRTL ? 'واتساب' : 'WhatsApp',
      details: ['+20 100 123 4567'],
      description: isRTL ? 'تواصل سريع ومباشر' : 'Quick and direct communication',
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-egyptian-blue-900 to-egyptian-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {isRTL ? 'تواصل معنا' : 'Contact Us'}
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            {isRTL
              ? 'نحن هنا لمساعدتك. تواصل معنا لأي استفسار أو مساعدة تحتاجها'
              : 'We\'re here to help. Reach out to us for any questions or assistance you need'
            }
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <div key={index} className="text-center p-6 bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 bg-egyptian-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-egyptian-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {method.title}
                  </h3>
                  <div className="space-y-1 mb-2">
                    {method.details.map((detail, idx) => (
                      <p key={idx} className="text-egyptian-blue-600 font-medium">
                        {detail}
                      </p>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">
                    {method.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-sm border p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {isRTL ? 'أرسل لنا رسالة' : 'Send us a Message'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isRTL ? 'الاسم' : 'Name'} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-egyptian-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isRTL ? 'البريد الإلكتروني' : 'Email'} *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-egyptian-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isRTL ? 'رقم الهاتف' : 'Phone'}
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-egyptian-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isRTL ? 'الموضوع' : 'Subject'} *
                    </label>
                    <select
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-egyptian-blue-500"
                    >
                      <option value="">
                        {isRTL ? 'اختر الموضوع' : 'Select Subject'}
                      </option>
                      <option value="general">
                        {isRTL ? 'استفسار عام' : 'General Inquiry'}
                      </option>
                      <option value="order">
                        {isRTL ? 'استفسار عن الطلب' : 'Order Inquiry'}
                      </option>
                      <option value="product">
                        {isRTL ? 'استفسار عن المنتج' : 'Product Question'}
                      </option>
                      <option value="complaint">
                        {isRTL ? 'شكوى' : 'Complaint'}
                      </option>
                      <option value="wholesale">
                        {isRTL ? 'البيع بالجملة' : 'Wholesale Inquiry'}
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {isRTL ? 'الرسالة' : 'Message'} *
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    placeholder={isRTL ? 'اكتب رسالتك هنا...' : 'Write your message here...'}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-egyptian-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-egyptian-blue-600 text-white py-3 px-6 rounded-lg hover:bg-egyptian-blue-700 transition-colors font-semibold"
                >
                  {isRTL ? 'إرسال الرسالة' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Company Info */}
            <div className="space-y-8">
              {/* Office Location */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <MapPinIcon className="w-6 h-6 mr-2 text-egyptian-blue-600" />
                  {isRTL ? 'موقعنا' : 'Our Location'}
                </h3>
                <div className="space-y-2 text-gray-600">
                  <p className="font-medium">
                    {isRTL ? 'المقر الرئيسي' : 'Head Office'}
                  </p>
                  <p>
                    {isRTL 
                      ? '123 شارع النيل، الزمالك، القاهرة، مصر'
                      : '123 Nile Street, Zamalek, Cairo, Egypt'
                    }
                  </p>
                  <p>
                    {isRTL ? 'الرمز البريدي: 11211' : 'Postal Code: 11211'}
                  </p>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <ClockIcon className="w-6 h-6 mr-2 text-egyptian-blue-600" />
                  {isRTL ? 'ساعات العمل' : 'Business Hours'}
                </h3>
                <div className="space-y-2 text-gray-600">
                  <div className="flex justify-between">
                    <span>{isRTL ? 'السبت - الخميس' : 'Saturday - Thursday'}</span>
                    <span>{isRTL ? '9:00 ص - 6:00 م' : '9:00 AM - 6:00 PM'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{isRTL ? 'الجمعة' : 'Friday'}</span>
                    <span>{isRTL ? 'مغلق' : 'Closed'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{isRTL ? 'خدمة العملاء' : 'Customer Service'}</span>
                    <span>{isRTL ? '24/7' : '24/7'}</span>
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {isRTL ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">
                      {isRTL ? 'كم تستغرق عملية التوصيل؟' : 'How long does delivery take?'}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {isRTL 
                        ? 'عادة من 2-5 أيام عمل داخل القاهرة، و 3-7 أيام للمحافظات'
                        : 'Usually 2-5 business days within Cairo, 3-7 days for other governorates'
                      }
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">
                      {isRTL ? 'هل يمكنني إرجاع المنتج؟' : 'Can I return products?'}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {isRTL 
                        ? 'نعم، لديك 30 يوماً لإرجاع المنتج في حالته الأصلية'
                        : 'Yes, you have 30 days to return products in their original condition'
                      }
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">
                      {isRTL ? 'هل تقدمون خدمة البيع بالجملة؟' : 'Do you offer wholesale?'}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {isRTL 
                        ? 'نعم، نقدم أسعار خاصة للطلبات الكبيرة والتجار'
                        : 'Yes, we offer special pricing for bulk orders and retailers'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            {isRTL ? 'موقعنا على الخريطة' : 'Find Us on the Map'}
          </h2>
          <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPinIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">
                {isRTL ? 'خريطة تفاعلية ستظهر هنا' : 'Interactive map will be displayed here'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;