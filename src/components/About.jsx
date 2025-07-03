import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check } from 'lucide-react';
import logo from '../assets/logo.jpg';

gsap.registerPlugin(ScrollTrigger);

const BentoItem = ({ children, className, ...props }) => {
    const itemRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(itemRef.current,
            { opacity: 0, scale: 0.95, y: 50 },
            {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: itemRef.current,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                }
            }
        );
    }, []);

    return (
        <div ref={itemRef} className={`bg-brand-surface/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl shadow-black/40 ${className}`} {...props}>
            {children}
        </div>
    );
};

const About = () => {
    const ringsRef = useRef([]);

    useEffect(() => {
        ringsRef.current.forEach((ring, index) => {
            if (!ring) return;
            gsap.to(ring, {
                rotation: (index % 2 === 0 ? '+=360' : '-=360'),
                duration: 50 + index * 15,
                repeat: -1,
                ease: 'none'
            });
            gsap.to(ring, {
                scale: 1 + 0.05 * (index + 1),
                duration: 4,
                yoyo: true,
                repeat: -1,
                ease: 'sine.inOut'
            });
        });
    }, []);

    const engagements = [
        "Qualité artisanale, touche moderne",
        "Réactivité & ponctualité",
        "Services accessibles à tous",
        "Matériel pro & respectueux",
        "Relation client humaine & directe",
    ];

    return (
        <section id="about" className="py-24 sm:py-32 relative overflow-hidden">
            <div className="absolute top-1/4 -left-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute bottom-0 -right-32 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '3s'}}></div>
            
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">
                        Deux jeunes entrepreneurs, une même passion
                    </h2>
                    <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                        M&D Clean, c'est l'histoire de Dan-Maximilien et Emmanuel-Kevin. Ambitieux, rigoureux, et déterminés à faire de leur passion un service d'excellence.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Text Block */}
                    <BentoItem className="lg:col-span-2 text-white flex flex-col justify-center">
                        <h3 className="text-3xl font-serif mb-6 flex items-center gap-4">
                            <span className="text-3xl">✨</span> Notre Mission
                        </h3>
                        <div className="space-y-4 text-gray-300 leading-relaxed">
                            <p>
                                Âgés de moins de 22 ans, nous représentons cette nouvelle génération qui n'a pas peur de se retrousser les manches. Notre motivation ? Offrir un service impeccable, avec le sourire, la rigueur et le sens du détail.
                            </p>
                            <p>
                                Nous voulons moderniser l'image du nettoyage : finies les prestations impersonnelles. Ici, tout est fait avec soin, énergie et respect, à Paris et dans toute l'Île-de-France.
                            </p>
                        </div>
                    </BentoItem>

                    {/* Logo Block */}
                    <BentoItem className="row-span-1 lg:row-span-2 flex items-center justify-center min-h-[300px] lg:min-h-0">
                        <div className="relative w-full h-full flex items-center justify-center">
                            <div ref={el => ringsRef.current[0] = el} className="absolute w-48 h-48 md:w-56 md:h-56 rounded-full border border-brand-primary/20"></div>
                            <div ref={el => ringsRef.current[1] = el} className="absolute w-64 h-64 md:w-72 md:h-72 rounded-full border border-brand-primary/20"></div>
                            <div ref={el => ringsRef.current[2] = el} className="absolute w-80 h-80 md:w-[22rem] md:h-[22rem] rounded-full border-2 border-white/10 opacity-50"></div>
                            
                            <div className="relative w-36 h-36 md:w-48 md:h-48 rounded-full flex items-center justify-center bg-brand-dark/50 backdrop-blur-md shadow-2xl shadow-brand-primary/10 border border-white/10">
                                <img src={logo} alt="M&D Clean Logo" className="w-28 h-28 md:w-36 md:h-36 object-contain rounded-full"/>
                            </div>
                        </div>
                    </BentoItem>

                    {/* Engagements Block */}
                    <BentoItem className="lg:col-span-2">
                        <h3 className="text-3xl font-serif text-white mb-6 flex items-center gap-3">
                            <span className="text-3xl">🔧</span> Nos Engagements
                        </h3>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                            {engagements.map((item, index) => (
                                <li key={index} className="flex items-center gap-3">
                                    <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                                    <span className="text-gray-200">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </BentoItem>
                </div>
            </div>
        </section>
    );
};

export default About; 