import React from 'react'

const Hero = ({tag,tagName,posts}) => {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-blue-500 to-sky-500 p-8 md:p-12 text-white mb-12">

  {/* Decorative circles */}
  <div className="absolute -top-16 -right-16 w-48 h-48 bg-white/10 rounded-full"></div>

  <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-white/10 rounded-full"></div>

  <div className="relative z-10">

    {/* Tag Badge */}
    <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium mb-5">
      #{tagName}
    </span>

    {/* Heading */}
    <h1 className="text-4xl md:text-5xl font-bold capitalize mb-4">
      {tagName} Articles
    </h1>

    {/* Description */}
    <p className="max-w-2xl text-blue-100 text-lg leading-relaxed">
      Discover tutorials, guides, best practices, and expert insights about{" "}
      <span className="font-semibold capitalize">
        {tagName}
      </span>.
    </p>

    {/* Stats */}
    <div className="flex gap-10 mt-8">

      <div>
        <h2 className="text-3xl font-bold">
          {posts?.length || 0}
        </h2>

        <p className="text-blue-200">
          Articles
        </p>
      </div>

      <div>
        <h2 className="text-3xl font-bold capitalize">
          {tag}
        </h2>

        <p className="text-blue-200">
          Category Type
        </p>
      </div>

    </div>
  </div>
</section>
  )
}

export default Hero
