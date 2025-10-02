import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Check } from 'lucide-react';
import { getProductById } from '../data/products';
import { useState } from 'react';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = id ? getProductById(id) : undefined;
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-neutral-900 text-white pt-32 pb-24 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-light mb-8">Product Not Found</h1>
          <Link
            to="/collection/men"
            className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Collection
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white pt-32 pb-24 px-6">
      <div className="container mx-auto">
        <Link
          to="/collection/men"
          className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-12 font-light"
        >
          <ArrowLeft size={20} />
          Back to Men's Collection
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="relative aspect-square bg-neutral-800 overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-8">
            <div>
              <h1 className="text-5xl font-light tracking-wide mb-4 uppercase">
                {product.name}
              </h1>
              <p className="text-3xl font-light text-neutral-300">
                ${product.price.toFixed(2)}
              </p>
            </div>

            <div className="border-t border-neutral-700 pt-8">
              <p className="text-lg font-light text-neutral-300 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="border-t border-neutral-700 pt-8">
              <h2 className="text-2xl font-light mb-4 uppercase tracking-wide">
                Features
              </h2>
              <ul className="space-y-3">
                {product.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-neutral-300 font-light"
                  >
                    <Check size={20} className="mt-1 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-neutral-700 pt-8">
              <button
                onClick={handleAddToCart}
                className="w-full py-4 bg-white text-black uppercase tracking-widest font-light hover:bg-neutral-200 transition-all duration-300 flex items-center justify-center gap-3"
              >
                {addedToCart ? (
                  <>
                    <Check size={20} />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart size={20} />
                    Add to Cart
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
