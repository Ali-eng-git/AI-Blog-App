import React from "react";

const About = () => {
  return (
    <section className="mb-20 p-9">

      <div className="relative overflow-hidden rounded-3xl bg-[#006494] text-white p-10 md:p-16">

        {/* Glow effects */}
        <div className="absolute -top-10 -right-10 w-72 h-72 bg-white/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-3xl">

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            About This Blog
          </h2>

          <p className="text-white/90 text-lg leading-relaxed">
            A modern engineering archive focused on frontend systems, backend architecture,
            blockchain development, performance optimization, and real-world software engineering patterns.
          </p>

          <p className="text-white/80 mt-4">
            Built to help developers go beyond tutorials — and understand how real-world systems are designed, scaled, and deployed.
          </p>

          <div className="mt-6 flex gap-3 flex-wrap">
            <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
              React
            </span>
            <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
              Node.js
            </span>
            <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
              System Design
            </span>
            <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
              Blockchain
            </span>
          </div>

        </div>
      </div>

    </section>
  );
};

export default About;