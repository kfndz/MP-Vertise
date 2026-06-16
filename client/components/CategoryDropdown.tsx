import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { categories, type Category } from "@/lib/categories";
import { cn } from "@/lib/utils";

export function CategoryDropdown() {
  const [activeCategory, setActiveCategory] = useState<Category | null>(
    categories[0] || null
  );
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Button */}
      <button className="flex items-center gap-1 text-sm font-medium hover:text-accent transition-colors py-2">
        Categorias
        <ChevronDown
          className={cn(
            "w-4 h-4 transition-transform duration-300",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {/* Dropdown */}
      <div
        className={cn(
          "absolute top-full left-0 mt-2 bg-card border border-border rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50",
          "w-96 py-2"
        )}
      >
        <div className="flex">
          {/* Categories List */}
          <div className="w-48 border-r border-border">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onMouseEnter={() => setActiveCategory(category)}
                  className={cn(
                    "w-full px-4 py-3 text-sm text-left flex items-center gap-3 transition-colors",
                    "hover:bg-muted",
                    activeCategory?.id === category.id &&
                      "bg-accent/10 text-accent font-medium"
                  )}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{category.name}</span>
                </button>
              );
            })}
          </div>

          {/* Subcategories */}
          {activeCategory && (
            <div className="w-56 pl-4 pr-4 py-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-3">
                {activeCategory.name}
              </p>
              <div className="space-y-1">
                {activeCategory.subcategories.map((subcategory) => (
                  <Link
                    key={subcategory.id}
                    to={`/categoria/${activeCategory.slug}/${subcategory.slug}`}
                    className="block px-3 py-2 text-sm text-muted-foreground hover:text-accent hover:bg-muted rounded transition-colors whitespace-nowrap"
                  >
                    {subcategory.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
