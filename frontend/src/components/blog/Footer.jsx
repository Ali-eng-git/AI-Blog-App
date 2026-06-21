import React from "react";
import { Link } from "react-router-dom";

const BlogFooter = () => {
  return (
    <footer className="relative overflow-hidden bg-[#061826] text-white">

      {/* glow background */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#006494]/30 blur-3xl rounded-full" />
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-cyan-400/20 blur-3xl rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold">
              DevArchive
            </h2>

            <p className="text-white/70 mt-4 leading-relaxed">
              A modern engineering blog exploring frontend architecture, backend systems,
              blockchain development, performance optimization, and scalable software design.
            </p>

            {/* Newsletter */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 outline-none focus:border-[#006494]"
              />
              <button className="px-5 py-3 rounded-xl bg-[#006494] hover:bg-[#0077aa] transition">
                Subscribe
              </button>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Navigation</h3>
            <div className="space-y-2 text-white/70">
              <Link className="block hover:text-white">Home</Link>
              <Link className="block hover:text-white">Explore</Link>
              <Link className="block hover:text-white">About</Link>
            </div>
          </div>

          {/* Topics */}
          <div>
            <h3 className="text-white font-semibold mb-4">Topics</h3>

            <div className="flex flex-wrap gap-2">
              {[
                "React",
                "Next.js",
                "Node.js",
                "System Design",
                "Blockchain",
              ].map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 text-xs rounded-full bg-white/10 border border-white/20 hover:bg-[#006494] transition cursor-pointer"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-10" />

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} DevArchive. Built with ❤️ for developers.
          </p>

          {/* Social */}
          <div className="flex gap-4 text-white/70">
            <a className="hover:text-white transition">GitHub</a>
            <a className="hover:text-white transition">LinkedIn</a>
            <a className="hover:text-white transition">Twitter</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default BlogFooter;