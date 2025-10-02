import { Link } from 'react-router-dom';

export default function Home() {
  const categories = [
    {
      name: 'Men',
      items: ['Polos', 'Pants', 'Shorts', 'Outerwear', 'Accessories'],
      image: '/Gemini_Generated_Image_qv9pviqv9pviqv9p.png',
      path: '/collection/men'
    },
    {
      name: 'Women',
      items: ['Polos', 'Skirts', 'Pants', 'Dresses', 'Accessories'],
      image: '/Gemini_Generated_Image_dq7b9ldq7b9ldq7b.png',
      path: '/collection/women'
    },
    {
      name: 'Kids',
      items: ['Tops', 'Bottoms', 'Sets', 'Accessories'],
      image: '/Gemini_Generated_Image_baz6ilbaz6ilbaz6.png',
      path: '/collection/kids'
    },
  ];

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
          <h2 className="text-5xl md:text-7xl font-light tracking-[0.2em] uppercase mb-6">
            Perfecting
            <br />
            Your Game
          </h2>
          <p className="text-xl md:text-2xl font-light text-neutral-300 mb-12 max-w-2xl tracking-wide">
            Premium golf apparel for those who understand that style is part of the swing
          </p>
          <Link
            to="/collection/men"
            className="px-12 py-4 bg-white text-black uppercase tracking-widest font-light hover:bg-neutral-200 transition-colors duration-300"
          >
            Shop Collection
          </Link>
        </div>
      </section>

      <section className="py-24 px-6 bg-neutral-900">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-light text-center mb-16 tracking-wider uppercase text-white">
            Collections
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category) => (
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

      <footer className="bg-black py-12 px-6">
        <div className="container mx-auto text-center text-white">
          <h3 className="text-2xl font-light tracking-[0.3em] uppercase mb-4">
            Lag Daddy
          </h3>
          <p className="text-neutral-500 font-light">
            © 2025 Lag Daddy Golf Apparel. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
