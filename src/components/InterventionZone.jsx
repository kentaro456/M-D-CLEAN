import React from 'react';

const InterventionZone = () => {
  return (
    <section id="contact" className="py-20 px-4 bg-gray-100">
      <h2 className="text-4xl font-bold text-center mb-12">Zone d'intervention</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
        <div className="bg-gray-400 h-80 rounded-lg flex items-center justify-center">
          <p className="text-white text-lg">Carte de l'Île-de-France ici</p>
          {/* Intégration de Google Maps ou autre service de carte peut être faite ici */}
        </div>
        <div className="text-left">
          <h3 className="text-2xl font-bold mb-4">Nous venons à vous en Île-de-France</h3>
          <p className="text-lg text-gray-700 mb-2">
            Notre équipe se déplace dans toute l'Île-de-France pour vous offrir nos services de nettoyage.
          </p>
          <p className="text-lg text-gray-700 font-bold">
            Contactez-nous pour vérifier votre éligibilité :
          </p>
          <p className="text-lg text-gray-700">
            📞 06 11 24 04 38
          </p>
           <p className="text-lg text-gray-700">
            📩 mdcleanofficiel@gmail.com
          </p>
        </div>
      </div>
    </section>
  );
};

export default InterventionZone; 