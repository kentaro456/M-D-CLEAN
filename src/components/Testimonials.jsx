import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonialsData = [
  {
    name: "Céline R.",
    location: "Paris 16ème",
    rating: 5,
    quote: "Un service absolument impeccable. Ma voiture n'a jamais été aussi propre, on dirait qu'elle sort de la concession. Le souci du détail est impressionnant.",
  },
  {
    name: "Alexandre G.",
    location: "Neuilly-sur-Seine",
    rating: 5,
    quote: "Professionnalisme et ponctualité. Le nettoyage de mon canapé en cuir a été réalisé avec un grand soin. Je recommande vivement leurs services.",
  },
  {
    name: "Sophie L.",
    location: "Versailles",
    rating: 5,
    quote: "J'ai fait appel à M&D Clean pour les fauteuils de mon bureau. Le résultat est bluffant. L'équipe est discrète, efficace et très sympathique.",
  },
  {
    name: "Marc D.",
    location: "Boulogne-Billancourt",
    rating: 5,
    quote: "Le service à domicile est un vrai plus. La qualité du nettoyage intérieur de ma voiture a largement dépassé mes attentes. Excellent rapport qualité-prix.",
  }
];

const Testimonials = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const scrollContainerRef = useRef(null);
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
    
    gsap.fromTo(cardsRef.current,
      { opacity: 0, y: 100 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: scrollContainerRef.current,
          start: 'top 85%',
        }
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="bg-brand-surface py-24 sm:py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-serif text-white">Ce que nos clients disent</h2>
          <p className="text-lg text-brand-text-secondary mt-4 max-w-2xl mx-auto">
            Votre satisfaction est notre plus grande fierté.
          </p>
        </div>
        <div ref={scrollContainerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testimonialsData.map((testimonial, index) => (
              <div 
                key={index}
                ref={el => cardsRef.current[index] = el}
                className="bg-brand-dark p-8 rounded-2xl flex flex-col h-full"
              >
                <Quote className="w-12 h-12 text-brand-primary/30 mb-4" />
                <p className="text-brand-text-secondary mb-6 flex-grow">"{testimonial.quote}"</p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                  <div>
                    <h4 className="font-serif text-xl text-white">{testimonial.name}</h4>
                    <p className="text-sm text-brand-text-secondary">{testimonial.location}</p>
                  </div>
                  <div className="flex items-center">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-brand-primary" fill="currentColor" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 