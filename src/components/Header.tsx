import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const categories = [
    { name: 'Men', items: ['Polos', 'Pants', 'Shorts', 'Outerwear', 'Accessories'], path: '/collection/men' },
    { name: 'Women', items: ['Polos', 'Skirts', 'Pants', 'Dresses', 'Accessories'], path: '/collection/women' },
    { name: 'Kids', items: ['Tops', 'Bottoms', 'Sets', 'Accessories'], path: '/collection/kids' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-6 flex items-center justify-between">
          <button
            onClick={toggleMenu}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-300"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          <Link to="/" className="text-3xl md:text-4xl font-light tracking-[0.3em] uppercase hover:text-neutral-300 transition-colors">
            Lag Daddy
          </Link>

          <div className="w-12" />
        </div>
      </header>

      <div
        className={`fixed top-0 left-0 h-full w-80 bg-black z-40 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <nav className="pt-32 px-8">
          {categories.map((category) => (
            <div key={category.name} className="mb-10">
              <Link
                to={category.path}
                onClick={toggleMenu}
                className="text-2xl font-light mb-4 tracking-wider border-b border-neutral-700 pb-2 block hover:text-neutral-300 transition-colors"
              >
                {category.name}
              </Link>
              <ul className="space-y-3">
                {category.items.map((item) => (
                  <li key={item}>
                    <a
                      href={`#${category.name.toLowerCase()}-${item.toLowerCase()}`}
                      className="text-neutral-400 hover:text-white transition-colors duration-200 text-lg font-light"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30"
          onClick={toggleMenu}
        />
      )}
    </>
  );
}
