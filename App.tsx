
import React from 'react';
/* Fix: Removed ScrollRestoration import as it is unused and requires a Data Router in v6.4+; ensuring v6 core components are correctly imported */
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Contact from './pages/Contact';

// Wrapper to handle scroll to top on route change
const ScrollToTop = () => {
    // In React Router v6+, ScrollRestoration handles this generally, 
    // but sometimes explicit handling is safer in hash routing without history stack
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return null;
}

const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop /> {/* Simplistic scroll handling */}
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/o-nas" element={<About />} />
          <Route path="/kontakt" element={<Contact />} />
          <Route path="/:categorySlug" element={<CategoryPage />} />
          <Route path="/:categorySlug/:productSlug" element={<ProductDetail />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
