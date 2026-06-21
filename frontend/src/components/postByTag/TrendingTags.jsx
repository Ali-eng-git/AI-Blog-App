import { Link } from "react-router-dom";
import { FiTrendingUp } from "react-icons/fi";

const TrendingTags = () => {
  const tags = [
    { name: "React", count: 12 },
    { name: "NextJS", count: 7 },
    { name: "TailwindCSS", count: 15 },
    { name: "TypeScript", count: 21 },
    { name: "Blockchain", count: 8 },
  ];

  return (
    <div className="bg-sky-50 rounded-3xl border border-gray-200 p-8 shadow-sm">
      <h3 className="flex items-center gap-3 text-2xl font-bold mb-8">
        <FiTrendingUp className="text-sky-600" />
        Trending Tags
      </h3>

      <div className="space-y-3">
        {tags.map((tag) => (
          <Link
            key={tag.name}
            to={`/tag/${tag.name.toLowerCase()}`}
            className="flex justify-between items-center group"
          >
            <span className="text-1xl text-gray-700 group-hover:text-sky-600 transition">
              #{tag.name}
            </span>

            <span className="bg-sky-50 text-sky-700 px-3 py-1 rounded-full text-sm">
              {tag.count}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TrendingTags;