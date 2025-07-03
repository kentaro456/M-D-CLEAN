import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import WhyUs from '../components/WhyUs';
import Testimonials from '../components/Testimonials';
import Portfolio from '../components/Portfolio';
import Booking from '../components/Booking';
import InterventionZone from '../components/InterventionZone';

const LandingPage = () => {
  return (
    <div className="pt-0">
      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <WhyUs />
        <Testimonials />
      </main>
    </div>
  );
};

export default LandingPage; 