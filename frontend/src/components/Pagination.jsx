import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ page, totalPages, onPageChange }) => {
  // Only show max 5 page numbers
  const getPages = () => {
    const pages = [];

    let start = Math.max(1, page - 2);
    let end = Math.min(totalPages, page + 2);

    if (page <= 3) {
      end = Math.min(5, totalPages);
    }

    if (page >= totalPages - 2) {
      start = Math.max(1, totalPages - 4);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-4 mt-16 flex-wrap">
      {/* Previous */}
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="w-10 h-10 rounded-xl border border-gray-300 bg-white flex items-center justify-center hover:bg-gray-50 transition disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <ChevronLeft size={24} />
      </button>

      {/* First page */}
      {page > 3 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="w-10 h-10 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 transition"
          >
            1
          </button>

          {page > 4 && (
            <span className="text-gray-500 px-2">...</span>
          )}
        </>
      )}

      {/* Dynamic pages */}
      {getPages().map((num) => (
        <button
          key={num}
          onClick={() => onPageChange(num)}
          className={`w-10 h-10 rounded-xl border transition font-medium
            ${
              page === num
                ? "bg-sky-600 text-white border-sky-600"
                : "bg-white border-gray-300 hover:bg-gray-50"
            }`}
        >
          {num}
        </button>
      ))}

      {/* Last page */}
      {page < totalPages - 2 && (
        <>
          {page < totalPages - 3 && (
            <span className="text-gray-500 px-2">...</span>
          )}

          <button
            onClick={() => onPageChange(totalPages)}
            className="w-10 h-10 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 transition"
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next */}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="w-10 h-10 rounded-xl border border-gray-300 bg-white flex items-center justify-center hover:bg-gray-50 transition disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default Pagination;