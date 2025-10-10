import { useEffect, useMemo, useState } from 'react';
import type { Product } from '../data/products';
import {
  fetchProductsFromContentful,
  fallbackProducts,
  getCachedProducts,
  setCachedProducts,
} from '../data/products';

interface UseProductsResult {
  products: Product[];
  isLoading: boolean;
  error: Error | null;
}

export const useProducts = (): UseProductsResult => {
  const [products, setProducts] = useState<Product[]>(() => getCachedProducts() ?? []);
  const [isLoading, setIsLoading] = useState<boolean>(() => products.length === 0);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    if (products.length > 0) {
      return () => {
        isMounted = false;
      };
    }

    setIsLoading(true);

    fetchProductsFromContentful()
      .then((fetchedProducts) => {
        if (!isMounted) {
          return;
        }

        if (fetchedProducts.length === 0) {
          setProducts(fallbackProducts);
          setError(null);
          return;
        }

        setProducts(fetchedProducts);
        setCachedProducts(fetchedProducts);
        setError(null);
      })
      .catch((err: unknown) => {
        if (!isMounted) {
          return;
        }

        const errorInstance = err instanceof Error ? err : new Error('Failed to load products from Contentful');
        setError(errorInstance);
        setProducts(fallbackProducts);
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [products.length]);

  return { products, isLoading, error };
};

export const useProductById = (id?: string): { product: Product | undefined; isLoading: boolean; error: Error | null } => {
  const { products, isLoading, error } = useProducts();

  const product = useMemo(() => {
    if (!id) {
      return undefined;
    }

    return products.find((item) => item.id === id);
  }, [id, products]);

  return { product, isLoading, error };
};
