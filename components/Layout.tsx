
import React, { useState } from 'react';
/* Fix: Explicitly ensuring correct imports from react-router-dom for v6 compatibility */
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone, Mail, Globe, Search } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { usePortfolio } from '../PortfolioContext';
import { Language } from '../types';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();
  const { categories } = usePortfolio();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setIsLangMenuOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-800 bg-white">
      {/* Top Utility Bar */}
      <div className="bg-mandikDark text-white text-xs py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex space-x-6">
            <span className="flex items-center gap-2"><Phone size={14} className="text-mandikBlue" /> +420 311 706 706</span>
            <span className="flex items-center gap-2"><Mail size={14} className="text-mandikBlue" /> mandik@mandik.cz</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 flex items-center group">
              <img 
                src="https://i.imgur.com/7FUNoOd.jpeg" 
                alt="MANDÍK" 
                className="h-8 md:h-10 w-auto"
              />
            </Link>

            {/* Desktop Menu */}
            <nav className="hidden md:flex space-x-8 items-center">
              <Link 
                to="/" 
                className={`text-sm font-semibold uppercase tracking-wide hover:text-mandikBlue transition-colors ${location.pathname === '/' ? 'text-mandikBlue' : 'text-gray-700'}`}
              >
                {t('nav.home')}
              </Link>
              
              <div className="relative group h-20 flex items-center">
                <button className="text-sm font-semibold uppercase tracking-wide hover:text-mandikBlue transition-colors flex items-center gap-1 text-gray-700">
                  {t('nav.products')} <ChevronDown size={14} />
                </button>
                {/* Mega Menu Dropdown */}
                <div className="absolute top-20 left-0 w-72 bg-white shadow-xl border-t-2 border-mandikBlue opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                  <div className="py-2 max-h-[80vh] overflow-y-auto">
                    {categories.map((cat) => (
                      <Link 
                        key={cat.slug} 
                        to={`/${cat.slug}`}
                        className="block px-6 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-mandikBlue border-l-2 border-transparent hover:border-mandikBlue transition-all"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <Link 
                to="/o-nas" 
                className={`text-sm font-semibold uppercase tracking-wide hover:text-mandikBlue transition-colors ${location.pathname === '/o-nas' ? 'text-mandikBlue' : 'text-gray-700'}`}
              >
                {t('nav.about')}
              </Link>
              <Link 
                to="/kontakt" 
                className={`text-sm font-semibold uppercase tracking-wide hover:text-mandikBlue transition-colors ${location.pathname === '/kontakt' ? 'text-mandikBlue' : 'text-gray-700'}`}
              >
                {t('nav.contact')}
              </Link>
            </nav>

            {/* Right Icons */}
            <div className="hidden md:flex items-center space-x-6">
              <button className="p-2 text-gray-500 hover:text-mandikBlue transition-colors" title={t('nav.search')}>
                <Search size={20} />
              </button>
              
              <a 
                href="https://mansel.online/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-mandikBlue text-white px-4 py-1.5 rounded hover:bg-cyan-600 transition-colors flex flex-col items-center justify-center text-center leading-none"
              >
                 <span className="text-[10px] font-semibold uppercase tracking-wide opacity-90">{t('nav.designProgram')}</span>
                 <span className="text-sm font-bold uppercase tracking-wider">MANSEL</span>
              </a>

              {/* Language Selector */}
              <div className="relative">
                <button 
                  className="flex items-center gap-1 text-sm font-semibold uppercase tracking-wide text-gray-700 hover:text-mandikBlue transition-colors"
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                >
                  {language} <ChevronDown size={14}/>
                </button>
                
                {isLangMenuOpen && (
                  <div className="absolute top-8 right-0 bg-white shadow-xl border border-gray-100 rounded py-2 z-50 w-24">
                    {['cz', 'en', 'de'].map((lang) => (
                      <button 
                        key={lang}
                        className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 hover:text-mandikBlue uppercase ${language === lang ? 'font-bold text-mandikBlue' : 'text-gray-700'}`}
                        onClick={() => handleLanguageChange(lang as Language)}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button onClick={toggleMobileMenu} className="text-gray-700 hover:text-mandikBlue p-2">
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0 shadow-lg h-screen overflow-y-auto pb-40">
            <div className="px-4 pt-2 pb-4 space-y-1">
              <div className="flex justify-end p-2 gap-4 text-sm font-bold">
                 {['cz', 'en', 'de'].map((lang) => (
                    <button 
                      key={lang}
                      onClick={() => handleLanguageChange(lang as Language)}
                      className={`uppercase ${language === lang ? 'text-mandikBlue' : 'text-gray-600'}`}
                    >
                      {lang}
                    </button>
                 ))}
              </div>
              <Link to="/" onClick={toggleMobileMenu} className="block px-3 py-4 text-base font-medium text-gray-900 border-b border-gray-100">{t('nav.home')}</Link>
              <div className="px-3 py-4 border-b border-gray-100">
                <span className="block text-base font-medium text-gray-500 mb-2 uppercase text-xs">{t('nav.products')}</span>
                {categories.map((cat) => (
                  <Link 
                    key={cat.slug}
                    to={`/${cat.slug}`} 
                    onClick={toggleMobileMenu}
                    className="block py-2 pl-4 text-base text-gray-800 hover:text-mandikBlue"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
              <Link to="/o-nas" onClick={toggleMobileMenu} className="block px-3 py-4 text-base font-medium text-gray-900 border-b border-gray-100">{t('nav.about')}</Link>
              <Link to="/kontakt" onClick={toggleMobileMenu} className="block px-3 py-4 text-base font-medium text-gray-900 border-b border-gray-100">{t('nav.contact')}</Link>
              <div className="px-3 py-4">
                 <a 
                    href="https://mansel.online/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-mandikBlue text-white text-center px-4 py-3 rounded font-bold uppercase"
                  >
                    {t('nav.designProgram')} MANSEL
                  </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-mandikDark text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            
            {/* Column 1: Brand */}
            <div>
              <Link to="/" className="block mb-6">
                <img 
                    src="https://i.imgur.com/rSApEwW.jpeg" 
                    alt="MANDÍK" 
                    className="h-8 w-auto" 
                />
              </Link>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {t('footer.desc')}
              </p>
              <div className="flex space-x-4">
                 {/* Social placeholders */}
                 <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-mandikBlue transition-colors cursor-pointer"><Globe size={16}/></div>
              </div>
            </div>

            {/* Column 2: Rychlé odkazy */}
            <div>
              <h3 className="text-lg font-semibold mb-6 border-l-4 border-mandikBlue pl-3">{t('footer.quickLinks')}</h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><Link to="/" className="hover:text-white transition-colors">{t('footer.intro')}</Link></li>
                <li><Link to="/o-nas" className="hover:text-white transition-colors">{t('nav.about')}</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">{t('footer.cert')}</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">{t('footer.download')}</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">{t('footer.gdpr')}</Link></li>
              </ul>
            </div>

            {/* Column 3: Produkty */}
            <div>
              <h3 className="text-lg font-semibold mb-6 border-l-4 border-mandikBlue pl-3">{t('nav.products')}</h3>
              <ul className="space-y-3 text-sm text-gray-400">
                {categories.slice(0, 6).map(cat => (
                  <li key={cat.slug}>
                    <Link to={`/${cat.slug}`} className="hover:text-white transition-colors">
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Kontakt */}
            <div>
              <h3 className="text-lg font-semibold mb-6 border-l-4 border-mandikBlue pl-3">{t('nav.contact')}</h3>
              <ul className="space-y-4 text-sm text-gray-400">
                <li className="flex items-start gap-3">
                  <div className="mt-1"><Globe size={16} /></div>
                  <span>Dobříšská 550, 267 24 Hostomice<br/>{language === 'cz' ? 'Česká republika' : (language === 'de' ? 'Tschechische Republik' : 'Czech Republic')}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={16} />
                  <span>+420 311 706 706</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={16} />
                  <span>mandik@mandik.cz</span>
                </li>
                <li>
                  <Link to="/kontakt" className="text-mandikBlue hover:text-white transition-colors font-medium">
                      {t('footer.gotoContact')} &rarr;
                  </Link>
                </li>
              </ul>
            </div>

          </div>
          <div className="border-t border-gray-800 mt-16 pt-8 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} {t('footer.rights')}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
