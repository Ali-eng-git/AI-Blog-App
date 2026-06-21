import React from "react";
import { Link } from "react-router-dom";

const TrendingSection = ({ posts = [] }) => {
  return (
    <section className="mb-20 p-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Trending This Week
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {posts?.slice(0, 3).map((post, index) => (
          <Link
            key={post._id}
            to={`/${post.slug}`}
            className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition"
          >

            {/* Image */}
            <div className="h-64 overflow-hidden">
              <img
                src={post.coverImageUrl}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Rank Badge */}
            <div className="absolute top-4 left-4 bg-white text-gray-900 text-sm font-bold px-3 py-1 rounded-full">
              #{index + 1}
            </div>

            {/* Content */}
            <div className="absolute bottom-0 p-5 text-white">

              {/* Tags */}
              <div className="flex gap-2 flex-wrap mb-2">
                {post.tags?.slice(0, 2).map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs bg-white/20 px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold line-clamp-2">
                {post.title}
              </h3>

              {/* Meta */}
              <p className="text-xs text-white/80 mt-2">
                {post.views || 0} views
              </p>

            </div>
          </Link>
        ))}

      </div>
    </section>
  );
};

const TrendingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
      {[1,2,3].map((i) => (
        <div key={i} className="h-64 bg-gray-200 rounded-2xl" />
      ))}
    </div>
  );
};
export {TrendingSkeleton}
export default TrendingSection;