
import React, { useMemo, useState } from 'react';
/* Fix: Explicitly ensuring correct useParams and Link imports from react-router-dom */
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Download, FileText, ArrowLeft, Check, ShieldCheck, FileCheck } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { usePortfolio } from '../PortfolioContext';
import { Product, CharacteristicItem } from '../types';

const ProductDetail: React.FC = () => {
  const { categorySlug, productSlug } = useParams<{ categorySlug: string; productSlug: string }>();
  const { language, t } = useLanguage();
  const { categories, loading, error } = usePortfolio();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const data = useMemo(() => {
    const category = categories.find(c => c.slug === categorySlug);

    if (!category) return { category: null, product: null };

    // Search in direct groups
    let product = category.groups.find(p => p.slug === productSlug);

    // Search in subcategories if not found
    if (!product) {
        for (const sub of category.subcategories) {
            const found = sub.groups.find(p => p.slug === productSlug);
            if (found) {
                product = found;
                break;
            }
        }
    }

    return { category, product };
  }, [categories, categorySlug, productSlug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-mandikBlue border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <p className="text-red-500 mb-4">Nepodařilo se načíst produkt. ({error})</p>
        <Link to="/" className="bg-mandikBlue text-white px-4 py-2 rounded">{t('product.backToHome')}</Link>
      </div>
    );
  }

  if (!data.category || !data.product) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('product.notFound')}</h2>
            <Link to="/" className="bg-mandikBlue text-white px-4 py-2 rounded">{t('product.backToHome')}</Link>
        </div>
    );
  }

  const { category, product } = data;

  // Helper to render characteristics which can be string or object
  const renderCharacteristic = (char: string | CharacteristicItem) => {
      if (typeof char === 'string') return char;
      return char.characteristic;
  };

  // Helper to translate specific technical terms in file names
  const translateDownloadName = (name: string, lang: string) => {
    if (lang === 'cz') return name;
    
    const dict: Record<string, Record<string, string>> = {
        'en': {
            'Technické podmínky': 'Technical Conditions',
            'Návod k instalaci': 'Installation Manual',
            'Návod k montáži': 'Mounting Manual',
            'Certifikát': 'Certificate',
            'Prohlášení o vlastnostech': 'Declaration of Performance',
            'Hygienické posouzení': 'Hygiene Assessment',
            'Prohlášení o shodě': 'Declaration of Conformity',
            'Dodatek': 'Supplement',
            'Technický list': 'Technical Sheet',
            'Leták': 'Flyer',
            'Katalog': 'Catalog',
            'Návod k použití': 'User Manual',
            'Montážní předpisy': 'Mounting Regulations'
        },
        'de': {
            'Technické podmínky': 'Technische Bedingungen',
            'Návod k instalaci': 'Installationsanleitung',
            'Návod k montáži': 'Montageanleitung',
            'Certifikát': 'Zertifikat',
            'Prohlášení o vlastnostech': 'Leistungserklärung',
            'Hygienické posouzení': 'Hygienebeurteilung',
            'Prohlášení o shodě': 'Konformitätserklärung',
            'Dodatek': 'Anhang',
            'Technický list': 'Datenblatt',
            'Leták': 'Flugblatt',
            'Katalog': 'Katalog',
            'Návod k použití': 'Benutzerhandbuch',
            'Montážní předpisy': 'Montagevorschriften'
        }
    };

    let translated = name;
    const terms = dict[lang] || {};
    
    // Sort keys by length desc to replace longer phrases first
    const keys = Object.keys(terms).sort((a, b) => b.length - a.length);

    for (const key of keys) {
        if (translated.includes(key)) {
            translated = translated.replace(key, terms[key]);
        }
    }
    
    return translated;
  };

  // Helper to group downloads by type
  const groupedDownloads = useMemo(() => {
      if (!product.downloads) return {};
      
      return product.downloads.reduce((acc, file) => {
          // Normalize key for grouping logic
          let key = 'others';
          const lowerType = file.type.toLowerCase();
          const lowerName = file.name.toLowerCase();
          
          if (lowerType.includes('technická') || lowerType.includes('technical')) key = 'technicalDoc';
          else if (lowerType.includes('certifikát') || lowerType.includes('prohlášení') || lowerType.includes('certificate') || lowerType.includes('declaration')) key = 'certificates';
          else if (lowerType.includes('revit') || lowerName.includes('revit') || file.mime_type === 'application/zip') key = 'revit';
          else key = 'others';

          if (!acc[key]) acc[key] = [];
          acc[key].push(file);
          return acc;
      }, {} as Record<string, typeof product.downloads>);
  }, [product.downloads]);

  // Order of groups
  const groupOrder = ['technicalDoc', 'certificates', 'revit', 'others'];

  return (
    <div className="bg-white pb-20">
       {/* Breadcrumbs */}
       <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex text-sm text-gray-500 overflow-x-auto whitespace-nowrap">
                <Link to="/" className="hover:text-mandikBlue">{t('nav.home')}</Link>
                <ChevronRight size={16} className="mx-2" />
                <Link to={`/${category.slug}`} className="hover:text-mandikBlue">{category.name}</Link>
                <ChevronRight size={16} className="mx-2" />
                <span className="text-gray-900 font-medium">{product.name}</span>
            </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <Link to={`/${category.slug}`} className="inline-flex items-center text-gray-500 hover:text-mandikBlue mb-8 transition-colors">
            <ArrowLeft size={16} className="mr-2"/> {t('product.backToCat')}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-16">
            {/* Left: Image Gallery */}
            <div className="space-y-4">
                <div className="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden shadow-lg border border-gray-200 flex items-center justify-center p-4">
                    {product.gallery.length > 0 ? (
                        <img 
                            src={product.gallery[selectedImageIndex].url} 
                            alt={product.name} 
                            className="w-full h-full object-contain"
                        />
                    ) : (
                        <div className="text-gray-400">No Image Available</div>
                    )}
                </div>
                {/* Thumbnails */}
                {product.gallery.length > 1 && (
                    <div className="grid grid-cols-5 gap-4">
                        {product.gallery.map((item, i) => (
                            <div 
                                key={i} 
                                className={`aspect-square bg-gray-100 rounded cursor-pointer border-2 transition-all p-1 flex items-center justify-center ${selectedImageIndex === i ? 'border-mandikBlue' : 'border-transparent hover:border-gray-300'}`}
                                onClick={() => setSelectedImageIndex(i)}
                            >
                                <img src={item.url} className="w-full h-full object-contain rounded" alt="" />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Right: Product Info */}
            <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
                {product.subtitle && <p className="text-xl text-gray-500 mb-6">{product.subtitle}</p>}
                
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    {product.description}
                </p>

                {/* Characteristics */}
                {product.characteristics && product.characteristics.length > 0 && (
                    <div className="bg-gray-50 rounded-lg p-6 mb-8 border border-gray-100">
                        <h3 className="font-semibold text-gray-900 mb-4 uppercase text-sm tracking-wide">{t('product.features')}</h3>
                        <ul className="space-y-3">
                            {product.characteristics.map((char, i) => (
                                <li key={i} className="flex items-start gap-3 text-gray-700">
                                    <Check className="text-mandikBlue mt-1 flex-shrink-0" size={18} />
                                    <span>{renderCharacteristic(char)}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>

        {/* Detailed Specification (HTML Content) */}
        {product.specification && (
            <div className="mb-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">Technická specifikace</h2>
                <div 
                    className="prose prose-lg text-gray-600 max-w-none"
                    dangerouslySetInnerHTML={{ __html: product.specification }}
                />
            </div>
        )}

        {/* Downloads Area - Grouped */}
        {product.downloads && product.downloads.length > 0 && (
            <div className="space-y-8">
                 {groupOrder.map(key => {
                     const files = groupedDownloads[key];
                     if (!files || files.length === 0) return null;

                     return (
                        <div key={key} className="bg-gray-50 rounded-xl p-8 border border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                {key === 'technicalDoc' && <FileText className="text-mandikBlue" />}
                                {key === 'certificates' && <ShieldCheck className="text-mandikBlue" />}
                                {key === 'revit' && <Download className="text-mandikBlue" />}
                                {t(`product.${key}`)}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {files.map((download, idx) => (
                                    <a 
                                        key={idx} 
                                        href={download.link} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex items-center p-4 bg-white border border-gray-200 rounded-lg hover:border-mandikBlue hover:shadow-md transition-all group"
                                    >
                                        <div className="bg-gray-100 p-3 rounded-full mr-4 group-hover:bg-mandikBlue/10 transition-colors">
                                            {key === 'certificates' ? (
                                                <ShieldCheck className="text-gray-600 group-hover:text-mandikBlue" size={24} />
                                            ) : download.mime_type === 'application/zip' || key === 'revit' ? (
                                                <Download className="text-gray-600 group-hover:text-mandikBlue" size={24} />
                                            ) : (
                                                <FileText className="text-gray-600 group-hover:text-mandikBlue" size={24} />
                                            )}
                                        </div>
                                        <div className="flex-grow">
                                            <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                                                {download.type}
                                            </span>
                                            <span className="block font-medium text-gray-900 group-hover:text-mandikBlue transition-colors">
                                                {translateDownloadName(download.name, language)}
                                            </span>
                                        </div>
                                        <Download size={20} className="text-gray-300 group-hover:text-mandikBlue" />
                                    </a>
                                ))}
                            </div>
                        </div>
                     );
                 })}
            </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
