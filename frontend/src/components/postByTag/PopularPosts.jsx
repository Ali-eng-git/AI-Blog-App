import { Link } from "react-router-dom";
import { Star } from 'lucide-react';

const PopularPosts = ({ posts = [] }) => {
  const popular = [...posts]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 3);



  return (
    <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">
      <h3 className="text-2xl font-bold mb-8 flex flex-row items-center gap-1">
        <Star className="text-amber-300"/> Popular Posts
      </h3>

      <div className="space-y-6">
        {popular.map((post, index) => (
          <Link
            key={post._id}
            to={`/${post.slug}`}
            className="flex gap-4 group"
          >
            <span className="text-5xl font-bold text-gray-300">
              {String(index + 1).padStart(2, "0")}
            </span>

            <div>
              <h4 className="font-semibold text-sm text-gray-800 group-hover:text-sky-600 transition line-clamp-2">
                {post.title}
              </h4>

              <p className="text-sm text-gray-500 mt-2">
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })} ·{" "}
                {post.views || 0} views
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularPosts;