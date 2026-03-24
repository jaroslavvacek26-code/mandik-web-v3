import React from 'react';
import { MapPin, Phone, Mail, Clock, Send, Building, MessageCircle } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const Contact: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Hero Header */}
      <div className="bg-mandikDark text-white py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl font-bold mb-4">{t('contact.title')}</h1>
          <div className="w-16 h-1 bg-mandikBlue mx-auto mb-6"></div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Headquarter Info Card */}
            <div className="lg:col-span-1 bg-white rounded-lg shadow-lg p-8 border-t-4 border-mandikBlue">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Building className="text-mandikBlue" /> {t('contact.headquarters')}
                </h2>
                
                <div className="space-y-6">
                    <div className="flex items-start gap-4">
                        <div className="bg-gray-100 p-3 rounded-full">
                            <MapPin className="text-mandikBlue" size={24} />
                        </div>
                        <div>
                            <p className="font-bold text-gray-900">MANDÍK, a.s.</p>
                            <p className="text-gray-600">Dobříšská 550</p>
                            <p className="text-gray-600">267 24 Hostomice</p>
                            <p className="text-gray-600">
                                {language === 'cz' ? 'Česká republika' : (language === 'de' ? 'Tschechische Republik' : 'Czech Republic')}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="bg-gray-100 p-3 rounded-full">
                            <Phone className="text-mandikBlue" size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">{t('contact.reception')}</p>
                            <a href="tel:+420311706706" className="font-bold text-gray-900 hover:text-mandikBlue transition-colors">+420 311 706 706</a>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="bg-gray-100 p-3 rounded-full">
                            <Mail className="text-mandikBlue" size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">{t('contact.email')}</p>
                            <a href="mailto:mandik@mandik.cz" className="font-bold text-gray-900 hover:text-mandikBlue transition-colors">mandik@mandik.cz</a>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="bg-gray-100 p-3 rounded-full">
                            <Clock className="text-mandikBlue" size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">{t('contact.openingHours')}</p>
                            <p className="font-bold text-gray-900">{t('contact.openingHoursValue')}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-100">
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                        <div>
                            <span className="block font-semibold text-gray-700">IČO:</span> 26718405
                        </div>
                        <div>
                            <span className="block font-semibold text-gray-700">DIČ:</span> CZ26718405
                        </div>
                    </div>
                </div>
            </div>

            {/* Map & Form Section */}
            <div className="lg:col-span-2 space-y-8">
                {/* Map */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden h-[300px] lg:h-[400px]">
                    <iframe 
                        src="https://maps.google.com/maps?q=Dob%C5%99%C3%AD%C5%A1sk%C3%A1+550,+267+24+Hostomice+pod+Brdy&t=&z=17&ie=UTF8&iwloc=&output=embed"
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen 
                        loading="lazy"
                        title="Mandík Map"
                    ></iframe>
                </div>
            </div>
        </div>

        {/* Contact Departments Grid */}
        <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{t('contact.departments')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(t('contact.depts') as any[]).map((dept, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-mandikBlue hover:shadow-md transition-all group">
                        <h3 className="font-bold text-gray-900 mb-3 group-hover:text-mandikBlue transition-colors">{dept.title}</h3>
                        <div className="space-y-2 text-sm">
                            <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-mandikBlue">
                                <Mail size={16} /> info@mandik.cz
                            </a>
                            <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-mandikBlue">
                                <Phone size={16} /> +420 311 706 706
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Contact Form */}
        <div className="mt-16 bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-10 md:p-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{t('contact.formTitle')}</h2>
                    <p className="text-gray-500 mb-8">
                        {t('contact.formSubtitle')}
                    </p>
                    
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t('contact.formName')}</label>
                                <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-mandikBlue focus:border-transparent outline-none transition-all" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t('contact.formPhone')}</label>
                                <input type="tel" className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-mandikBlue focus:border-transparent outline-none transition-all" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('contact.email')}</label>
                            <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-mandikBlue focus:border-transparent outline-none transition-all" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('contact.formSubject')}</label>
                            <select className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-mandikBlue focus:border-transparent outline-none transition-all bg-white">
                                {(t('contact.subjects') as string[]).map((subj, i) => (
                                    <option key={i}>{subj}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('contact.formMessage')}</label>
                            <textarea rows={4} className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-mandikBlue focus:border-transparent outline-none transition-all"></textarea>
                        </div>
                        
                        <button type="button" className="w-full md:w-auto bg-mandikBlue text-white px-8 py-3 rounded font-bold hover:bg-cyan-600 transition-colors flex items-center justify-center gap-2">
                            {t('contact.send')} <Send size={18} />
                        </button>
                    </form>
                </div>
                <div className="hidden md:block relative">
                    <img 
                        src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop" 
                        alt="Office" 
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-mandikBlue/20"></div>
                </div>
            </div>
        </div>
        
        {/* Online Support Chat */}
        <div className="mt-12 bg-gray-900 rounded-lg shadow-xl p-8 flex flex-col md:flex-row items-center justify-between text-white">
            <div className="flex items-center gap-4 mb-6 md:mb-0">
                <div className="bg-green-500/20 p-3 rounded-full">
                    <MessageCircle className="text-green-400" size={32} />
                </div>
                <div>
                    <h3 className="text-xl font-bold">Online podpora</h3>
                    <p className="text-gray-400 text-sm">Jsme online a připraveni vám pomoci s vašimi dotazy.</p>
                </div>
            </div>
            <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg hover:shadow-green-500/30 flex items-center gap-2">
                Zahájit chat <MessageCircle size={18} />
            </button>
        </div>

      </div>
    </div>
  );
};

export default Contact;