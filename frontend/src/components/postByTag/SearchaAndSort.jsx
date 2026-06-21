import React from "react";
import { FiSearch } from "react-icons/fi";

const SearchAndSort = ({
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-10 shadow-sm">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />

          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-sky-100 focus:border-sky-500"
          />
        </div>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-sky-100 focus:border-sky-500"
        >
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
          <option value="popular">Most Viewed</option>
          <option value="title">Title A-Z</option>
        </select>
      </div>
    </div>
  );
};

export default SearchAndSort;