interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-12 pt-12 border-t border-border">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="px-3 py-2 border border-border rounded-lg hover:bg-muted disabled:opacity-50 transition-colors"
      >
        Anterior
      </button>

      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          className={`w-10 h-10 rounded-lg font-semibold transition-colors ${
            currentPage === index + 1
              ? "bg-accent text-white"
              : "border border-border hover:bg-muted"
          }`}
        >
          {index + 1}
        </button>
      ))}

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="px-3 py-2 border border-border rounded-lg hover:bg-muted disabled:opacity-50 transition-colors"
      >
        Próxima
      </button>
    </div>
  );
}
