import React from 'react';
import { Flag, Building2 } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const About: React.FC = () => {
  const { t } = useLanguage();
  const milestones = t('about.milestones');

  return (
    <div className="bg-white">
      {/* Hero Header */}
      <div className="bg-mandikDark text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
           {/* Abstract lines or pattern could go here */}
           <div className="absolute right-0 top-0 w-96 h-96 bg-mandikBlue rounded-full blur-[100px] transform translate-x-1/2 -translate-y-1/2"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('about.title')}</h1>
          <div className="w-20 h-1 bg-mandikBlue mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {t('about.subtitle')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* History Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
            <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Building2 className="text-mandikBlue" size={32} />
                    {t('about.historyTitle')}
                </h2>
                <div className="prose prose-lg text-gray-600 space-y-4 leading-relaxed text-justify">
                    <p>{t('about.historyText1')}</p>
                    <p>{t('about.historyText2')}</p>
                    <p className="font-medium text-gray-800 border-l-4 border-mandikBlue pl-4 italic">
                        {t('about.historyText3')}
                    </p>
                </div>
            </div>
            <div className="relative">
                <div className="aspect-[4/5] bg-gray-100 rounded-lg overflow-hidden shadow-2xl relative">
                     <img 
                        src="https://i.imgur.com/mBTzyFE.jpeg" 
                        alt="Výroba Mandík" 
                        className="w-full h-full object-cover"
                     />
                     <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
                        <p className="text-white font-medium">{t('about.imageCaption')}</p>
                     </div>
                </div>
                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gray-100 rounded-full -z-10"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-mandikBlue/10 rounded-full -z-10"></div>
            </div>
        </div>

        {/* Milestones Section */}
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center flex items-center justify-center gap-3">
                <Flag className="text-mandikBlue" size={32} />
                {t('about.milestonesTitle')}
            </h2>

            <div className="relative border-l-2 border-mandikBlue/20 ml-4 md:ml-0 space-y-12">
                {milestones.map((item: any, index: number) => (
                    <div key={index} className="relative pl-8 md:pl-0">
                        {/* Desktop: Odd items left, Even items right. Mobile: All right of line */}
                        <div className={`md:flex items-center justify-between ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                            
                            {/* Dot on the timeline */}
                            <div className="absolute left-[-5px] top-0 md:left-1/2 md:-ml-[5px] w-3 h-3 rounded-full bg-mandikBlue ring-4 ring-white shadow-sm"></div>

                            {/* Content Box */}
                            <div className="md:w-[45%] mb-2 md:mb-0">
                                <div className="p-6 bg-white rounded-lg shadow-md border-t-4 border-mandikBlue hover:shadow-lg transition-shadow text-left">
                                    {/* Updated: Year is now black (gray-900) and removed the -z-10 to be fully visible. Text is always left aligned. */}
                                    <span className="hidden md:block text-4xl font-black text-gray-900 float-right ml-4 select-none">
                                        {item.year}
                                    </span>
                                    {/* Mobile year */}
                                    <div className="md:hidden text-2xl font-bold text-gray-900 mb-2">{item.year}</div>
                                    
                                    <h3 className="text-xl font-bold text-mandikBlue mb-1">{item.title}</h3>
                                    <p className="text-gray-600 leading-relaxed text-sm">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>

                            {/* Empty space for the other side */}
                            <div className="md:w-[45%]"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

      </div>
    </div>
  );
};

export default About;