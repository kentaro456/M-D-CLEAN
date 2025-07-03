import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.jpg';
import { Menu, X } from 'lucide-react';
import { gsap } from 'gsap';
import { AnimatePresence, motion } from 'framer-motion';

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact & Devis" },
];

const MobileMenu = ({ isOpen, toggleMenu }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    const menuVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { duration: 0.3, when: "beforeChildren" }
        }
    };

    const listVariants = {
        hidden: {},
        visible: {
            transition: { staggerChildren: 0.1, delayChildren: 0.1 }
        }
    };
    
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: 'spring', stiffness: 100 }
        }
    };

    return (
        <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 bg-brand-dark/90 backdrop-blur-xl z-40 flex flex-col items-center justify-center"
        >
            <motion.nav
                variants={listVariants}
                className="flex flex-col items-center space-y-8"
            >
                {navLinks.map((link) => (
                    <motion.div key={link.href} variants={itemVariants}>
                        <Link to={link.href} onClick={toggleMenu} className="text-4xl font-serif font-medium text-white transition-colors hover:text-brand-primary">
                            {link.label}
                        </Link>
                    </motion.div>
                ))}
            </motion.nav>
        </motion.div>
    );
};

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef(null);
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  
  // Minimal GSAP animation for header background on scroll
  useEffect(() => {
    gsap.to(headerRef.current, {
      backgroundColor: isScrolled ? 'rgba(10, 10, 20, 0.7)' : 'transparent',
      backdropFilter: isScrolled ? 'blur(16px)' : 'blur(0px)',
      duration: 0.5,
      ease: 'power2.out'
    });
  }, [isScrolled]);


  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 h-px w-0 bg-gradient-to-r from-transparent via-brand-primary/50 to-transparent transition-all duration-500 ${isScrolled ? 'w-full' : 'w-0'}`}></div>

        <div className="container mx-auto px-6 py-3 flex justify-between items-center relative">
          <Link to="/" className="relative flex items-center space-x-3 z-10">
            <img src={logo} alt="M&D Clean Logo" className="relative h-12 w-12 rounded-full border-2 border-brand-primary/50 shadow-lg" />
            <span className={`relative text-2xl font-serif font-bold text-white transition-all duration-500 ${isScrolled ? 'opacity-100' : 'opacity-0 sm:opacity-100'}`} style={{textShadow: '0 0 20px rgba(212, 175, 55, 0.5), 0 0 40px rgba(212, 175, 55, 0.3)'}}>
              M&D Clean
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link key={link.href} to={link.href} className="group relative text-lg font-medium text-white transition-colors duration-300 hover:text-brand-primary">
                {link.label}
                <span className={`absolute left-0 -bottom-1 h-0.5 bg-brand-primary transition-all duration-300 group-hover:w-full ${location.pathname === link.href ? 'w-full' : 'w-0'}`}></span>
              </Link>
            ))}
          </nav>
          
          <div className="md:hidden z-50">
            <button onClick={toggleMenu} aria-label="Menu" className="p-2">
              <AnimatePresence initial={false} mode="wait">
                  <motion.div
                      key={isOpen ? 'x' : 'menu'}
                      initial={{ rotate: isOpen ? -90 : 0, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: isOpen ? 0 : 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                  >
                      {isOpen ? <X className="w-8 h-8 text-white" /> : <Menu className="w-8 h-8 text-white" />}
                  </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && <MobileMenu isOpen={isOpen} toggleMenu={toggleMenu} />}
      </AnimatePresence>
    </>
  );
};

export default Header; 