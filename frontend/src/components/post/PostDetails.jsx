import { Link } from "react-router-dom";
import { LuEye, LuClock } from "react-icons/lu";
import MarkdownRenderer from "../markdownRendere";

const PostDetails = ({ post }) => {
  if (!post) return null;

  

  return (
    <div className="bg-white min-h-screen">
      {/* HERO SECTION */}
      <div className="relative w-full h-[420px] md:h-[500px] overflow-hidden">
        {/* IMAGE */}
        <img
          src={post.coverImageUrl}
          alt={post.title}
          className="w-full h-full object-cover"
        />

        {/* DARK GRADIENT OVERLAY (fixes white image issue) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

        {/* CONTENT */}
        <div className="absolute bottom-0 w-full px-6 md:px-16 pb-10 text-white max-w-6xl mx-auto">
          {/* TAG */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags?.map((tag, i) => (
              <span
                key={i}
                className="text-xs bg-white/20 backdrop-blur px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* TITLE */}
          <h1 className="text-2xl md:text-4xl font-bold leading-tight">
            {post.title}
          </h1>

          {/* META */}
          <div className="flex items-center gap-6 mt-4 text-sm text-white/80">
            <span>{post.author?.name}</span>
            <span className="flex items-center gap-1">
              <LuEye /> {post.views} views
            </span>
            <span className="flex items-center gap-1">
              <LuClock /> {post.readTime || 5} min read
            </span>
            <span>{new Date(post.createdAt).toDateString()}</span>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* ARTICLE CONTENT */}
        <article className="lg:col-span-8">
          <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
            <MarkdownRenderer content={post.content} />
          </div>

          {/* OPTIONAL DIVIDER */}
          <div className="my-10 border-t border-gray-200" />

          {/* COMMENTS SECTION */}
     
        </article>

        {/* SIDEBAR */}
        <aside className="lg:col-span-4 space-y-6">
          {/* AUTHOR CARD */}
          <div className="border border-gray-200 rounded-2xl p-5">
            <div className="flex items-center gap-3">
              <img
                src={post.author?.profileImageUrl}
                alt="author"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">{post.author?.name}</p>
                <p className="text-sm text-gray-500">Author</p>
              </div>
            </div>
          </div>

          {/* TAGS */}
          <div className="border border-gray-200 rounded-2xl p-5">
            <h3 className="font-semibold mb-3">Tags</h3>

            <div className="flex flex-wrap gap-2">
              {post.tags?.map((tag, i) => (
                <span
                  key={i}
                  className="text-xs bg-gray-100 px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* RELATED (placeholder) */}
          <div className="border border-gray-200 rounded-2xl p-5">
            <h3 className="font-semibold mb-3">Related Posts</h3>
            <p className="text-sm text-gray-500">Coming soon...</p>
          </div>
        </aside>
      </div>

      {/* FOOTER */}
    </div>
  );
};

export default PostDetails;
