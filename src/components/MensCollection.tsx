import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import StructuredData from './StructuredData';
import { SITE_URL, usePageMetadata } from '../hooks/usePageMetadata';

export default function MensCollection() {
  const { products, isLoading, error } = useProducts();

  const mensProducts = useMemo(
    () => products.filter((product) => product.category === 'men'),
    [products]
  );

  usePageMetadata({
    title: "Men's Golf Collection | Lag Daddy Golf Co",
    description:
      'Explore tour-tested golf clubs, accessories, and performance essentials from Lag Daddy Golf Co designed for elite play.',
    keywords: [
      "men's golf collection",
      'premium golf clubs',
      'golf accessories',
      'Lag Daddy mens gear',
    ],
    canonicalPath: '/collection/men',
  });

  const breadcrumbStructuredData = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: SITE_URL,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: "Men's Collection",
          item: `${SITE_URL}/collection/men`,
        },
      ],
    }),
    []
  );

  return (
    <div className="min-h-screen bg-neutral-900 text-white pt-32 pb-24 px-6">
      <div className="container mx-auto">
        <div className="mb-16">
          <h1 className="text-5xl md:text-6xl font-light tracking-wider uppercase mb-4">
            Men's Collection
          </h1>
          <p className="text-xl text-neutral-400 font-light">
            Premium golf equipment designed for performance
          </p>
        </div>

        {isLoading ? (
          <div className="text-neutral-400 font-light">Loading products...</div>
        ) : error ? (
          <div className="text-rose-400 font-light">
            Unable to load products from Contentful. Displaying available inventory.
          </div>
        ) : null}

        {mensProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {mensProducts.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="group"
              >
                <div className="relative overflow-hidden bg-neutral-800 aspect-square mb-4">
                  <img
                    src={product.photo}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-light tracking-wide group-hover:text-neutral-300 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xl font-light text-neutral-400">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          !isLoading && (
            <div className="text-neutral-400 font-light mt-8">
              No products available in this collection right now.
            </div>
          )
        )}
      </div>

      <StructuredData id="mens-breadcrumbs" data={breadcrumbStructuredData} />
    </div>
  );
}
