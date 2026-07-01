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
    onFiltersChange({ ...filters, minRating: filters.minRating === value ? 0 : value });
  };

  return (
    <div className={`${showFilters ? "block" : "hidden"} lg:block`}>
      <div className="bg-card border border-border rounded-lg p-6 sticky top-32">
        <h3 className="font-semibold text-lg mb-6 flex items-center gap-2">
          <Sliders className="w-5 h-5" />
          Filtros
        </h3>

        {categories.length > 0 && (
          <div className="mb-8">
            <label className="text-sm font-semibold block mb-4">Categorias</label>
            <div className="space-y-2">
              {categories.map((category) => (
                <label key={category.id} className="flex items-center gap-2 cursor-pointer">
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
            <label className="text-sm font-semibold block mb-4">Faixa de Preço</label>
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
            <div className="flex gap-2 mt-3">
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
                className="flex-1 px-3 py-2 border border-border rounded-lg text-sm"
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
                className="flex-1 px-3 py-2 border border-border rounded-lg text-sm"
              />
            </div>
          </div>
        )}

        <div className="mb-8">
          <label className="text-sm font-semibold block mb-4">Classificação</label>
          <div className="space-y-3">
            {ratingOptions.map((star) => (
              <label key={star} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded"
                  checked={filters.minRating >= star}
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
                <span className="text-sm text-muted-foreground">para cima</span>
              </label>
            ))}
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
