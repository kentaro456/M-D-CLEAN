import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg';
import { Mail, Phone, MapPin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-brand-surface text-brand-text-secondary border-t border-white/10">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <img src={logo} alt="M&D Clean Logo" className="h-10 w-10 rounded-full mr-3" />
              <span className="text-xl font-serif text-white">M&D Clean</span>
            </div>
            <p className="text-sm">
              L'excellence du détail pour des clients d'exception. Nettoyage automobile premium en Île-de-France.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="https://www.instagram.com/md_cleanofficiel/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition-colors"><Instagram /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-serif text-white mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li><Link to="/services" className="hover:text-brand-primary transition-colors">Nos Services</Link></li>
              <li><Link to="/portfolio" className="hover:text-brand-primary transition-colors">Portfolio</Link></li>
              <li><Link to="/devis" className="hover:text-brand-primary transition-colors">Demander un Devis</Link></li>
              <li><Link to="/contact" className="hover:text-brand-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-serif text-white mb-4">Contactez-nous</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail className="w-5 h-5 mr-3 mt-1 flex-shrink-0" />
                <a href="mailto:mdcleanofficiel@gmail.com" className="hover:text-brand-primary transition-colors break-all">mdcleanofficiel@gmail.com</a>
              </li>
              <li className="flex items-start">
                <Phone className="w-5 h-5 mr-3 mt-1 flex-shrink-0" />
                <a href="tel:+33611240438" className="hover:text-brand-primary transition-colors">06 11 24 04 38</a>
              </li>
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 mt-1 flex-shrink-0" />
                <span>Île-de-France<br/>(Service à domicile)</span>
              </li>
            </ul>
          </div>

          {/* Newsletter / Call to Action */}
          <div>
            <h3 className="text-lg font-serif text-white mb-4">Restez Informé</h3>
            <p className="text-sm mb-4">Recevez nos offres spéciales et dernières réalisations.</p>
            <form>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Votre email" 
                  className="w-full bg-brand-dark px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
                <button 
                  type="submit"
                  className="bg-brand-primary text-brand-dark font-bold px-4 py-2 rounded-r-md hover:bg-brand-primary-hover transition-colors"
                >
                  S'inscrire
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} M&D Clean. Tous droits réservés.</p>
          <div className="mt-2">
            <Link to="/mentions-legales" className="hover:text-brand-primary transition-colors">
              Mentions Légales
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 