import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import StructuredData from './StructuredData';
import { SITE_URL, usePageMetadata } from '../hooks/usePageMetadata';

export default function KidsCollection() {
  const { products, isLoading, error } = useProducts();

  const kidsProducts = useMemo(
    () => products.filter((product) => product.category === 'kids'),
    [products]
  );

  usePageMetadata({
    title: "Kids' Golf Collection | Lag Daddy Golf Co",
    description:
      'Discover junior-friendly golf gear and accessories from Lag Daddy Golf Co designed to inspire the next generation.',
    keywords: [
      "kids' golf collection",
      'junior golf accessories',
      'youth golf gear',
      'Lag Daddy kids lineup',
    ],
    canonicalPath: '/collection/kids',
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
          name: "Kids' Collection",
          item: `${SITE_URL}/collection/kids`,
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
            Kids' Collection
          </h1>
          <p className="text-xl text-neutral-400 font-light">
            Golf essentials sized for future champions
          </p>
        </div>

        {isLoading ? (
          <div className="text-neutral-400 font-light">Loading products...</div>
        ) : error ? (
          <div className="text-rose-400 font-light">
            Unable to load products from Contentful. Displaying available inventory.
          </div>
        ) : null}

        {kidsProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {kidsProducts.map((product) => (
              <Link key={product.id} to={`/product/${product.id}`} className="group">
                <div className="relative overflow-hidden bg-neutral-800 aspect-square mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-light tracking-wide group-hover:text-neutral-300 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xl font-light text-neutral-400">${product.price.toFixed(2)}</p>
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

      <StructuredData id="kids-breadcrumbs" data={breadcrumbStructuredData} />
    </div>
  );
}
