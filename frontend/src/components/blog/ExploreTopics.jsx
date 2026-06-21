import React from "react";
import { Link } from "react-router-dom";
import { LuHash, LuSearch } from "react-icons/lu";

const Explore = ({ tags = [] }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

      {/* LEFT - POSTS AREA (placeholder for now) */}
      <div className="lg:col-span-8 space-y-10">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Recent Stories
          </h2>

          <div className="flex gap-2">
            <button className="p-2 border rounded-lg hover:bg-gray-50">
              <LuSearch />
            </button>
          </div>
        </div>

        {/* Placeholder Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="rounded-2xl border bg-white shadow-sm overflow-hidden hover:shadow-md transition"
            >
              <div className="h-40 bg-gradient-to-r from-sky-100 to-cyan-100" />

              <div className="p-5">
                <p className="text-xs text-sky-600 font-semibold">
                  React • 5 min read
                </p>

                <h3 className="text-lg font-bold mt-2">
                  Understanding Modern Web Architecture
                </h3>

                <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                  Sample description for blog preview layout structure...
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT - SIDEBAR */}
      <aside className="lg:col-span-4 space-y-6">

        {/* SEARCH */}
        <div className="bg-white border rounded-2xl p-5 shadow-sm">
          <h3 className="font-semibold mb-3">Search</h3>

          <div className="relative">
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full border rounded-xl px-4 py-2 pr-10 focus:ring-2 focus:ring-sky-200"
            />
            <LuSearch className="absolute right-3 top-3 text-gray-400" />
          </div>
        </div>

        {/* TAGS */}
        <div className="bg-white border rounded-2xl p-5 shadow-sm">
          <h3 className="font-semibold mb-4">Popular Tags</h3>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag, i) => (
              <Link
                key={i}
                to={`/search?tag=${tag}`}
                className="
                  flex items-center gap-1
                  px-3 py-1
                  text-sm
                  rounded-full
                  border
                  bg-gray-50
                  hover:bg-sky-50
                  hover:border-sky-300
                  transition
                "
              >
                <LuHash className="text-sky-600" />
                {tag}
              </Link>
            ))}
          </div>
        </div>

        {/* NEWSLETTER */}
        <div className="bg-gradient-to-r from-sky-800 to-cyan-700 text-white rounded-2xl p-6">
          <h3 className="font-bold text-lg">Join Newsletter</h3>
          <p className="text-sm text-white/80 mt-2">
            Get latest dev insights weekly.
          </p>

          <input
            type="email"
            placeholder="email@example.com"
            className="w-full mt-4 px-4 py-2 rounded-xl text-black"
          />

          <button className="w-full mt-3 bg-white text-sky-600 font-semibold py-2 rounded-xl">
            Subscribe
          </button>
        </div>
      </aside>
    </div>
  );
};

export default Explore;