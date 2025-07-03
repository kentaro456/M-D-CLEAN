import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, Maximize, Play } from 'lucide-react';
import { portfolioSlides } from '../portfolio-data.js';
import gsap from 'gsap';
import { AnimatePresence, motion } from 'framer-motion';

const PortfolioElegant = () => {
  const [currentSlide, setCurrentSlide] = useState(Math.floor(portfolioSlides.length / 2));
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const slideRefs = useRef([]);
  const containerRef = useRef(null);
  const [xOffsetFactor, setXOffsetFactor] = useState(45);
  
  // --- Animation Constants ---
  const DURATION = 0.8;
  const EASE = 'power4.inOut';
  const PRIMARY_SCALE = 1;
  const SECONDARY_SCALE = 0.7;
  const ROTATION = 40; 
  const Y_OFFSET = 20;

  useEffect(() => {
    const handleResize = () => {
      // lg breakpoint in Tailwind is 1024px
      if (window.innerWidth < 1024) {
        setXOffsetFactor(75);
      } else {
        setXOffsetFactor(45);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    slideRefs.current.forEach((slideEl, index) => {
      if (!slideEl) return;
      
      const offset = index - currentSlide;
      const isPrimary = offset === 0;
      
      const titleEl = slideEl.querySelector('.slide-title');
      const descriptionEl = slideEl.querySelector('.slide-description');
      const reflectionEl = slideEl.querySelector('.slide-reflection');

      gsap.to(slideEl, {
        xPercent: offset * xOffsetFactor,
        y: isPrimary ? 0 : Y_OFFSET,
        rotationY: isPrimary ? 0 : (offset > 0 ? -ROTATION : ROTATION),
        scale: isPrimary ? PRIMARY_SCALE : SECONDARY_SCALE,
        zIndex: portfolioSlides.length - Math.abs(offset),
        duration: DURATION,
        ease: EASE,
      });

      gsap.to(slideEl.querySelector('.slide-image-container'), {
        filter: isPrimary ? 'brightness(1)' : 'brightness(0.6)',
        duration: DURATION,
        ease: EASE,
      });
      
      gsap.to(reflectionEl, {
        opacity: isPrimary ? 1 : 0.3,
        duration: DURATION,
        ease: EASE
      });
      
      if(titleEl && descriptionEl) {
        gsap.to([titleEl, descriptionEl], {
            y: isPrimary ? 0 : 20,
            opacity: isPrimary ? 1 : 0,
            duration: DURATION,
            ease: EASE,
            stagger: 0.1
        });
      }
    });
    
  }, [currentSlide, xOffsetFactor]);

  const handleSlideClick = (index) => {
    if (index === currentSlide) {
      setSelectedVehicle(portfolioSlides[index]);
    } else {
      setCurrentSlide(index);
    }
  };

  const changeSlide = (direction) => {
    setCurrentSlide(prev => {
        const newIndex = prev + direction;
        if (newIndex < 0) return portfolioSlides.length - 1;
        if (newIndex >= portfolioSlides.length) return 0;
        return newIndex;
    });
  };

  const closeModal = () => setSelectedVehicle(null);

  return (
    <section ref={containerRef} className="py-24 sm:py-32 text-white overflow-hidden relative">
      {/* Background Effects */}
      <div className="absolute -top-20 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-20 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">Nos Chefs-d'œuvre</h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Chaque détail compte. Découvrez nos réalisations.
          </p>
        </div>

        <div 
          className="relative h-[550px] w-full"
          style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
        >
          {portfolioSlides.map((slide, index) => {
            const isVideo = slide.media[0].type === 'video';
            return (
              <div
                key={slide.id}
                ref={el => slideRefs.current[index] = el}
                className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
                style={{ transformOrigin: 'center center' }}
                onClick={() => handleSlideClick(index)}
              >
                <div className="w-[90%] lg:w-[55%] h-[75%] relative cursor-pointer group">
                  <div className="slide-image-container w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-brand-dark/50">
                    <img
                      src={slide.thumbnail || (isVideo ? slide.media[0].src.replace('.mp4', '.jpg') : slide.media[0].src)}
                      alt={slide.media[0].alt}
                      className="w-full h-full object-cover"
                      onError={(e) => { 
                        // Fallback in case a JPG thumbnail doesn't exist
                        e.target.style.backgroundColor = '#111';
                        e.target.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'; 
                      }}
                    />
                  </div>
                  {/* Reflection */}
                  <div className="slide-reflection absolute top-full left-0 w-full h-full mt-2"
                    style={{
                      transform: 'scaleY(-1)',
                      WebkitBoxReflect: 'below 0px -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(70%, transparent), to(rgba(255,255,255,0.1)))',
                    }}
                  >
                    <img src={slide.thumbnail || (isVideo ? slide.media[0].src.replace('.mp4', '.jpg') : slide.media[0].src)} className="w-full h-full object-cover" alt="" />
                  </div>
                  
                  <div className="absolute bottom-8 left-8 right-8 text-white">
                    <h3 className="slide-title text-3xl font-serif font-bold drop-shadow-lg opacity-0">{slide.title}</h3>
                    <p className="slide-description text-gray-300 drop-shadow-md opacity-0 mt-1">{slide.description}</p>
                  </div>

                  {index === currentSlide && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 rounded-2xl">
                      {isVideo ? <Play className="w-20 h-20 text-white drop-shadow-lg" /> : <Maximize className="w-16 h-16 text-white" />}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center items-center mt-24 space-x-8 relative z-20">
            <button onClick={() => changeSlide(-1)} className="p-3 bg-brand-surface/50 backdrop-blur-xl border border-white/10 rounded-full hover:bg-white/5 transition-colors" aria-label="Slide précédent">
                <ChevronLeft className="w-8 h-8 text-white" />
            </button>
            <span className="text-lg font-semibold tabular-nums">
                {String(currentSlide + 1).padStart(2, '0')} / {String(portfolioSlides.length).padStart(2, '0')}
            </span>
            <button onClick={() => changeSlide(1)} className="p-3 bg-brand-surface/50 backdrop-blur-xl border border-white/10 rounded-full hover:bg-white/5 transition-colors" aria-label="Slide suivant">
                <ChevronRight className="w-8 h-8 text-white" />
            </button>
        </div>
      </div>
      <AnimatePresence>
        {selectedVehicle && <Modal vehicle={selectedVehicle} onClose={closeModal} />}
      </AnimatePresence>
    </section>
  );
};

// Modal Component
const Modal = ({ vehicle, onClose }) => {
    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
    const modalRef = useRef(null);

    const nextMedia = (e) => {
        e.stopPropagation();
        setCurrentMediaIndex(prev => (prev + 1) % vehicle.media.length);
    };
    const prevMedia = (e) => {
        e.stopPropagation();
        setCurrentMediaIndex(prev => (prev - 1 + vehicle.media.length) % vehicle.media.length);
    };

    const currentMedia = vehicle.media[currentMediaIndex];
  
    const handleBackdropClick = (e) => {
        if (modalRef.current && e.target === modalRef.current) {
            onClose();
        }
    };

    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    return (
      <motion.div
        ref={modalRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={handleBackdropClick}
        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center backdrop-blur-sm p-4"
      >
        <motion.div
            initial={{ scale: 0.9, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 30 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative w-full max-w-5xl bg-brand-dark/50 border border-white/10 rounded-2xl shadow-2xl flex flex-col"
        >
            <div className="p-4 flex justify-between items-center border-b border-white/10">
                <div className="text-white">
                    <h3 className="font-bold text-xl">{vehicle.title}</h3>
                    <p className="text-sm text-gray-400">{currentMedia.alt}</p>
                </div>
                <button onClick={onClose} className="p-2 rounded-full text-white bg-white/10 hover:bg-white/20 transition-colors">
                    <X className="w-6 h-6"/>
                </button>
            </div>

            <div className="aspect-video w-full bg-black flex items-center justify-center relative">
                {currentMedia.type === 'image' ? (
                    <img src={currentMedia.src} alt={currentMedia.alt} className="max-h-[75vh] w-auto object-contain" />
                ) : (
                    <video src={currentMedia.src} controls autoPlay className="max-h-[75vh] w-auto object-contain" />
                )}
            </div>

            {vehicle.media.length > 1 && (
                <div className="flex justify-between items-center p-4 bg-black/20">
                    <button onClick={prevMedia} className="text-white p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/10"><ChevronLeft className="w-6 h-6"/></button>
                    <span className="text-sm text-gray-300 tabular-nums">
                        {currentMediaIndex + 1} / {vehicle.media.length}
                    </span>
                    <button onClick={nextMedia} className="text-white p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/10"><ChevronRight className="w-6 h-6"/></button>
                </div>
            )}
        </motion.div>
      </motion.div>
    );
};
  
export default PortfolioElegant; 