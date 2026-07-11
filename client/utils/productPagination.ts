export type PaginatedItems<T> = {
  items: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  perPage: number;
};

export function paginateProducts<T>(
  items: T[],
  perPage: number,
  page: number,
): PaginatedItems<T> {
  const safePerPage = Math.max(
    1,
    Math.floor(perPage),
  );

  const totalItems = items.length;

  const totalPages = Math.max(
    1,
    Math.ceil(totalItems / safePerPage),
  );

  const safePage = Math.min(
    Math.max(Math.floor(page), 1),
    totalPages,
  );

  const startIndex =
    (safePage - 1) * safePerPage;

  return {
    items: items.slice(
      startIndex,
      startIndex + safePerPage,
    ),
    currentPage: safePage,
    totalPages,
    totalItems,
    perPage: safePerPage,
  };
}