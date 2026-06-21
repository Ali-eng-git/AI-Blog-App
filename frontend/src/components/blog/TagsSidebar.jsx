import React from "react";
import { Link } from "react-router-dom";

const TagsSidebar = ({ tags }) => {
  return (
    <aside className="space-y-6">
      {/* Title */}
      <div className="bg-white border rounded-2xl p-5 shadow-sm">
        <h4 className="font-semibold text-gray-900 mb-4">Popular Tags</h4>

        <div className="flex flex-wrap gap-2">
          {tags?.map((tag, index) => (
            <Link to={`/tag/${tag}`}
              key={index}
          
              className="
                px-3 py-1 text-xs rounded-full
                bg-gray-100 text-gray-700
                hover:bg-sky-500 hover:text-white
                transition
              "
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>

      {/* Future extension block */}
      {/* NEWSLETTER */}
      <div className="bg-[#006494] text-white rounded-2xl p-6">
        <h3 className="font-bold text-lg">Join Newsletter</h3>
        <p className="text-sm text-white/80 mt-2 mb-2">
          Get latest dev insights weekly.
        </p>

        <input
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl mb-4 placeholder:text-white/50 focus:outline-none focus:bg-white/20"
          placeholder="email@example.com"
          type="email"
        ></input>

        <button className="w-full mt-3 bg-white text-[#006494] font-semibold py-2 rounded-xl">
          Subscribe
        </button>
      </div>
    </aside>
  );
};

export default TagsSidebar;
