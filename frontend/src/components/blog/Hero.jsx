import React from "react";
import { Link } from "react-router-dom";
import { LuArrowRight, LuBookOpen } from "react-icons/lu";
import heroImage from "../../assets/screen.png";
// import { getExcerpt } from "../../utils/helper";

const HeroSection = ({  totalPosts }) => {
  return (
    <section className="mb-16 relative overflow-hidden rounded-3xl bg-sky-100">
      <div className="relative h-[550px] w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Hero"
            className="absolute inset-0 w-full h-full object-cover object-[center_65%] opacity-40"
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-sky-50 via-sky-50/60 to-transparent" />

        {/* Floating Blur */}
        <div className="absolute top-10 left-10 w-48 h-48 bg-cyan-300/20 rounded-full blur-3xl" />

        <div className="relative z-10 px-6 md:px-12 py-10 md:py-20 text-center max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-100 text-sky-700 font-semibold text-sm mb-6">
            <LuBookOpen />
            <span>{totalPosts || 0}+ Technical Articles</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
            A Living Archive of
            <span className="block bg-gradient-to-r from-sky-600 to-cyan-500 bg-clip-text text-transparent">
              Modern Web Engineering
            </span>
          </h1>

          {/* Description */}
          <p className="max-w-3xl mx-auto mt-6 text-gray-600 text-lg">
            Exploring frontend architecture, backend systems, blockchain,
            performance engineering, testing, and modern software development.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link
              to="/search"
              className="bg-gradient-to-r from-sky-500 to-cyan-400 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:scale-[0.98] transition"
            >
              Explore Articles
            </Link>

            <Link
              to="/search"
              className="border border-gray-300 px-8 py-3 rounded-xl font-semibold hover:bg-white transition"
            >
              Read Archive
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
