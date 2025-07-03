import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Footer from '../components/Footer';

const LegalNoticePage = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(pageRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });
  }, []);

  const SectionTitle = ({ children }) => (
    <h2 className="text-3xl font-serif text-brand-primary mt-12 mb-6 border-l-4 border-brand-primary pl-4">{children}</h2>
  );

  const InfoPair = ({ label, value }) => (
    <div className="border-t border-white/10 py-5">
      <dt className="font-semibold text-white text-lg">{label}</dt>
      <dd className="mt-1 text-gray-300">{value}</dd>
    </div>
  );

  return (
    <main ref={pageRef} className="text-white py-24 sm:py-32">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-serif">Mentions Légales</h1>
        </div>
        
        <div className="bg-brand-surface p-8 md:p-12 rounded-2xl shadow-2xl">
          <SectionTitle>Éditeur du site</SectionTitle>
          <dl>
            <InfoPair label="Dénomination sociale" value="M&D CLEAN" />
            <InfoPair label="Forme juridique" value="SAS, société par actions simplifiée" />
            <InfoPair label="Capital social" value="201 EUR" />
            <InfoPair label="Adresse du siège" value="60 rue François 1er, 75008 Paris, FRANCE" />
            <InfoPair label="Numéro SIREN" value="943 077 818" />
            <InfoPair label="Date d'immatriculation" value="13/05/2025" />
            <InfoPair label="E-mail" value={<a href="mailto:mdclean.idf@gmail.com" className="hover:text-brand-primary">mdclean.idf@gmail.com</a>} />
            <InfoPair label="Téléphone" value={<a href="tel:+33611240438" className="hover:text-brand-primary">06 11 24 04 38</a>} />
          </dl>

          <SectionTitle>Représentants Légaux</SectionTitle>
          <dl>
            <InfoPair label="Président" value="MAVINGA MALAKO Dan-Maximilien" />
            <InfoPair label="Directeur Général" value="MAMBETUKU EMMANUEL, KEVIN" />
          </dl>

          <SectionTitle>Activité</SectionTitle>
          <dl>
              <InfoPair label="Code APE" value="4520A - Entretien et réparation de véhicules automobiles légers" />
              <InfoPair label="Activité principale" value="Le lavage et le nettoyage de véhicules automobiles, intérieur et extérieur. Nettoyage des canapés et des chaises." />
          </dl>

          <SectionTitle>Hébergement du site</SectionTitle>
          <div className="text-gray-300 border-t border-white/10 py-5">
              <p>Les informations concernant l'hébergeur du site seront ajoutées prochainement.</p>
          </div>

          <SectionTitle>Propriété intellectuelle</SectionTitle>
          <div className="text-gray-300 border-t border-white/10 py-5">
            <p>L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.</p>
          </div>

          <SectionTitle>Données personnelles</SectionTitle>
           <div className="text-gray-300 border-t border-white/10 py-5">
            <p>Conformément au règlement (UE) 2016/679 du Parlement européen et du Conseil du 27 avril 2016 (RGPD), il est porté à votre connaissance que le déclarant s'est opposé à la mise à disposition de ses données à des fins de prospection. Pour toute question relative à la gestion de vos données personnelles, veuillez nous contacter par e-mail.</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LegalNoticePage; 