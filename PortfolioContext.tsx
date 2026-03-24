import React, { createContext, useContext, useEffect, useRef, useState, ReactNode } from 'react';
import { Category, Language } from './types';
import { useLanguage } from './LanguageContext';

const API_BASE = 'https://mandik.info/api/v1/ltu/portfolio/';
const TOKEN = import.meta.env.VITE_PORTFOLIO_API_TOKEN as string;

const localeMap: Record<Language, string> = {
  cz: 'cs',
  en: 'en',
  de: 'de',
};

interface PortfolioContextType {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { language } = useLanguage();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const cache = useRef<Partial<Record<string, Category[]>>>({});

  useEffect(() => {
    const locale = localeMap[language] ?? 'cs';

    if (cache.current[locale]) {
      setCategories(cache.current[locale]!);
      setLoading(false);
      setError(null);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch(`${API_BASE}?locale=${locale}`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`API error ${res.status}`);
        return res.json();
      })
      .then((data: Category[]) => {
        if (cancelled) return;
        cache.current[locale] = data;
        setCategories(data);
        setLoading(false);
      })
      .catch((err: Error) => {
        if (cancelled) return;
        setError(err.message);
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [language]);

  return (
    <PortfolioContext.Provider value={{ categories, loading, error }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = (): PortfolioContextType => {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error('usePortfolio must be used within PortfolioProvider');
  return ctx;
};
