import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import LegalNoticePage from './pages/LegalNoticePage';
import PortfolioElegant from './components/Portfolio';
import './index.css';
import Header from './components/Header';
import Footer from './components/Footer';
import useSmoothScroll from './hooks/useSmoothScroll';

// Component wrapper to redirect /devis to /contact with quote tab
const QuoteRedirect = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate('/contact?tab=quote', { replace: true });
  }, [navigate]);
  
  return null;
};

// Component to decide if Footer should be rendered
const ConditionalFooter = () => {
  const location = useLocation();
  const noFooterPaths = ['/contact'];

  if (noFooterPaths.includes(location.pathname)) {
    return null;
  }
  return <Footer />;
};

function App() {
  useSmoothScroll();

  return (
    <Router>
      <div className="bg-gradient-to-br from-brand-dark via-gray-900 to-brand-dark text-white">
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/portfolio" element={<PortfolioElegant />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/devis" element={<QuoteRedirect />} />
          <Route path="/mentions-legales" element={<LegalNoticePage />} />
        </Routes>
        <ConditionalFooter />
      </div>
    </Router>
  );
}

export default App;
