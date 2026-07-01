import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export interface BreadcrumbItem {
  label: string;
  to?: string;
  current?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div className="border-b border-border bg-muted/30">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-sm flex-wrap">
          {items.map((item, index) => (
            <div key={`${item.label}-${index}`} className="flex items-center gap-2">
              {index > 0 && <ChevronRight className="w-4 h-4" />}
              {item.current || !item.to ? (
                <span className="text-accent font-medium">{item.label}</span>
              ) : (
                <Link to={item.to} className="hover:text-accent transition-colors">
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
