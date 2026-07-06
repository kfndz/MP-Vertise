import { Sliders, Star } from "lucide-react";
import type { ProductFilterState } from "@/utils/productFilters";
import { ChevronRight } from "lucide-react";

interface ProductFiltersProps {
  filters: ProductFilterState;
  onFiltersChange: (filters: ProductFilterState) => void;
  categories: Array<{ id: string; name: string }>;
  showFilters?: boolean;
  onClear?: () => void;
  compact?: boolean;
}

const ratingOptions = [5, 4, 3, 2, 1];

export function ProductFilters({
  filters,
  onFiltersChange,
  categories,
  showFilters = true,
  onClear,
  compact = false,
}: ProductFiltersProps) {
  const toggleCategory = (categoryId: string) => {
    const nextCategories = filters.categories.includes(categoryId)
      ? filters.categories.filter((item) => item !== categoryId)
      : [...filters.categories, categoryId];

    onFiltersChange({ ...filters, categories: nextCategories });
  };

  const toggleRating = (value: number) => {
    // Força a conversão do estado atual para número antes de comparar no clique
    const currentRating = Number(filters.minRating);
    onFiltersChange({
      ...filters,
      minRating: currentRating === value ? 0 : value,
    });
  };

  return (
    <div className={`${showFilters ? "block" : "hidden"} lg:block`}>
      <div className="bg-card border border-border rounded-lg p-6 sticky top-32 max-w-full overflow-hidden">
        <h3 className="font-semibold text-lg mb-6 flex items-center gap-2">
          <Sliders className="w-5 h-5" />
          Filtros
        </h3>

        {categories.length > 0 && (
          <div className="mb-8">
            <label className="text-sm font-semibold block mb-4">
              Categorias
            </label>
            <div className="space-y-2">
              {categories.map((category) => (
                <label
                  key={category.id}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="rounded"
                    checked={filters.categories.includes(category.id)}
                    onChange={() => toggleCategory(category.id)}
                  />
                  <span className="text-sm">{category.name}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {!compact && (
          <div className="mb-8">
            <label className="text-sm font-semibold block mb-4">
              Faixa de Preço
            </label>
            <input
              type="range"
              min="0"
              max="500"
              value={filters.priceRange.max}
              onChange={(event) =>
                onFiltersChange({
                  ...filters,
                  priceRange: {
                    ...filters.priceRange,
                    max: Number(event.target.value),
                  },
                })
              }
              className="w-full"
            />

            <div className="grid grid-cols-2 gap-2 mt-3 w-full">
              <input
                type="number"
                placeholder="Min"
                value={filters.priceRange.min}
                onChange={(event) =>
                  onFiltersChange({
                    ...filters,
                    priceRange: {
                      ...filters.priceRange,
                      min: Number(event.target.value) || 0,
                    },
                  })
                }
                className="w-full min-w-0 px-2 py-2 border border-border rounded-lg text-sm text-center"
              />
              <input
                type="number"
                placeholder="Max"
                value={filters.priceRange.max}
                onChange={(event) =>
                  onFiltersChange({
                    ...filters,
                    priceRange: {
                      ...filters.priceRange,
                      max: Number(event.target.value) || 500,
                    },
                  })
                }
                className="w-full min-w-0 px-2 py-2 border border-border rounded-lg text-sm text-center"
              />
            </div>
          </div>
        )}

        <div className="mb-8">
          <label className="text-sm font-semibold block mb-4">
            Classificação
          </label>
          <div className="space-y-3">
            {ratingOptions.map((star) => {
              // TRAVA DE SEGURANÇA: Força o valor do filtro a virar um número limpo antes de testar o checkbox
              const isChecked = Number(filters.minRating) > 0 && Number(filters.minRating) === star;

              return (
                <label
                  key={star}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="rounded"
                    // Agora ele só marca a caixinha exata clicada, sem efeito cascata indesejado
                    checked={isChecked}
                    onChange={() => toggleRating(star)}
                  />
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className={`w-4 h-4 ${index < star ? "fill-accent text-accent" : "text-muted"}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground"></span>
                </label>
              );
            })}
          </div>
        </div>

        {onClear && (
          <button
            onClick={onClear}
            className="w-full py-2 border border-accent text-accent rounded-lg text-sm font-semibold hover:bg-accent hover:text-white transition-colors"
          >
            Limpar Filtros
          </button>
        )}
      </div>
    </div>
  );
}