import { Link } from "react-router-dom";
import { LuClock, LuEye } from "react-icons/lu";

const TagPostCard = ({ post }) => {
    const cleanContent =
    post.content
      ?.replace(/[#*`>\-\n]/g, " ")
      .replace(/\s+/g, " ")
      .trim() || "";

  const excerpt = cleanContent.slice(20, 180) + "...";

  const wordCount = cleanContent.split(" ").length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));
  return (
    <Link
      to={`/${post.slug}`}
      className="group bg-white rounded-3xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
    >
      {/* IMAGE */}
      <div className="relative h-40 overflow-hidden bg-white">
        <img
          src={post.coverImageUrl}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
        />

        {/* Tag Badge */}
        {post.tags?.length > 0 && (
          <span className="absolute top-4 left-4 bg-sky-600 text-white text-sm font-medium px-4 py-1 rounded-full">
            {post.tags[0]}
          </span>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-5">
        {/* TITLE */}
        <h3 className="text-xl font-semibold text-gray-900 mb-5 line-clamp-3 group-hover:text-sky-600 transition">
          {post.title}
        </h3>

        {/* EXCERPT */}
        <p className="text-gray-600 text-md leading-8 line-clamp-3">
          {excerpt}
        </p>

        {/* Divider */}
        <div className="border-t border-gray-300 my-8"></div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          {/* Author */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-300">
              <img
                src={post.author?.profileImageUrl}
                alt={post.author?.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <p className="font-medium text-sm text-gray-800">
                {post.author?.name}
              </p>

              <p className="text-xs text-gray-500">
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Meta */}
          <div className="flex items-center gap-4 text-gray-500">
            <div className="flex items-center gap-1">
              <span className="text-xs">{readTime || 5} min read</span>
            </div>

            {/* <div className="flex items-center gap-1">
              <LuEye />
              <span>{post.views || 0}</span>
            </div> */}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TagPostCard;
