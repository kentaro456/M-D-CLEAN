import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import video1 from '../assets/image/video1.mp4';
import video2 from '../assets/image/video2.mp4';
import video3 from '../assets/image/video3.mp4';
import { ArrowRight } from 'lucide-react';

const videos = [video1, video2, video3];

const Hero = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRefs = [useRef(null), useRef(null)];
  const [activePlayer, setActivePlayer] = useState(0);
  const isInitialMount = useRef(true);

  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentVideoIndex(prevIndex => (prevIndex + 1) % videos.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (!videoRefs[0].current || !videoRefs[1].current) return;

    const nextPlayer = (activePlayer + 1) % 2;
    const currentPlayer = activePlayer;

    videoRefs[nextPlayer].current.src = videos[currentVideoIndex];
    videoRefs[nextPlayer].current.load();
    videoRefs[nextPlayer].current.play().catch(error => console.error("Autoplay failed:", error));

    gsap.to(videoRefs[nextPlayer].current, { opacity: 1, duration: 2, ease: 'power2.inOut' });
    gsap.to(videoRefs[currentPlayer].current, { opacity: 0, duration: 2, ease: 'power2.inOut' });

    setActivePlayer(nextPlayer);
  }, [currentVideoIndex]);

  useEffect(() => {
    const titleSpans = gsap.utils.toArray(titleRef.current.children);

    gsap.fromTo(heroRef.current, { opacity: 0 }, { opacity: 1, duration: 1 });

    gsap.fromTo(titleSpans, 
      { opacity: 0, y: 60, skewX: -10 },
      { 
        opacity: 1, 
        y: 0, 
        skewX: 0,
        duration: 1, 
        stagger: 0.1, 
        ease: 'power4.out',
        delay: 0.5 
      }
    );
    
    gsap.fromTo(subtitleRef.current, 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 1.2 }
    );
    
    gsap.fromTo(ctaRef.current, 
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1, ease: 'elastic.out(1, 0.5)', delay: 1.5 }
    );
  }, []);

  return (
    <section ref={heroRef} className="relative h-screen flex items-center justify-center text-white overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <video
          ref={videoRefs[0]}
          src={videos[0]}
          autoPlay
          muted
          playsInline
          loop
          className="w-full h-full object-cover absolute"
          style={{ opacity: 1 }}
        />
        <video
          ref={videoRefs[1]}
          autoPlay
          muted
          playsInline
          loop
          className="w-full h-full object-cover absolute"
          style={{ opacity: 0 }}
        />
        <div className="absolute inset-0 bg-brand-dark/60"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 text-center px-6">
        <h1 ref={titleRef} className="text-5xl md:text-7xl lg:text-8xl font-serif leading-tight" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
          <span className="inline-block">L'excellence</span>{' '}
          <span className="inline-block">du</span>{' '}
          <span className="inline-block">détail</span>{' '}
          <span className="inline-block">pour</span>{' '}
          <span className="inline-block">des</span>{' '}
          <span className="inline-block">clients</span>{' '}
          <span className="inline-block text-brand-primary" style={{ textShadow: '0 0 30px rgba(212, 175, 55, 0.7)'}}>d'exception</span>
        </h1>
        <p ref={subtitleRef} className="text-xl md:text-2xl mt-6 max-w-3xl mx-auto text-gray-300 drop-shadow-md">
          Redonnez à votre véhicule l'éclat du neuf grâce à notre expertise en nettoyage et detailing automobile.
        </p>
        <div ref={ctaRef} className="mt-12">
          <Link
            to="/contact?tab=quote"
            className="group inline-flex items-center justify-center bg-brand-primary text-brand-dark font-bold text-lg py-4 px-10 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-brand-primary/30 hover:shadow-brand-primary/40"
          >
            Demander un devis
            <ArrowRight className="w-5 h-5 ml-3 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero; 