import { useRef, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Send, User, MessageSquare, Clock, CheckCircle, FileText, Camera, MapPinIcon, Shield, Car, Type, Hash } from 'lucide-react';
import QuoteProcessImage from '../assets/ui/quote-process-guide.png';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Récupérer l'URL de l'API depuis les variables d'environnement de Vite
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const TabButton = ({ children, isActive, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`relative px-6 py-3 text-lg font-semibold transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}`}
        >
            {children}
            {isActive && (
                <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-brand-primary"
                    layoutId="underline"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
            )}
        </button>
    );
};

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState('');

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');

        try {
            const result = await axios.post(
                `${API_URL}/api/contact`,
                {
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                }
            );

            if (result.status === 200) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error('Erreur:', error);
            setStatus('error');
        }
    };

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Nom</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input 
                                type="text" 
                                id="name" 
                                name="name" 
                                value={formData.name}
                                onChange={handleInputChange}
                                required 
                                className="w-full bg-brand-surface/50 border border-white/10 rounded-lg py-3 pr-4 pl-12 text-white placeholder-gray-500 focus:ring-2 focus:ring-brand-primary focus:outline-none" 
                                placeholder="Votre nom complet" 
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                value={formData.email}
                                onChange={handleInputChange}
                                required 
                                className="w-full bg-brand-surface/50 border border-white/10 rounded-lg py-3 pr-4 pl-12 text-white placeholder-gray-500 focus:ring-2 focus:ring-brand-primary focus:outline-none" 
                                placeholder="Votre adresse email" 
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                    <div className="relative">
                        <MessageSquare className="absolute left-4 top-5 text-gray-400" size={20} />
                        <textarea 
                            id="message" 
                            name="message" 
                            value={formData.message}
                            onChange={handleInputChange}
                            required 
                            rows="6" 
                            className="w-full bg-brand-surface/50 border border-white/10 rounded-lg py-3 pr-4 pl-12 text-white placeholder-gray-500 focus:ring-2 focus:ring-brand-primary focus:outline-none" 
                            placeholder="Comment pouvons-nous vous aider ?"
                        ></textarea>
                    </div>
                </div>
                <div>
                    <button 
                        type="submit" 
                        disabled={status === 'sending'}
                        className="w-full bg-brand-primary text-brand-dark font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-brand-primary/30 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {status === 'sending' ? 'Envoi en cours...' : 'Envoyer le Message'}
                    </button>
                </div>
                {status === 'success' && (
                    <p className="text-green-500 mt-4 text-center">
                        ✅ Message envoyé avec succès ! Nous vous répondrons bientôt.
                    </p>
                )}
                {status === 'error' && (
                    <p className="text-red-500 mt-4 text-center">
                        ❌ Une erreur est survenue. Veuillez réessayer plus tard.
                    </p>
                )}
            </form>
        </motion.div>
    );
};

const QuoteForm = () => {
    const [formData, setFormData] = useState({
        nom: '',
        email: '',
        typeService: '',
        typeVehicule: '',
        modeleVehicule: '',
        plaqueImmatriculation: '',
        informationsComplementaires: ''
    });
    const [status, setStatus] = useState('');

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');

        try {
            const result = await axios.post(
                `${API_URL}/api/quote`,
                {
                    nom: formData.nom,
                    email: formData.email,
                    typeService: formData.typeService,
                    typeVehicule: formData.typeVehicule || 'Non spécifié',
                    modeleVehicule: formData.modeleVehicule || 'Non spécifié',
                    plaqueImmatriculation: formData.plaqueImmatriculation || 'Non spécifiée',
                    informationsComplementaires: formData.informationsComplementaires || 'Aucune information complémentaire.',
                }
            );

            if (result.status === 200) {
                setStatus('success');
                setFormData({
                    nom: '',
                    email: '',
                    typeService: '',
                    typeVehicule: '',
                    modeleVehicule: '',
                    plaqueImmatriculation: '',
                    informationsComplementaires: ''
                });
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error('Erreur:', error);
            setStatus('error');
        }
    };

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Info */}
                <fieldset>
                    <legend className="text-lg font-semibold text-white mb-4">Vos informations</legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="quote-name" className="block text-sm font-medium text-gray-300 mb-2">Nom</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input 
                                    type="text" 
                                    id="quote-name" 
                                    name="nom" 
                                    value={formData.nom}
                                    onChange={handleInputChange}
                                    required 
                                    className="w-full bg-brand-surface/50 border border-white/10 rounded-lg py-3 pr-4 pl-12 text-white placeholder-gray-500 focus:ring-2 focus:ring-brand-primary focus:outline-none" 
                                    placeholder="Votre nom complet" 
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="quote-email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input 
                                    type="email" 
                                    id="quote-email" 
                                    name="email" 
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required 
                                    className="w-full bg-brand-surface/50 border border-white/10 rounded-lg py-3 pr-4 pl-12 text-white placeholder-gray-500 focus:ring-2 focus:ring-brand-primary focus:outline-none" 
                                    placeholder="Votre adresse email" 
                                />
                            </div>
                        </div>
                    </div>
                </fieldset>

                {/* Service Details */}
                <fieldset>
                    <legend className="text-lg font-semibold text-white mb-4 mt-6">Détails de la prestation</legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="service-type" className="block text-sm font-medium text-gray-300 mb-2">Type de service</label>
                            <div className="relative">
                                <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <select 
                                    id="service-type" 
                                    name="typeService" 
                                    value={formData.typeService}
                                    onChange={handleInputChange}
                                    required 
                                    className="w-full bg-brand-surface/50 border border-white/10 rounded-lg py-3 pr-4 pl-12 text-white placeholder-gray-500 focus:ring-2 focus:ring-brand-primary focus:outline-none appearance-none"
                                >
                                    <option value="">Sélectionnez un service...</option>
                                    <option value="Nettoyage Automobile">Nettoyage Automobile</option>
                                    <option value="Nettoyage Résidentiel">Nettoyage Résidentiel (canapé, tapis, etc.)</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="vehicle-type" className="block text-sm font-medium text-gray-300 mb-2">Type de véhicule (si applicable)</label>
                             <div className="relative">
                                <Car className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input 
                                    type="text" 
                                    id="vehicle-type" 
                                    name="typeVehicule" 
                                    value={formData.typeVehicule}
                                    onChange={handleInputChange}
                                    className="w-full bg-brand-surface/50 border border-white/10 rounded-lg py-3 pr-4 pl-12 text-white placeholder-gray-500 focus:ring-2 focus:ring-brand-primary focus:outline-none" 
                                    placeholder="Ex: Berline, SUV..." 
                                />
                            </div>
                        </div>
                        <div>
                           <label htmlFor="vehicle-model" className="block text-sm font-medium text-gray-300 mb-2">Modèle (si applicable)</label>
                           <div className="relative">
                               <Type className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                               <input 
                                   type="text" 
                                   id="vehicle-model" 
                                   name="modeleVehicule" 
                                   value={formData.modeleVehicule}
                                   onChange={handleInputChange}
                                   className="w-full bg-brand-surface/50 border border-white/10 rounded-lg py-3 pr-4 pl-12 text-white placeholder-gray-500 focus:ring-2 focus:ring-brand-primary focus:outline-none" 
                                   placeholder="Ex: Peugeot 3008, Clio V..." 
                               />
                           </div>
                        </div>
                        <div>
                            <label htmlFor="license-plate" className="block text-sm font-medium text-gray-300 mb-2">Plaque d'immatriculation (si applicable)</label>
                            <div className="relative">
                                <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input 
                                    type="text" 
                                    id="license-plate" 
                                    name="plaqueImmatriculation" 
                                    value={formData.plaqueImmatriculation}
                                    onChange={handleInputChange}
                                    className="w-full bg-brand-surface/50 border border-white/10 rounded-lg py-3 pr-4 pl-12 text-white placeholder-gray-500 focus:ring-2 focus:ring-brand-primary focus:outline-none" 
                                    placeholder="Ex: AA-123-BB" 
                                />
                            </div>
                        </div>
                    </div>
                </fieldset>

                <div>
                    <label htmlFor="quote-message" className="block text-sm font-medium text-gray-300 mb-2">Informations complémentaires</label>
                    <div className="relative">
                        <FileText className="absolute left-4 top-5 text-gray-400" size={20} />
                        <textarea 
                            id="quote-message" 
                            name="informationsComplementaires" 
                            value={formData.informationsComplementaires}
                            onChange={handleInputChange}
                            rows="6" 
                            className="w-full bg-brand-surface/50 border border-white/10 rounded-lg py-3 pr-4 pl-12 text-white placeholder-gray-500 focus:ring-2 focus:ring-brand-primary focus:outline-none" 
                            placeholder="Décrivez votre besoin. Pour le résidentiel, précisez les éléments (ex: 1 canapé 3 places, 2 tapis...)."
                        ></textarea>
                    </div>
                </div>

                <div>
                    <button 
                        type="submit" 
                        disabled={status === 'sending'}
                        className="w-full bg-brand-primary text-brand-dark font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-brand-primary/30 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {status === 'sending' ? 'Envoi en cours...' : 'Demander mon Devis'}
                    </button>
                </div>
                {status === 'success' && (
                    <p className="text-green-500 mt-4 text-center">
                        ✅ Demande de devis envoyée ! Nous reviendrons vers vous rapidement.
                    </p>
                )}
                {status === 'error' && (
                    <p className="text-red-500 mt-4 text-center">
                        ❌ Une erreur est survenue. Veuillez réessayer plus tard.
                    </p>
                )}
            </form>
        </motion.div>
    );
};

const ContactInfo = () => {
    const infos = [
        { icon: Mail, text: 'contact.mdclean@email.com', href: 'mailto:contact.mdclean@email.com' },
        { icon: Phone, text: '+33 6 12 34 56 78', href: 'tel:+33612345678' },
        { icon: MapPin, text: 'Paris 8e & Île-de-France', href: '#' },
    ];

    const infoRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(infoRef.current.children,
            { opacity: 0, x: -50 },
            {
                opacity: 1, x: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out',
                scrollTrigger: {
                    trigger: infoRef.current,
                    start: 'top 80%',
                }
            }
        );
    }, []);

    return (
        <div ref={infoRef} className="space-y-8">
            {infos.map((info, index) => {
                const Icon = info.icon;
                return (
                    <a key={index} href={info.href} className="flex items-center gap-6 group">
                        <div className="w-16 h-16 bg-brand-surface/50 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-brand-primary group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-brand-primary/30">
                            <Icon className="w-7 h-7 text-brand-primary transition-colors duration-300 group-hover:text-brand-dark" />
                        </div>
                        <span className="text-xl text-gray-200 transition-colors duration-300 group-hover:text-white">{info.text}</span>
                    </a>
                )
            })}
        </div>
    );
};

const ContactPage = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(() => {
    // Si l'utilisateur vient de /devis, ouvrir l'onglet devis par défaut
    const urlParams = new URLSearchParams(location.search);
    return urlParams.get('tab') === 'quote' || location.state?.openQuote ? 'quote' : 'contact';
  });
  const [contactFormData, setContactFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [quoteFormData, setQuoteFormData] = useState({
    name: '',
    phone: '',
    serviceType: '',
    location: '',
    photos: null
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const pageRef = useRef(null);
  const heroRef = useRef(null);
  const infoCardsRef = useRef([]);
  const tabsRef = useRef(null);
  const formContainerRef = useRef(null);

  useEffect(() => {
    // Animation d'entrée de la page
    gsap.fromTo(pageRef.current, { opacity: 0 }, { opacity: 1, duration: 1, ease: 'power3.out' });
    
    // Animation du titre hero
    gsap.fromTo(heroRef.current, 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.2 }
    );

    // Animation des cartes d'info avec stagger
    gsap.fromTo(infoCardsRef.current, 
      { opacity: 0, y: 100, scale: 0.8 }, 
      { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        duration: 1, 
        stagger: 0.15, 
        ease: 'back.out(1.7)', 
        delay: 0.5 
      }
    );
    
    // Animation des onglets
    gsap.fromTo(tabsRef.current, 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.7 }
    );
    
    // Animation du conteneur de formulaire
    gsap.fromTo(formContainerRef.current, 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.9 }
    );
  }, []);

  // Animation lors du changement d'onglet
  useEffect(() => {
    if (formContainerRef.current) {
      gsap.fromTo(formContainerRef.current, 
        { opacity: 0, x: activeTab === 'contact' ? 50 : -50 }, 
        { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }
      );
    }
  }, [activeTab]);

  const handleContactInputChange = (e) => {
    setContactFormData({
      ...contactFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleQuoteInputChange = (e) => {
    if (e.target.type === 'file') {
      setQuoteFormData({
        ...quoteFormData,
        [e.target.name]: e.target.files
      });
    } else {
      setQuoteFormData({
        ...quoteFormData,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Ici vous pouvez ajouter la logique d'envoi du formulaire de contact
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleQuoteSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Ici vous pouvez ajouter la logique d'envoi du formulaire de devis
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Appelez-nous",
      content: "06 11 24 04 38",
      href: "tel:+33611240438",
      gradient: "from-green-500 to-emerald-600",
      description: "Disponible 7j/7 de 8h à 20h"
    },
    {
      icon: Mail,
      title: "Écrivez-nous",
      content: "mdclean.idf@gmail.com",
      href: "mailto:mdclean.idf@gmail.com",
      gradient: "from-blue-500 to-cyan-600",
      description: "Réponse sous 24h"
    },
    {
      icon: MapPin,
      title: "Zone d'intervention",
      content: "Toute l'Île-de-France",
      href: "#",
      gradient: "from-purple-500 to-pink-600",
      description: "Service à domicile"
    },
    {
      icon: Clock,
      title: "Horaires",
      content: "Lun-Dim 8h-20h",
      href: "#",
      gradient: "from-orange-500 to-red-600",
      description: "Flexibilité garantie"
    }
  ];

  const tabs = [
    {
      id: 'contact',
      label: 'Contact',
      icon: MessageSquare,
      description: 'Envoyez-nous un message'
    },
    {
      id: 'quote',
      label: 'Devis Gratuit',
      icon: FileText,
      description: 'Demandez votre estimation'
    }
  ];

  return (
    <div ref={pageRef} className="relative bg-gradient-to-br from-brand-dark via-gray-900 to-brand-dark min-h-screen overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-cyan-500/5 to-transparent rounded-full"></div>

      <div className="relative z-10 py-24 sm:py-32">
        <div className="container mx-auto px-6">
          {/* Hero Section */}
          <div ref={heroRef} className="text-center mb-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-8 shadow-lg shadow-blue-500/25">
              <MessageSquare className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-6xl md:text-7xl font-serif text-white mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              Contact & Devis
            </h1>
            <p className="text-xl text-brand-text-secondary max-w-3xl mx-auto leading-relaxed">
              Une question ? Un projet ? Obtenez votre devis personnalisé ou contactez directement notre équipe d'experts.
            </p>
          </div>

          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <div
                  key={info.title}
                  ref={el => infoCardsRef.current[index] = el}
                  className="group cursor-pointer transform transition-all duration-500 hover:scale-105"
                >
                  <div className={`relative bg-gradient-to-br ${info.gradient} p-1 rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-500`}>
                    <div className="bg-brand-dark/95 backdrop-blur-sm rounded-2xl p-6 h-full border border-white/10 group-hover:border-white/20 transition-all duration-500">
                      <div className="text-center">
                        <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${info.gradient} rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">{info.title}</h3>
                        <a
                          href={info.href}
                          className="text-lg font-semibold text-white/90 hover:text-white hover:scale-105 transition-all duration-300 inline-block"
                        >
                          {info.content}
                        </a>
                        <p className="text-sm text-white/70 mt-2">{info.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tabs Navigation */}
          <div ref={tabsRef} className="max-w-4xl mx-auto mb-12">
            <div className="bg-brand-surface/30 backdrop-blur-xl p-2 rounded-2xl border border-white/10">
              <div className="flex">
                {tabs.map((tab) => {
                  const IconComponent = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 flex items-center justify-center gap-3 py-4 px-6 rounded-xl transition-all duration-300 ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                          : 'text-brand-text-secondary hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                      <div className="text-left">
                        <div className="font-semibold">{tab.label}</div>
                        <div className="text-xs opacity-80">{tab.description}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Forms Container */}
          <div ref={formContainerRef} className="max-w-6xl mx-auto">
            <div className="bg-brand-surface/50 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-2xl border border-white/10">
              
              {/* Contact Form */}
              {activeTab === 'contact' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                  <div>
                    <div className="mb-8">
                      <h2 className="text-3xl font-serif text-white mb-4">Envoyez-nous un message</h2>
                      <p className="text-brand-text-secondary">
                        Remplissez le formulaire ci-dessous et nous vous recontacterons rapidement pour discuter de votre projet.
                      </p>
                    </div>

                    {isSubmitted ? (
                      <div className="text-center py-12">
                        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-white mb-2">Message envoyé !</h3>
                        <p className="text-brand-text-secondary">Nous vous répondrons dans les plus brefs délais.</p>
                      </div>
                    ) : (
                      <ContactForm />
                    )}
                  </div>

                  {/* Contact Info Side */}
                  <div className="lg:pl-8">
                    <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
                      <h3 className="text-2xl font-serif text-white mb-6">Informations de contact</h3>
                      <div className="space-y-6">
                        <div className="flex items-center gap-4">
                          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                            <Phone className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <p className="text-white font-semibold">Téléphone</p>
                            <a href="tel:+33611240438" className="text-brand-text-secondary hover:text-white transition-colors">
                              06 11 24 04 38
                            </a>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                            <Mail className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <p className="text-white font-semibold">E-mail</p>
                            <a href="mailto:mdclean.idf@gmail.com" className="text-brand-text-secondary hover:text-white transition-colors">
                              mdclean.idf@gmail.com
                            </a>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                            <MapPin className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <p className="text-white font-semibold">Zone d'intervention</p>
                            <p className="text-brand-text-secondary">Toute l'Île-de-France</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                            <Clock className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <p className="text-white font-semibold">Horaires</p>
                            <p className="text-brand-text-secondary">Lun-Dim 8h-20h</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Quote Form */}
              {activeTab === 'quote' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  {/* Quote Process Info */}
                  <div className="flex flex-col items-center">
                    <h2 className="text-3xl font-serif text-white mb-6 text-center">3 étapes pour un devis rapide</h2>
                    <img 
                      src={QuoteProcessImage} 
                      alt="Processus de demande de devis M&D Clean" 
                      className="w-full max-w-md rounded-2xl shadow-2xl shadow-black/50"
                    />
                    <div className="mt-8 text-center">
                      <p className="text-brand-text-secondary leading-relaxed">
                        Suivez ces étapes simples pour nous fournir les informations nécessaires, et nous vous enverrons une estimation précise dans les plus brefs délais.
                      </p>
                    </div>
                  </div>

                  {/* Quote Form */}
                  <div>
                    <div className="mb-8">
                      <h2 className="text-3xl font-serif text-white mb-4">Demande de devis gratuit</h2>
                      <p className="text-brand-text-secondary">
                        Remplissez ce formulaire pour recevoir votre devis personnalisé rapidement.
                      </p>
                    </div>

                    {isSubmitted ? (
                      <div className="text-center py-12">
                        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-white mb-2">Demande envoyée !</h3>
                        <p className="text-brand-text-secondary">Nous vous enverrons votre devis dans les plus brefs délais.</p>
                      </div>
                    ) : (
                      <QuoteForm />
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage; 