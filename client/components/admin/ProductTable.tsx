import React from "react";
import type { Product } from "@/types/product";

type Props = {
  products: Product[];
  onEdit: (p: Product) => void;
  onDelete: (id: string | number) => void;
};

function formatPrice(value?: number | string | null) {
  const numberValue = Number(value ?? 0);

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numberValue);
}

export default function ProductTable({ products, onEdit, onDelete }: Props) {
  return (
    <div className="overflow-x-auto rounded-[28px] border border-border bg-card shadow-sm">
      <table className="min-w-full divide-y divide-border">
        <thead className="bg-muted">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-[0.08em] text-muted-foreground">
              ID
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-[0.08em] text-muted-foreground">
              Nome
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-[0.08em] text-muted-foreground">
              Preço
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-[0.08em] text-muted-foreground">
              Categoria
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-[0.08em] text-muted-foreground">
              Subcategoria
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-[0.08em] text-muted-foreground">
              Marketplace
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-[0.08em] text-muted-foreground">
              Ações
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-border">
          {products.map((p) => (
            <tr key={p.id} className="hover:bg-muted/70 transition-colors">
              <td className="px-4 py-3 text-xs text-muted-foreground">
                {String(p.id).slice(0, 8)}
              </td>

              <td className="px-4 py-3 text-sm text-foreground">
                {p.name}
              </td>

              <td className="px-4 py-3 text-sm text-foreground">
                {formatPrice(p.price)}
              </td>

              <td className="px-4 py-3 text-sm text-foreground">
                {p.category ?? "-"}
              </td>

              <td className="px-4 py-3 text-sm text-foreground">
                {p.subcategory ?? "-"}
              </td>

              <td className="px-4 py-3 text-sm text-foreground">
                {p.marketplace ?? "-"}
              </td>

              <td className="px-4 py-3 text-sm text-foreground">
                <button
                  onClick={() => onEdit(p)}
                  className="mr-2 rounded-2xl bg-accent px-3 py-1.5 text-sm font-medium text-accent-foreground transition hover:bg-accent/90"
                >
                  Editar
                </button>

                <button
                  onClick={() => onDelete(p.id)}
                  className="rounded-2xl bg-destructive px-3 py-1.5 text-sm font-medium text-destructive-foreground transition hover:bg-destructive/90"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}

          {products.length === 0 && (
            <tr>
              <td
                colSpan={7}
                className="px-4 py-8 text-center text-sm text-muted-foreground"
              >
                Nenhum produto cadastrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}