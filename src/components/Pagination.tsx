interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const goToPage = (page: number) => {
    onPageChange(Math.max(1, Math.min(page, totalPages)));
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-1.5">
      <button
        onClick={() => goToPage(1)}
        disabled={currentPage === 1}
        className="px-2.5 sm:px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all duration-200 aria-disabled:opacity-50 aria-disabled:cursor-not-allowed aria-disabled:bg-gray-500 bg-white/10 hover:bg-white/15"
        aria-label="First page"
      >
        &laquo;&laquo;
      </button>
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-2.5 sm:px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all duration-200 aria-disabled:opacity-50 aria-disabled:cursor-not-allowed aria-disabled:bg-gray-500 bg-white/10 hover:bg-white/15"
        aria-label="Previous page"
      >
        &laquo;
      </button>

      <div className="flex items-center gap-0.5">
        {getPageNumbers().map((page, index) =>
          page === "..." ? (
            <span
              key={`ellipsis-${index}`}
              className="px-2 py-1.5 text-xs text-fluent-secondary"
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => goToPage(page as number)}
              className={`px-2.5 sm:px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                currentPage === page
                  ? "btn-xbox hover:scale-105 border border-xbox-green"
                  : "bg-white/10 hover:bg-white/15 text-fluent-primary hover:scale-105 border border-[var(--border-color)]"
              }`}
            >
              {page}
            </button>
          ),
        )}
      </div>

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-2.5 sm:px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all duration-200 aria-disabled:opacity-50 aria-disabled:cursor-not-allowed aria-disabled:bg-gray-500 bg-white/10 hover:bg-white/15"
        aria-label="Next page"
      >
        &raquo;
      </button>
      <button
        onClick={() => goToPage(totalPages)}
        disabled={currentPage === totalPages}
        className="px-2.5 sm:px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all duration-200 aria-disabled:opacity-50 aria-disabled:cursor-not-allowed aria-disabled:bg-gray-500 bg-white/10 hover:bg-white/15"
        aria-label="Last page"
      >
        &raquo;&raquo;
      </button>
    </div>
  );
}
