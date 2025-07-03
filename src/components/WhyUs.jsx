import React from 'react';

const WhyUs = () => {
  const reasons = [
    { title: 'Artisanat de qualité', description: 'Nous utilisons les meilleures techniques et produits pour un résultat impeccable.' },
    { title: 'Intervention rapide à Paris', description: 'Nous nous déplaçons rapidement chez vous ou sur votre lieu de travail.' },
    { title: 'Tarifs accessibles', description: 'Des prix compétitifs pour un service de haute qualité.' },
    { title: 'Matériel écoresponsable', description: 'Nous utilisons des produits respectueux de l\'environnement.' },
    { title: 'Entreprise jeune et dynamique', description: 'Une équipe passionnée et à votre écoute.' },
  ];

  return (
    <section id="why-us" className="py-20 px-4">
      <h2 className="text-4xl font-bold text-center mb-12">Pourquoi nous choisir ?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {reasons.map((reason, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-2 text-blue-900">{reason.title}</h3>
            <p className="text-gray-700">{reason.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyUs; 