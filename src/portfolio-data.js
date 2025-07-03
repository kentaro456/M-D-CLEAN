/* eslint-disable no-unused-vars */

// Importez toutes les images et vidéos ici
import ds3Img1 from '@/assets/portfolio/citroen-ds3/realisation-1.jpg';
import ds3Img2 from '@/assets/portfolio/citroen-ds3/realisation-2.jpg';
import ds3Img3 from '@/assets/portfolio/citroen-ds3/realisation-3.jpg';
import ds3Img4 from '@/assets/portfolio/citroen-ds3/realisation-4.jpg';
import ds3Vid5 from '@/assets/portfolio/citroen-ds3/realisation-5.mp4';

// import p3008Vid1 from '@/assets/portfolio/peugeot-3008/realisation-1.mp4';
// import p3008Vid2 from '@/assets/portfolio/peugeot-3008/realisation-2.mp4';
// import p3008Vid3 from '@/assets/portfolio/peugeot-3008/realisation-3.mp4';
import p3008Vid4 from '@/assets/portfolio/peugeot-3008/realisation-4.mp4';
import p3008Vid5 from '@/assets/portfolio/peugeot-3008/realisation-5.mp4';
import p3008Vid6 from '@/assets/portfolio/peugeot-3008/realisation-6.mp4';

import p3008s2Img1 from '@/assets/portfolio/peugeot-3008-2/realisation-1.jpg';
import p3008s2Img2 from '@/assets/portfolio/peugeot-3008-2/realisation-2.jpg';
import p3008s2Img3 from '@/assets/portfolio/peugeot-3008-2/realisation-3.jpg';
import p3008s2Img4 from '@/assets/portfolio/peugeot-3008-2/realisation-4.jpg';
import p3008s2Img5 from '@/assets/portfolio/peugeot-3008-2/realisation-5.jpg';
import p3008s2Img6 from '@/assets/portfolio/peugeot-3008-2/realisation-6.jpg';
import p3008s2Img7 from '@/assets/portfolio/peugeot-3008-2/realisation-7.jpg';
import p3008s2Img8 from '@/assets/portfolio/peugeot-3008-2/realisation-8.jpg';

import clioImg1 from '@/assets/portfolio/clio-v/realisation-1.jpg';
import clioImg2 from '@/assets/portfolio/clio-v/realisation-2.jpg';
import clioImg3 from '@/assets/portfolio/clio-v/realisation-3.jpg';
import clioImg4 from '@/assets/portfolio/clio-v/realisation-4.jpg';
import clioImg5 from '@/assets/portfolio/clio-v/realisation-5.jpg';
import clioImg6 from '@/assets/portfolio/clio-v/realisation-6.jpg';
import clioImg7 from '@/assets/portfolio/clio-v/realisation-7.jpg';
import clioImg8 from '@/assets/portfolio/clio-v/realisation-8.jpg';

import nissanImg1 from '@/assets/portfolio/nissan/realisation-1.jpg';
import nissanImg2 from '@/assets/portfolio/nissan/realisation-2.jpg';
import nissanImg3 from '@/assets/portfolio/nissan/realisation-3.jpg';
import nissanImg4 from '@/assets/portfolio/nissan/realisation-4.jpg';
import nissanImg5 from '@/assets/portfolio/nissan/realisation-5.jpg';
import nissanImg6 from '@/assets/portfolio/nissan/realisation-6.jpg';

import suzukiImg1 from '@/assets/portfolio/suzuki-swift/realisation-1.jpg';
import suzukiImg2 from '@/assets/portfolio/suzuki-swift/realisation-2.jpg';
import suzukiImg3 from '@/assets/portfolio/suzuki-swift/realisation-3.jpg';
import suzukiImg4 from '@/assets/portfolio/suzuki-swift/realisation-4.jpg';
import suzukiImg5 from '@/assets/portfolio/suzuki-swift/realisation-5.jpg';
import suzukiImg6 from '@/assets/portfolio/suzuki-swift/realisation-6.jpg';


// Données pour le composant Portfolio
// Chaque objet représente un slide pour un véhicule spécifique.

export const portfolioSlides = [
  {
    id: 1,
    title: "Citroën DS3",
    description: "Nettoyage intérieur complet avec traitement des sièges et tableau de bord.",
    media: [
      { type: 'image', src: ds3Img1, alt: 'Citroën DS3 - Vue 1' },
      { type: 'image', src: ds3Img2, alt: 'Citroën DS3 - Vue 2' },
      { type: 'image', src: ds3Img3, alt: 'Citroën DS3 - Vue 3' },
      { type: 'image', src: ds3Img4, alt: 'Citroën DS3 - Vue 4' },
      { type: 'video', src: ds3Vid5, alt: 'Vidéo de la réalisation sur Citroën DS3' }
    ]
  },
  {
    id: 2,
    title: "Peugeot 3008",
    description: "Rénovation intérieure filmée, montrant notre processus en détail.",
    thumbnail: p3008s2Img1,
    media: [
      // { type: 'video', src: p3008Vid1, alt: 'Vidéo 1' },
      // { type: 'video', src: p3008Vid2, alt: 'Vidéo 2' },
      // { type: 'video', src: p3008Vid3, alt: 'Vidéo 3' },
      { type: 'video', src: p3008Vid4, alt: 'Vidéo 4' },
      { type: 'video', src: p3008Vid5, alt: 'Vidéo 5' },
      { type: 'video', src: p3008Vid6, alt: 'Vidéo 6' }
    ]
  },
  {
    id: 3,
    title: "Peugeot 3008 (Série 2)",
    description: "Transformation complète avant/après en images.",
    media: [
      { type: 'image', src: p3008s2Img1, alt: 'Peugeot 3008-2 - Vue 1' },
      { type: 'image', src: p3008s2Img2, alt: 'Peugeot 3008-2 - Vue 2' },
      { type: 'image', src: p3008s2Img3, alt: 'Peugeot 3008-2 - Vue 3' },
      { type: 'image', src: p3008s2Img4, alt: 'Peugeot 3008-2 - Vue 4' },
      { type: 'image', src: p3008s2Img5, alt: 'Peugeot 3008-2 - Vue 5' },
      { type: 'image', src: p3008s2Img6, alt: 'Peugeot 3008-2 - Vue 6' },
      { type: 'image', src: p3008s2Img7, alt: 'Peugeot 3008-2 - Vue 7' },
      { type: 'image', src: p3008s2Img8, alt: 'Peugeot 3008-2 - Vue 8' }
    ]
  },
  {
    id: 4,
    title: "Renault Clio V",
    description: "Nettoyage en profondeur avec une attention particulière aux détails.",
    media: [
      { type: 'image', src: clioImg1, alt: 'Clio V - Vue 1' },
      { type: 'image', src: clioImg2, alt: 'Clio V - Vue 2' },
      { type: 'image', src: clioImg3, alt: 'Clio V - Vue 3' },
      { type: 'image', src: clioImg4, alt: 'Clio V - Vue 4' },
      { type: 'image', src: clioImg5, alt: 'Clio V - Vue 5' },
      { type: 'image', src: clioImg6, alt: 'Clio V - Vue 6' },
      { type: 'image', src: clioImg7, alt: 'Clio V - Vue 7' },
      { type: 'image', src: clioImg8, alt: 'Clio V - Vue 8' }
    ]
  },
  {
    id: 5,
    title: "Nissan",
    description: "Remise à neuf complète de l'habitacle pour un résultat impeccable.",
    media: [
      { type: 'image', src: nissanImg1, alt: 'Nissan - Vue 1' },
      { type: 'image', src: nissanImg2, alt: 'Nissan - Vue 2' },
      { type: 'image', src: nissanImg3, alt: 'Nissan - Vue 3' },
      { type: 'image', src: nissanImg4, alt: 'Nissan - Vue 4' },
      { type: 'image', src: nissanImg5, alt: 'Nissan - Vue 5' },
      { type: 'image', src: nissanImg6, alt: 'Nissan - Vue 6' }
    ]
  },
  {
    id: 6,
    title: "Suzuki Swift",
    description: "Restauration intérieure soignée pour redonner vie à ce véhicule.",
    media: [
      { type: 'image', src: suzukiImg1, alt: 'Suzuki Swift - Vue 1' },
      { type: 'image', src: suzukiImg2, alt: 'Suzuki Swift - Vue 2' },
      { type: 'image', src: suzukiImg3, alt: 'Suzuki Swift - Vue 3' },
      { type: 'image', src: suzukiImg4, alt: 'Suzuki Swift - Vue 4' },
      { type: 'image', src: suzukiImg5, alt: 'Suzuki Swift - Vue 5' },
      { type: 'image', src: suzukiImg6, alt: 'Suzuki Swift - Vue 6' }
    ]
  }
]; 