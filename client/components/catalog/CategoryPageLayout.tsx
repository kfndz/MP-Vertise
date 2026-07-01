import { type ReactNode } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

interface CategoryPageLayoutProps {
  children: ReactNode;
}

export function CategoryPageLayout({ children }: CategoryPageLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
