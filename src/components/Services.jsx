import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, Star, Sparkles, Wind, Car, Droplets, Sofa, Armchair } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const carServicesData = [
  {
    title: 'Expert Clean',
    price: '80€',
    description: 'Le soin essentiel pour un intérieur visiblement propre et sain.',
    features: [
      { icon: Droplets, text: 'Shampouineuse' },
      { icon: Sparkles, text: 'Nettoyage des plastiques' },
    ],
    buttonClass: 'bg-slate-700 hover:bg-slate-600 text-white',
  },
  {
    title: 'Premium Clean',
    price: '109€',
    description: 'La solution complète pour une remise à neuf de votre habitacle.',
    features: [
      { icon: Car, text: 'Intérieur complet' },
      { icon: CheckCircle2, text: 'Contours de portes' },
      { icon: CheckCircle2, text: 'Coffre et ses contours' },
    ],
    buttonClass: 'bg-brand-primary hover:bg-brand-primary-hover text-brand-dark',
    isRecommended: true,
  },
];

const upholsteryServicesData = [
  {
    title: 'Canapés',
    icon: Sofa,
    description: 'Redonnez vie à votre canapé avec un nettoyage en profondeur.',
    prices: [
      { item: '2 places', price: '94€' },
      { item: '3 places', price: '124€' },
      { item: '4 places', price: '144€' },
    ],
    buttonClass: 'bg-slate-700 hover:bg-slate-600 text-white',
  },
  {
    title: 'Chaises',
    icon: Armchair,
    description: 'Un soin expert pour des chaises impeccables.',
    prices: [
      { item: '1 chaise', price: '25€' },
      { item: '4 chaises', price: '85€' },
      { item: '6 chaises', price: '99€' },
    ],
    buttonClass: 'bg-slate-700 hover:bg-slate-600 text-white',
  },
];

const allUpholsteryServices = [
    { icon: Wind, text: 'Aspiration complète' },
    { icon: Droplets, text: 'Extraction par shampouineuse' },
    { icon: CheckCircle2, text: 'Élimination des acariens' },
    { icon: Sparkles, text: 'Élimination des odeurs' },
];


const Services = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const carCardsRef = useRef([]);
  const upholsteryCardsRef = useRef([]);
  const upholsteryTitleRef = useRef(null);
  const carTitleRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        }
      }
    );

    const animateTitle = (ref) => {
        gsap.fromTo(ref,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: ref,
                    start: 'top 80%',
                }
            }
        );
    }
    
    animateTitle(carTitleRef.current);
    animateTitle(upholsteryTitleRef.current);


    const animateCards = (cards) => {
        cards.current.forEach((card, index) => {
            if (!card) return;
            gsap.fromTo(card,
                { opacity: 0, y: 100, scale: 0.9 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        toggleActions: 'play none none none',
                    },
                    delay: index * 0.2
                }
            );
        });
    }

    animateCards(carCardsRef);
    animateCards(upholsteryCardsRef);

  }, []);

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 relative overflow-hidden bg-brand-dark">
      {/* Background Effects */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '3s'}}></div>

      <div className="container mx-auto px-6 relative z-10">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-serif text-white">Nos Services de Nettoyage</h2>
          <p className="text-lg text-gray-400 mt-4 max-w-3xl mx-auto">
            Des solutions professionnelles pour un intérieur impeccable, que ce soit pour votre véhicule ou votre mobilier.
          </p>
        </div>
        
        {/* Vehicle Services */}
        <div className="mb-24">
            <div ref={carTitleRef} className="text-center mb-12">
                <h3 className="text-3xl lg:text-4xl font-serif text-white flex items-center justify-center gap-4"><Car className="w-10 h-10 text-brand-primary"/>Nettoyage Véhicule</h3>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
                {carServicesData.map((service, index) => (
                <div 
                    key={`car-${index}`}
                    ref={el => carCardsRef.current[index] = el}
                    className={`relative flex flex-col rounded-2xl border transition-all duration-500 hover:-translate-y-2 bg-brand-surface/50 backdrop-blur-xl border-white/10 ${service.isRecommended ? 'shadow-brand-primary/20 shadow-2xl' : 'shadow-black/50 shadow-xl'}`}
                >
                    {service.isRecommended && (
                    <>
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-primary to-transparent"></div>
                        <div className="absolute top-0 right-8 -mt-4 flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-black text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                        <Star className="w-4 h-4" />
                        Recommandé
                        </div>
                    </>
                    )}

                    <div className="p-8 flex-grow">
                        <h3 className="text-3xl font-serif font-bold text-white mb-2">{service.title}</h3>
                        <p className="text-2xl font-semibold text-brand-primary mb-6">{service.price}</p>
                        <p className="text-gray-400 mb-8 min-h-[3rem]">{service.description}</p>
                        
                        <ul className="space-y-4">
                        {service.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-4">
                            <feature.icon className="w-6 h-6 text-brand-primary flex-shrink-0" />
                            <span className="text-gray-200">{feature.text}</span>
                            </li>
                        ))}
                        </ul>
                    </div>

                    <div className="p-8 bg-black/20 rounded-b-2xl mt-auto">
                        <Link 
                        to="/contact"
                        className={`w-full text-center block font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg ${service.buttonClass}`}
                        >
                        Demander un devis
                        </Link>
                    </div>
                </div>
                ))}
            </div>
        </div>

        {/* Upholstery Services */}
        <div>
            <div ref={upholsteryTitleRef} className="text-center mb-12">
                <h3 className="text-3xl lg:text-4xl font-serif text-white flex items-center justify-center gap-4"><Sofa className="w-10 h-10 text-brand-primary"/>Nettoyage Mobilier</h3>
            </div>

            <div className="max-w-5xl mx-auto mb-12 p-8 rounded-2xl border border-white/10 bg-brand-surface/50 backdrop-blur-xl">
                 <h4 className="text-2xl font-serif text-white text-center mb-6">Nos préstations incluses</h4>
                 <ul className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {allUpholsteryServices.map((service, i) => (
                         <li key={`upholstery-service-${i}`} className="flex flex-col items-center text-center gap-2">
                            <div className="w-16 h-16 bg-black/20 rounded-full flex items-center justify-center">
                                <service.icon className="w-8 h-8 text-brand-primary" />
                            </div>
                            <span className="text-gray-300 text-sm">{service.text}</span>
                        </li>
                    ))}
                 </ul>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
                {upholsteryServicesData.map((service, index) => (
                <div 
                    key={`upholstery-${index}`}
                    ref={el => upholsteryCardsRef.current[index] = el}
                    className="flex flex-col rounded-2xl border border-white/10 bg-brand-surface/50 backdrop-blur-xl shadow-black/50 shadow-xl transition-all duration-500 hover:-translate-y-2"
                >
                    <div className="p-8 flex-grow">
                        <div className="flex items-center gap-4 mb-4">
                            <service.icon className="w-10 h-10 text-brand-primary" />
                            <h3 className="text-3xl font-serif font-bold text-white">{service.title}</h3>
                        </div>
                        <p className="text-gray-400 mb-8 min-h-[3rem]">{service.description}</p>
                        
                        <ul className="space-y-4">
                        {service.prices.map((item, i) => (
                            <li key={i} className="flex justify-between items-center border-b border-white/10 pb-2">
                                <span className="text-gray-200">{item.item}</span>
                                <span className="font-bold text-xl text-brand-primary">{item.price}</span>
                            </li>
                        ))}
                        </ul>
                    </div>
                    <div className="p-8 bg-black/20 rounded-b-2xl mt-auto">
                        <Link 
                        to="/contact"
                        className={`w-full text-center block font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg ${service.buttonClass}`}
                        >
                        Demander un devis
                        </Link>
                    </div>
                </div>
                ))}
            </div>
            <p className="text-center text-gray-500 mt-12 max-w-2xl mx-auto">
                La validation du devis se fait avec photo(s). Pour toutes autres demandes, n'hésitez pas à nous contacter.
            </p>
        </div>

      </div>
    </section>
  );
};

export default Services; 