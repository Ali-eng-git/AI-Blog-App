import React from "react";
import { Link } from "react-router-dom";
import {
  LuArrowRight,
  LuEye,
  LuHeart,
  LuClock3,
  LuStar,
} from "react-icons/lu";

const FeaturedArticle = ({ featuredPost }) => {
  if (!featuredPost) return null;

  const cleanContent =
    featuredPost.content
      ?.replace(/[#*`>\-\n]/g, " ")
      .replace(/\s+/g, " ")
      .trim() || "";

  const excerpt = cleanContent.slice(0, 180) + "...";

  const wordCount = cleanContent.split(" ").length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <section className="mb-20 pl-6 pr-6">
      <div className="relative overflow-hidden rounded-3xl min-h-[550px] group">
        {/* Background Image */}
        <img
          src={featuredPost.coverImageUrl}
          alt={featuredPost.title}
          className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-110 transition duration-700"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-black/20" />

        {/* Decorative Blur */}
        <div className="absolute top-10 right-10 w-72 h-72 bg-cyan-500/20 blur-3xl rounded-full" />

        {/* Content */}
        <div className="relative z-10 flex items-center min-h-[550px] px-8 md:px-16 py-12">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/20 backdrop-blur-md border border-sky-400/30 text-sky-300 text-sm font-semibold mb-6">
              <LuStar size={16} />
              Featured Article
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-5">
              {featuredPost.tags?.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <Link to={`/${featuredPost.slug}`}>
              <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6 hover:text-cyan-300 transition">
                {featuredPost.title}
              </h2>
            </Link>

            {/* Excerpt */}
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mb-8">
              {excerpt}
            </p>

            {/* Author + Meta */}
            <div className="flex flex-wrap items-center gap-6 mb-8">
              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-cyan-400">
                  {featuredPost.author?.profileImageUrl ? (
                    <img
                      src={featuredPost.author.profileImageUrl}
                      alt={featuredPost.author.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-sky-500 flex items-center justify-center text-white font-bold">
                      {featuredPost.author?.name?.charAt(0)}
                    </div>
                  )}
                </div>

                <div>
                  <p className="text-white font-semibold">
                    {featuredPost.author?.name}
                  </p>
                  <p className="text-gray-400 text-sm">
                    Published Article
                  </p>
                </div>
              </div>

              {/* Read Time */}
              <div className="flex items-center gap-2 text-gray-300">
                <LuClock3 />
                <span>{readTime} min read</span>
              </div>

              {/* Views */}
              <div className="flex items-center gap-2 text-gray-300">
                <LuEye />
                <span>{featuredPost.views || 0}</span>
              </div>

              {/* Likes */}
              <div className="flex items-center gap-2 text-gray-300">
                <LuHeart />
                <span>{featuredPost.likes || 0}</span>
              </div>
            </div>

            {/* CTA */}
            <Link
              to={`/${featuredPost.slug}`}
              className="
                inline-flex
                items-center
                gap-3
                px-8
                py-4
                rounded-xl
                bg-gradient-to-r
                from-sky-500
                to-cyan-400
                text-white
                font-semibold
                shadow-lg
                hover:scale-105
                transition
              "
            >
              Read Article
              <LuArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArticle;