import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, Star, Sparkles, Wind, Car, Droplets } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  {
    title: 'Expert Clean',
    price: 'dès 35€',
    description: 'Le soin essentiel pour un intérieur visiblement propre et sain.',
    features: [
      { icon: Wind, text: 'Aspiration complète et dépoussiérage' },
      { icon: Sparkles, text: 'Nettoyage des plastiques intérieurs' },
      { icon: Droplets, text: 'Shampouineuse pour sièges et tapis' },
    ],
    buttonClass: 'bg-slate-700 hover:bg-slate-600 text-white',
    isRecommended: false,
  },
  {
    title: 'Premium Clean',
    price: 'dès 55€',
    description: 'La solution complète pour une remise à neuf et une protection durable.',
    features: [
      { icon: Wind, text: 'Aspiration complète et dépoussiérage' },
      { icon: Sparkles, text: 'Nettoyage & protection UV plastiques' },
      { icon: Droplets, text: 'Shampouineuse anti-acariens sièges & tapis' },
      { icon: Car, text: 'Traitement et nourrissage des cuirs' },
      { icon: CheckCircle2, text: 'Vitres intérieures & extérieures anti-trace' },
      { icon: CheckCircle2, text: 'Nettoyage des contours de portes et coffre' },
    ],
    buttonClass: 'bg-brand-primary hover:bg-brand-primary-hover text-brand-dark',
    isRecommended: true,
  },
];

const Services = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

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

    cardsRef.current.forEach((card, index) => {
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

  }, []);

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '3s'}}></div>


      <div className="container mx-auto px-6 relative z-10">
        <div ref={titleRef} className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-serif text-white">Nos Formules de Prestations</h2>
          <p className="text-lg text-gray-400 mt-4 max-w-3xl mx-auto">
            Choisissez la solution idéale pour redonner vie à votre véhicule, avec des services adaptés à chaque besoin.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {servicesData.map((service, index) => (
            <div 
              key={index}
              ref={el => cardsRef.current[index] = el}
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
                  Choisir cette formule
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services; 