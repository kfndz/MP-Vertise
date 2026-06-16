import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { categories } from "@/lib/categories";
import { cn } from "@/lib/utils";

export function CategoryAccordion() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  return (
    <div className="space-y-1">
      {categories.map((category) => {
        const Icon = category.icon;
        const isExpanded = expandedCategory === category.id;

        return (
          <div key={category.id} className="border-b border-border last:border-b-0">
            {/* Category Header */}
            <button
              onClick={() =>
                setExpandedCategory(
                  isExpanded ? null : category.id
                )
              }
              className="w-full px-4 py-3 flex items-center gap-3 justify-between hover:bg-muted transition-colors text-sm font-medium"
            >
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5 text-accent" />
                <span>{category.name}</span>
              </div>
              <ChevronDown
                className={cn(
                  "w-4 h-4 transition-transform duration-300",
                  isExpanded && "rotate-180"
                )}
              />
            </button>

            {/* Subcategories */}
            {isExpanded && (
              <div className="bg-muted/50 border-t border-border">
                {category.subcategories.map((subcategory) => (
                  <Link
                    key={subcategory.id}
                    to={`/categoria/${category.slug}/${subcategory.slug}`}
                    onClick={() => setExpandedCategory(null)}
                    className="block px-8 py-2.5 text-sm text-muted-foreground hover:text-accent hover:bg-muted transition-colors"
                  >
                    {subcategory.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
