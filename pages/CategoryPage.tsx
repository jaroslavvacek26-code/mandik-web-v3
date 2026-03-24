
import React, { useMemo } from 'react';
/* Fix: Explicitly ensuring correct useParams and Link imports from react-router-dom */
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { usePortfolio } from '../PortfolioContext';
import { Product } from '../types';

const CategoryPage: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const { t } = useLanguage();
  const { categories, loading, error } = usePortfolio();

  const category = useMemo(
    () => categories.find(c => c.slug === categorySlug),
    [categories, categorySlug]
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="w-10 h-10 border-4 border-mandikBlue border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <p className="text-red-500 mb-4">Nepodařilo se načíst kategorii. ({error})</p>
        <Link to="/" className="text-mandikBlue hover:underline flex items-center gap-2">
          <ArrowLeft size={16}/> {t('product.backToHome')}
        </Link>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
         <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('product.catNotFound')}</h2>
         <Link to="/" className="text-mandikBlue hover:underline flex items-center gap-2">
            <ArrowLeft size={16}/> {t('product.backToHome')}
         </Link>
      </div>
    );
  }

  // Component to render a list of products (reuse for both direct products and subcategories)
  const ProductGrid = ({ products }: { products: Product[] }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <Link 
            key={product.public_id}
            to={`/${category.slug}/${product.slug}`}
            className="bg-white rounded-lg shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 group flex flex-col"
        >
            <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden flex items-center justify-center p-4">
                <img 
                    src={product.gallery && product.gallery.length > 0 ? product.gallery[0].url : 'https://placehold.co/400x300?text=No+Image'} 
                    alt={product.name}
                    className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500"
                />
            </div>
            
            <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-mandikBlue transition-colors">
                        {product.name}
                    </h3>
                    {product.subtitle && (
                        <p className="text-sm text-gray-500 mb-3">{product.subtitle}</p>
                    )}
                    <div className="w-10 h-1 bg-gray-200 group-hover:bg-mandikBlue transition-colors mb-4"></div>
                </div>
                <div className="flex items-center text-sm font-medium text-mandikBlue opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    {t('product.detail')} <ChevronRight size={16} />
                </div>
            </div>
        </Link>
      ))}
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Header / Breadcrumb */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <nav className="flex text-sm text-gray-500 mb-4">
                <Link to="/" className="hover:text-mandikBlue transition-colors">{t('nav.home')}</Link>
                <ChevronRight size={16} className="mx-2" />
                <span className="text-gray-900 font-medium">{category.name}</span>
            </nav>
            <h1 className="text-3xl font-bold text-gray-900">{category.name}</h1>
            <p className="mt-4 text-gray-600 max-w-3xl">{category.description}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-16">
        
        {/* Direct Products in Category */}
        {category.groups && category.groups.length > 0 && (
            <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 border-l-4 border-mandikBlue pl-4">
                    {category.name}
                </h2>
                <ProductGrid products={category.groups} />
            </section>
        )}

        {/* Subcategories */}
        {category.subcategories && category.subcategories.map((sub) => (
            sub.groups && sub.groups.length > 0 && (
                <section key={sub.public_id}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 border-l-4 border-mandikBlue pl-4">
                        {sub.name}
                    </h2>
                    <ProductGrid products={sub.groups} />
                </section>
            )
        ))}

        {(!category.groups?.length && !category.subcategories?.length) && (
            <div className="text-center py-20 text-gray-500">
                {t('product.emptyCat')}
            </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
