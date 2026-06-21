import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  return (
    <article className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
      
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={post.coverImageUrl}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Dark overlay for safety (white image fix included) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

        {/* Tags on image */}
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
          {post.tags?.slice(0, 2).map((tag, i) => (
            <span
              key={i}
              className="text-xs px-2 py-1 rounded-full bg-white/90 text-gray-700 font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        
        {/* Meta */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
          <span>{post.readTime || "5 min read"}</span>
          <span>•</span>
          <span>{new Date(post.createdAt).toDateString()}</span>
        </div>

        {/* Title */}
        <Link to={`/${post.slug}`}>
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-sky-600 transition line-clamp-2">
            {post.title}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-sm text-gray-600 mt-2 line-clamp-3">
          {post.content?.replace(/[#*`]/g, "").slice(0, 120)}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4">
          <span className="text-xs text-gray-500">
            {post.views || 0} views
          </span>

          <Link
            to={`/${post.slug}`}
            className="text-sky-600 text-sm font-medium hover:underline"
          >
            Read →
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PostCard;