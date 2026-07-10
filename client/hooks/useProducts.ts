import { useCallback, useEffect, useState } from "react";

import { ProductService } from "@/services/ProductService";
import type { Product } from "@/types/product";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async (force = false) => {
    try {
      setLoading(true);
      setError(null);

      const data = await ProductService.getAll({
        forceRefresh: force,
      });

      setProducts(data);
    } catch (err) {
      setProducts([]);

      setError(
        err instanceof Error
          ? err.message
          : "Erro ao carregar produtos.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function loadProducts() {
      try {
        setLoading(true);
        setError(null);

        const data = await ProductService.getAll();

        if (isMounted) {
          setProducts(data);
        }
      } catch (err) {
        if (!isMounted) return;

        setProducts([]);

        setError(
          err instanceof Error
            ? err.message
            : "Erro ao carregar produtos.",
        );
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    void loadProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    products,
    loading,
    error,
    refresh,
  };
}