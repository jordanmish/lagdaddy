import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import StructuredData from './StructuredData';
import { usePageMetadata } from '../hooks/usePageMetadata';

const CATEGORIES = [
  {
    name: 'Men',
    items: ['Polos', 'Pants', 'Shorts', 'Outerwear', 'Accessories'],
    image: '/Gemini_Generated_Image_qv9pviqv9pviqv9p.png',
    path: '/collection/men',
  },
  {
    name: 'Women',
    items: ['Polos', 'Skirts', 'Pants', 'Dresses', 'Accessories'],
    image: '/Gemini_Generated_Image_dq7b9ldq7b9ldq7b.png',
    path: '/collection/women',
  },
  {
    name: 'Kids',
    items: ['Tops', 'Bottoms', 'Sets', 'Accessories'],
    image: '/Gemini_Generated_Image_baz6ilbaz6ilbaz6.png',
    path: '/collection/kids',
  },
];

const FAQ_ITEMS = [
  {
    question: 'What makes Lag Daddy Golf Co apparel different?',
    answer:
      'Each Lag Daddy Golf Co piece is designed with tour-grade fabrics, tailored athletic fits, and moisture-wicking technology so you can transition from the course to the lounge in elevated comfort.',
  },
  {
    question: 'Can I reserve a golf bay for events or corporate outings?',
    answer:
      'Yes. Choose Reserve a Bay to select a lounge in your city, enter your event details, and our concierge team will coordinate premium suites, catering, and on-site hosts for your group.',
  },
  {
    question: 'Do you offer custom fittings or swing analysis?',
    answer:
      'Lag Daddy Golf Co lounges feature Toptracer, TrackMan, and on-site fitters who provide data-driven fittings and real-time swing diagnostics with every reservation.',
  },
];

export default function Home() {
  usePageMetadata({
    title: 'Lag Daddy Golf Co | Luxury Golf Apparel & Concierge Lounges',
    description:
      'Elevate your game with Lag Daddy Golf Co—shop luxury golf apparel and reserve private technology-driven bays with concierge-level service across elite U.S. lounges.',
    keywords: [
      'luxury golf apparel',
      'premium golf clothing',
      'golf lounge reservations',
      'indoor golf bays',
      'golf concierge service',
      'Lag Daddy Golf Co',
    ],
    canonicalPath: '/',
  });

  const faqStructuredData = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ_ITEMS.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    }),
    []
  );

  return (
    <>
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 z-10" />

        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="https://videos.pexels.com/video-files/6893878/6893878-uhd_2560_1440_30fps.mp4"
            type="video/mp4"
          />
        </video>

        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6">
          <div className="relative inline-block mx-auto mb-6 px-8 py-6 overflow-hidden rounded-3xl">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 h-full w-full object-cover opacity-50"
              aria-hidden="true"
            >
              <source src="/Golf%20Video.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 rounded-3xl bg-black/40" aria-hidden="true" />
            <h2 className="relative text-5xl md:text-7xl font-light tracking-[0.2em] uppercase">
              Perfecting
              <br />
              Your Game
            </h2>
          </div>
          <p className="text-xl md:text-2xl font-light text-neutral-300 mb-12 max-w-2xl tracking-wide">
            Premium golf apparel for those who understand that style is part of the swing
          </p>
          <div className="flex flex-col md:flex-row gap-4">
            <Link
              to="/collection/men"
              className="px-12 py-4 bg-white text-black uppercase tracking-widest font-light hover:bg-neutral-200 transition-colors duration-300"
            >
              Shop Collection
            </Link>
            <Link
              to="/reserve"
              className="px-12 py-4 border border-white/40 text-white uppercase tracking-widest font-light hover:bg-white hover:text-black transition-colors duration-300"
            >
              Reserve a Bay
            </Link>
            <a
              href="https://strapi.lagdaddy.com/golf1"
              className="px-12 py-4 bg-emerald-400 text-black uppercase tracking-widest font-light hover:bg-emerald-300 transition-colors duration-300"
            >
              Connect Here
            </a>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-neutral-900">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-light text-center mb-16 tracking-wider uppercase text-white">
            Collections
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CATEGORIES.map((category) => (
              <Link
                key={category.name}
                to={category.path}
                className="group relative h-[600px] overflow-hidden bg-neutral-800 cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
                <img
                  src={category.image}
                  alt={`${category.name} collection`}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="relative z-20 h-full flex items-end p-8">
                  <div>
                    <h3 className="text-3xl font-light mb-2 tracking-wider uppercase text-white">
                      {category.name}
                    </h3>
                    <p className="text-neutral-400 font-light">
                      Explore Collection →
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-neutral-950" aria-labelledby="faq-heading">
        <div className="container mx-auto max-w-5xl space-y-12">
          <div className="text-center space-y-4">
            <p className="text-sm uppercase tracking-[0.4em] text-neutral-500">Answer Hub</p>
            <h2 id="faq-heading" className="text-4xl md:text-5xl font-light uppercase tracking-[0.3em] text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-neutral-400 font-light text-lg md:text-xl">
              Everything you need to know about our apparel craftsmanship, technology-forward lounges, and white-glove reservations.
            </p>
          </div>

          <dl className="grid gap-6 md:grid-cols-2" itemScope itemType="https://schema.org/FAQPage">
            {FAQ_ITEMS.map((item) => (
              <div key={item.question} className="rounded-3xl border border-white/10 bg-white/5 p-8" itemProp="mainEntity" itemScope itemType="https://schema.org/Question">
                <dt className="text-2xl font-light text-white mb-4" itemProp="name">
                  {item.question}
                </dt>
                <dd className="text-neutral-300 font-light leading-relaxed" itemProp="acceptedAnswer" itemScope itemType="https://schema.org/Answer">
                  <span itemProp="text">{item.answer}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <footer className="bg-black py-12 px-6">
        <div className="container mx-auto text-center text-white">
          <h3 className="text-2xl font-light tracking-[0.3em] uppercase mb-4">
            Lag Daddy Golf Co
          </h3>
          <p className="text-neutral-500 font-light">
            © 2025 Lag Daddy Golf Co. All rights reserved.
          </p>
        </div>
      </footer>

      <StructuredData id="faq-page-schema" data={faqStructuredData} />
    </>
  );
}
