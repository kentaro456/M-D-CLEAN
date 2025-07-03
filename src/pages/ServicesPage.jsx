import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { Check, Plus, Minus, ArrowRight, Car, Sofa, Home } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  {
    icon: Car,
    title: 'Nettoyage Automobile Premium',
    category: 'Véhicules',
    subtitle: 'Redonnez à votre voiture son éclat d\'origine.',
    description: 'Notre formule premium traite chaque centimètre de votre véhicule avec les meilleurs produits pour un résultat spectaculaire et une protection durable.',
    features: [
      'Lavage manuel et décontamination',
      'Aspiration complète et nettoyage des plastiques',
      'Traitement et protection des cuirs',
      'Nettoyage des vitres intérieures et extérieures',
    ],
    price: 'À partir de 99€',
    image: 'https://images.unsplash.com/photo-1616422285623-13ff0162193c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
  },
  {
    icon: Home,
    title: 'Nettoyage Résidentiel en Profondeur',
    category: 'Maison & Intérieur',
    subtitle: 'Un intérieur impeccable, du sol au plafond.',
    description: 'Notre service de nettoyage résidentiel redonne vie à tous vos textiles d\'ameublement. Nous traitons canapés, chaises, tapis, moquettes et matelas avec un soin expert pour un environnement sain et propre.',
    features: [
      'Nettoyage et désinfection de canapés, fauteuils',
      'Shampouinage de tapis et moquettes',
      'Traitement anti-acariens pour matelas',
      'Nettoyage de tous types de chaises et assises en tissu ou cuir',
      'Élimination des taches et odeurs tenaces',
    ],
    price: 'Sur devis',
    image: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
  },
];

const faqData = [
  { question: "Combien de temps dure une prestation ?", reponse: "La durée varie. Un nettoyage auto premium dure environ 2-3h. Un nettoyage résidentiel complet (canapé, tapis, etc.) peut prendre de 2h à 5h selon les éléments à traiter." },
  { question: "Utilisez-vous des produits écologiques ?", reponse: "Oui, nous privilégions l'utilisation de produits biodégradables et respectueux de l'environnement qui sont sans danger pour les enfants et les animaux." },
  { question: "Devez-vous intervenir à mon domicile ?", reponse: "Oui, tous nos services sont effectués à votre domicile pour votre plus grand confort. Nous avons seulement besoin d'un accès à l'électricité et à l'eau." },
  { question: "Quels sont vos délais d'intervention ?", reponse: "Nous nous efforçons d'être très réactifs. En général, nous pouvons intervenir sous 48h à 72h selon la période." }
];

const PageHeader = () => {
  const headerRef = useRef(null);
  useEffect(() => {
    gsap.fromTo(headerRef.current.children,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out', delay: 0.3 }
    );
  }, []);
  return (
    <div ref={headerRef} className="text-center py-24 sm:py-32 relative">
        <div className="container mx-auto px-6 relative z-10">
            <h1 className="text-5xl md:text-7xl font-serif text-white mb-4">Nos Prestations d'Excellence</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Un savoir-faire unique au service de la propreté et de la longévité de vos biens.
            </p>
        </div>
    </div>
  );
};

const ServiceCard = ({ service }) => {
  const cardRef = useRef(null);
  const Icon = service.icon;

  useEffect(() => {
    const card = cardRef.current;
    gsap.fromTo(card,
      { opacity: 0, y: 100 },
      {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 85%' }
      }
    );
  }, []);

  return (
    <div ref={cardRef} className="bg-brand-surface/50 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/40 overflow-hidden flex flex-col md:flex-row group">
      <div className="md:w-5/12 overflow-hidden">
        <img src={service.image} alt={service.title} className="w-full h-80 md:h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"/>
      </div>
      <div className="md:w-7/12 p-8 lg:p-12 flex flex-col text-white">
        <div className="mb-6">
            <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/10 border border-white/10 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-blue-300"/>
                </div>
                <p className="text-sm font-bold text-brand-primary uppercase tracking-widest">{service.category}</p>
            </div>
            <h2 className="text-3xl lg:text-4xl font-serif">{service.title}</h2>
            <p className="text-gray-400 text-lg mt-2">{service.subtitle}</p>
        </div>
        <p className="text-gray-300 leading-relaxed mb-8">{service.description}</p>
        <ul className="space-y-4 mb-10 flex-grow">
          {service.features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-3">
              <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
              <span className="text-gray-200">{feature}</span>
            </li>
          ))}
        </ul>
        <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-white/10 mt-auto">
          <p className="text-2xl font-bold text-white">{service.price}</p>
          <Link to="/contact" className="group/btn mt-4 sm:mt-0 inline-flex items-center justify-center bg-brand-primary text-brand-dark font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-brand-primary/30">
            <span>Obtenir un Devis</span>
            <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const sectionRef = useRef(null);
  
  useEffect(() => {
    gsap.fromTo(sectionRef.current.children, {opacity: 0, y: 50}, {opacity: 1, y: 0, stagger: 0.1, duration: 1, scrollTrigger: {trigger: sectionRef.current, start: 'top 80%'}})
  }, []);

  const toggleFaq = index => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div ref={sectionRef} className="py-24">
        <div className="container mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-serif text-white">Questions Fréquentes</h2>
                <p className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto">Toutes les réponses à vos interrogations sur nos services.</p>
            </div>
            <div className="max-w-3xl mx-auto space-y-4">
                {faqData.map((faq, index) => (
                    <FaqItem key={index} faq={faq} isOpen={openIndex === index} onClick={() => toggleFaq(index)} />
                ))}
            </div>
        </div>
    </div>
  )
}

const FaqItem = ({ faq, isOpen, onClick }) => {
  const { ref: content } = useAnimatedHeight(isOpen);

  return (
    <div className="bg-brand-surface/50 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
        <button onClick={onClick} className="w-full flex justify-between items-center p-6 text-left">
            <span className="text-xl font-semibold text-white">{faq.question}</span>
            <div className={`w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`}>
                <Plus className={`w-5 h-5 text-white transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`} style={{position: 'absolute'}}/>
                <Minus className={`w-5 h-5 text-white transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`} />
            </div>
        </button>
        <div ref={content} style={{height: 0, overflow: 'hidden'}}>
            <p className="px-6 pb-6 pt-2 text-gray-300 leading-relaxed">{faq.reponse}</p>
        </div>
    </div>
  )
}

const useAnimatedHeight = (isOpen) => {
    const contentRef = useRef(null);
    useEffect(() => {
        gsap.to(contentRef.current, {
            height: isOpen ? 'auto' : 0,
            duration: 0.5,
            ease: 'power3.inOut',
        });
    }, [isOpen]);
    return { ref: contentRef };
}


const ServicesPage = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      
      <PageHeader />
      <main className="py-24">
        <div className="container mx-auto px-6">
          <div className="space-y-24">
            {servicesData.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>
        </div>
      </main>
      <FaqSection />
    </div>
  );
};

export default ServicesPage; 