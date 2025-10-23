import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Check } from 'lucide-react';
import StructuredData from './StructuredData';
import { SITE_URL, DEFAULT_SOCIAL_IMAGE, usePageMetadata } from '../hooks/usePageMetadata';
import { useProductById } from '../hooks/useProducts';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { product, isLoading, error } = useProductById(id);
  const [addedToCart, setAddedToCart] = useState(false);

  const resolveProductImageUrl = (photo?: string): string | undefined => {
    if (!photo) {
      return undefined;
    }

    if (/^https?:\/\//i.test(photo)) {
      return photo;
    }

    if (photo.startsWith('//')) {
      return `https:${photo}`;
    }

    const normalisedPath = photo.startsWith('/') ? photo : `/${photo}`;
    return `${SITE_URL}${normalisedPath}`;
  };

  const productImageUrl = resolveProductImageUrl(product?.photo);

  const productTitle = product
    ? `${product.name} | Lag Daddy Golf Co`
    : 'Product Not Found | Lag Daddy Golf Co';

  const productDescription = product
    ? product.description
    : 'Explore premium golf gear, apparel, and accessories from Lag Daddy Golf Co.';

  const canonicalPath = product ? `/product/${product.id}` : '/collection/men';

  usePageMetadata({
    title: productTitle,
    description: productDescription,
    keywords: product
      ? [
          product.name,
          'Lag Daddy Golf Co product',
          'premium golf gear',
          ...product.features.slice(0, 2),
        ]
      : ['Lag Daddy Golf Co', 'premium golf gear'],
    canonicalPath,
    openGraph: {
      type: 'product',
      image: productImageUrl,
    },
  });

  const productStructuredData = useMemo(() => {
    if (!product) {
      return null;
    }

    return {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      description: product.description,
      image: productImageUrl ?? DEFAULT_SOCIAL_IMAGE,
      offers: {
        '@type': 'Offer',
        priceCurrency: 'USD',
        price: product.price.toFixed(2),
        availability: 'https://schema.org/InStock',
        url: `${SITE_URL}/product/${product.id}`,
      },
      brand: {
        '@type': 'Brand',
        name: 'Lag Daddy Golf Co',
      },
    };
  }, [product, productImageUrl]);

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
          name: `${categoryName} Collection`,
          item: `${SITE_URL}${categoryPath}`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: product ? product.name : 'Product',
          item: product ? `${SITE_URL}/product/${product.id}` : `${SITE_URL}${categoryPath}`,
        },
      ],
    }),
    [categoryName, categoryPath, product]
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-900 text-white pt-32 pb-24 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-light mb-4">Loading product...</h1>
          <p className="text-neutral-400 font-light">
            Fetching the latest details from Contentful.
          </p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-neutral-900 text-white pt-32 pb-24 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-light mb-8">Product Not Found</h1>
          <Link
            to={categoryPath}
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
          to={categoryPath}
          className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-12 font-light"
        >
          <ArrowLeft size={20} />
          Back to {categoryName} Collection
        </Link>

        {error && (
          <div className="mb-8 text-rose-400 font-light">
            Unable to load live product data from Contentful. Displaying available information.
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="relative aspect-square bg-neutral-800 overflow-hidden">
            <img
              src={product.photo}
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

      {productStructuredData && <StructuredData id="product-schema" data={productStructuredData} />}
      <StructuredData id="product-breadcrumbs" data={breadcrumbStructuredData} />
    </div>
  );
}
