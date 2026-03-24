
import React from 'react';
/* Fix: Explicitly ensuring correct Link import from react-router-dom */
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Globe } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { usePortfolio } from '../PortfolioContext';

const Home: React.FC = () => {
  const { t } = useLanguage();
  const { categories, loading, error } = usePortfolio();

  const scrollToProducts = () => {
    const section = document.getElementById('products-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gray-900 flex items-center overflow-hidden">
        {/* Background Image Overlay */}
        <div className="absolute inset-0">
          <img 
            src="https://i.imgur.com/DG8TSxb.png" 
            alt="Industrial Background" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              {t('home.heroTitle')} <br/>
              <span className="text-mandikBlue">{t('home.heroSubtitle')}</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
              {t('home.heroDesc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={scrollToProducts}
                className="bg-mandikBlue text-white px-8 py-4 rounded font-semibold hover:bg-cyan-600 transition-colors text-center"
              >
                {t('home.viewProducts')}
              </button>
              <Link to="/o-nas" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded font-semibold hover:bg-white hover:text-black transition-colors text-center">
                {t('home.aboutCompany')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section id="products-section" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('home.ourProducts')}</h2>
            <div className="w-20 h-1 bg-mandikBlue mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('home.ourProductsDesc')}
            </p>
          </div>

          {loading && (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-mandikBlue border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          {error && (
            <p className="text-center text-red-500 py-10">Nepodařilo se načíst produkty. ({error})</p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat, index) => (
              <Link 
                key={cat.slug} 
                to={`/${cat.slug}`}
                className="group relative h-80 overflow-hidden rounded-lg shadow-lg"
              >
                <img 
                  src={cat.gallery && cat.gallery.length > 0 ? cat.gallery[0].url : `https://picsum.photos/id/${100+index}/800/600`} 
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-90 transition-opacity duration-300"></div>
                
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-mandikBlue transition-colors">
                    {cat.name}
                  </h3>
                  <div className="flex items-center text-white/80 group-hover:text-white transition-colors">
                    <span className="text-sm font-medium mr-2">{t('home.showProducts')}</span>
                    <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Virtual Showroom Section */}
      <section className="bg-[#111] py-24 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            
            {/* Showroom Card */}
            <div className="flex flex-col items-center text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('home.virtualShowroom')}</h2>
              <p className="text-gray-400 mb-10 max-w-md text-lg">
                {t('home.discoverMore')}<br/>
                {t('home.showroomDesc')}
              </p>
              
              <div className="bg-gray-800/40 p-10 rounded-xl border border-gray-700/50 w-full max-w-md shadow-2xl">
                  <h3 className="font-bold text-xl mb-3 text-white">{t('home.availableOnline')}</h3>
                  <p className="text-base text-gray-400 mb-8">{t('home.showroomAction')}</p>
                  <a 
                    href="https://my.matterport.com/show/?m=MW8NFZmbZoo" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 bg-mandikBlue text-black font-bold px-8 py-4 rounded-lg hover:bg-cyan-400 transition-colors w-full text-lg"
                  >
                    <Globe size={22} /> {t('home.openShowroom')}
                  </a>
              </div>
            </div>

            {/* Rooftop Unit Card */}
            <div className="flex flex-col items-center text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('home.rooftopTitle')}</h2>
              <p className="text-gray-400 mb-10 max-w-md text-lg">
                {t('home.rooftopDesc')}
              </p>
              
              <div className="bg-gray-800/40 p-10 rounded-xl border border-gray-700/50 w-full max-w-md shadow-2xl">
                  <h3 className="font-bold text-xl mb-3 text-white">{t('home.virtualTour')}</h3>
                  <p className="text-base text-gray-400 mb-8">{t('home.explore3D')}</p>
                  <a 
                    href="https://my.matterport.com/show/?m=9jWQiP7UjyL" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 bg-mandikBlue text-black font-bold px-8 py-4 rounded-lg hover:bg-cyan-400 transition-colors w-full text-lg"
                  >
                    <Globe size={22} /> {t('home.openTour')}
                  </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('home.qualityTitle')}</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                {t('home.qualityDesc')}
              </p>
              
              <ul className="space-y-4">
                {(t('home.qualityList') as string[]).map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="text-mandikBlue flex-shrink-0" size={20} />
                    <span className="text-gray-800 font-medium">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <Link to="#" className="text-mandikBlue font-semibold hover:text-cyan-600 inline-flex items-center gap-2">
                  {t('home.moreQuality')} <ArrowRight size={18} />
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gray-100 rounded-xl -z-10 transform rotate-2"></div>
              <img 
                src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=1200&auto=format&fit=crop" 
                alt="Factory Interior" 
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
