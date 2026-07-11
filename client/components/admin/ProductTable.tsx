import {
  Edit3,
  Package,
  Store,
  Tag,
  Trash2,
} from "lucide-react";

import type { Product } from "@/types/product";

type Props = {
  products: Product[];
  loading?: boolean;
  deletingId?: string | number | null;
  onEdit: (product: Product) => void;
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

function formatLabel(value?: string | null) {
  if (!value) return "-";

  return value
    .split("-")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() + word.slice(1),
    )
    .join(" ");
}

export default function ProductTable({
  products,
  loading = false,
  deletingId = null,
  onEdit,
  onDelete,
}: Props) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 lg:hidden">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="h-56 animate-pulse rounded-3xl border border-border bg-card"
          />
        ))}

        <div className="hidden h-72 animate-pulse rounded-3xl border border-border bg-card lg:block" />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex min-h-[280px] flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-card px-6 py-10 text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
          <Package className="h-7 w-7 text-accent" />
        </div>

        <h2 className="text-xl font-semibold">
          Nenhum produto cadastrado
        </h2>

        <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
          Use o botão “Adicionar produto” para inserir o primeiro
          item do catálogo.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Cards para celular e tablet */}
      <div className="grid grid-cols-1 gap-4 lg:hidden">
        {products.map((product) => {
          const isDeleting =
            String(deletingId) === String(product.id);

          const imageUrl =
            product.image ??
            product.images?.find(Boolean) ??
            "/images/home-image.webp";

          return (
            <article
              key={product.id}
              className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm"
            >
              <div className="flex gap-4 border-b border-border p-4 sm:p-5">
                <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-border bg-white">
                  <img
                    src={imageUrl}
                    alt={product.name}
                    onError={(event) => {
                      event.currentTarget.src =
                        "/images/home-image.webp";
                    }}
                    className="h-full w-full object-contain p-2"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs text-muted-foreground">
                    ID: {String(product.id).slice(0, 8)}
                  </p>

                  <h2 className="mt-1 line-clamp-2 font-semibold leading-snug text-foreground">
                    {product.name}
                  </h2>

                  <p className="mt-2 text-lg font-bold text-foreground">
                    {formatPrice(product.price)}
                  </p>

                  <p className="mt-1 truncate text-sm text-muted-foreground">
                    Estoque: {Number(product.stock ?? 0)}
                  </p>
                </div>
              </div>

              <div className="grid gap-3 px-4 py-4 text-sm sm:grid-cols-3 sm:px-5">
                <div className="flex min-w-0 items-center gap-2">
                  <Tag className="h-4 w-4 flex-shrink-0 text-accent" />

                  <span className="truncate">
                    {formatLabel(product.category)}
                  </span>
                </div>

                <div className="flex min-w-0 items-center gap-2">
                  <Package className="h-4 w-4 flex-shrink-0 text-accent" />

                  <span className="truncate">
                    {formatLabel(product.subcategory)}
                  </span>
                </div>

                <div className="flex min-w-0 items-center gap-2">
                  <Store className="h-4 w-4 flex-shrink-0 text-accent" />

                  <span className="truncate">
                    {product.marketplace ?? "-"}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2 border-t border-border p-4 sm:flex-row sm:justify-end sm:p-5">
                <button
                  type="button"
                  onClick={() => onEdit(product)}
                  disabled={isDeleting}
                  className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-accent/30 bg-accent/10 px-4 py-2 text-sm font-semibold text-accent transition hover:bg-accent/20 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  <Edit3 className="h-4 w-4" />
                  Editar
                </button>

                <button
                  type="button"
                  onClick={() => onDelete(product.id)}
                  disabled={isDeleting}
                  className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-2 text-sm font-semibold text-destructive transition hover:bg-destructive/20 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  <Trash2 className="h-4 w-4" />
                  {isDeleting ? "Excluindo..." : "Excluir"}
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {/* Tabela para desktop */}
      <div className="hidden overflow-hidden rounded-3xl border border-border bg-card shadow-sm lg:block">
        <div className="overflow-x-auto">
          <table className="min-w-[1050px] w-full divide-y divide-border">
            <thead className="bg-muted/70">
              <tr>
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                  Produto
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                  Preço
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                  Categoria
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                  Subcategoria
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                  Marketplace
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                  Estoque
                </th>

                <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                  Ações
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {products.map((product) => {
                const isDeleting =
                  String(deletingId) ===
                  String(product.id);

                const imageUrl =
                  product.image ??
                  product.images?.find(Boolean) ??
                  "/images/home-image.webp";

                return (
                  <tr
                    key={product.id}
                    className="transition-colors hover:bg-muted/40"
                  >
                    <td className="px-5 py-4">
                      <div className="flex min-w-[240px] items-center gap-3">
                        <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-white">
                          <img
                            src={imageUrl}
                            alt={product.name}
                            onError={(event) => {
                              event.currentTarget.src =
                                "/images/home-image.webp";
                            }}
                            className="h-full w-full object-contain p-1.5"
                          />
                        </div>

                        <div className="min-w-0">
                          <p className="max-w-[260px] truncate text-sm font-semibold text-foreground">
                            {product.name}
                          </p>

                          <p className="mt-1 text-xs text-muted-foreground">
                            ID: {String(product.id).slice(0, 8)}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold">
                      {formatPrice(product.price)}
                    </td>

                    <td className="px-5 py-4 text-sm">
                      {formatLabel(product.category)}
                    </td>

                    <td className="px-5 py-4 text-sm">
                      {formatLabel(product.subcategory)}
                    </td>

                    <td className="px-5 py-4 text-sm">
                      {product.marketplace ?? "-"}
                    </td>

                    <td className="px-5 py-4 text-sm">
                      {Number(product.stock ?? 0)}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => onEdit(product)}
                          disabled={isDeleting}
                          className="inline-flex items-center gap-2 rounded-xl bg-accent px-3 py-2 text-sm font-medium text-accent-foreground transition hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          <Edit3 className="h-4 w-4" />
                          Editar
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            onDelete(product.id)
                          }
                          disabled={isDeleting}
                          className="inline-flex items-center gap-2 rounded-xl bg-destructive px-3 py-2 text-sm font-medium text-destructive-foreground transition hover:bg-destructive/90 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          <Trash2 className="h-4 w-4" />
                          {isDeleting
                            ? "Excluindo..."
                            : "Excluir"}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}