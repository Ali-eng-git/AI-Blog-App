import React from "react";
import { FiFilter } from "react-icons/fi";

const SearchAndSort = ({ sortBy, setSortBy }) => {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 mb-10">
      <div className="flex items-center justify-between flex-wrap gap-4">

        {/* Left */}
        <div>
          <h3 className="text-xl font-bold text-gray-900">
            Browse Articles
          </h3>

          <p className="text-gray-500 text-sm mt-1">
            Sort posts to discover content faster
          </p>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-gray-500">
            <FiFilter className="text-lg" />
            <span className="text-sm font-medium">
              Sort by
            </span>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="
              min-w-[180px]
              px-5 py-3
              rounded-2xl
              border border-gray-200
              bg-gray-50
              text-gray-700
              font-medium
              outline-none
              transition-all
              focus:ring-4
              focus:ring-sky-100
              focus:border-sky-500
              hover:border-sky-300
            "
          >
            <option value="latest">🕒 Latest First</option>
            <option value="oldest">📅 Oldest First</option>
            <option value="popular">🔥 Most Viewed</option>
            <option value="title">🔤 Title A-Z</option>
          </select>
        </div>

      </div>
    </div>
  );
};

export default SearchAndSort;