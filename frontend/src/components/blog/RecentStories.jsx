import PostCard from "./PostCard";
import PostCardSkeleton from "../Loader/PostCardSkeleton";
import TagsSidebar from "./TagsSidebar";
import TagsSidebarSkeleton from "../Loader/TagsSidebarSkeleton";

const RecentStories = ({
  posts,
  tags,
  loading,
}) => {
  return (
    <section className="mb-20 pl-6 pr-6">

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* LEFT */}
        <div className="lg:col-span-8">

          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Recent Stories
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <PostCardSkeleton key={i} />
                ))
              : posts?.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))
            }

          </div>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-4">

          {loading ? (
            <TagsSidebarSkeleton />
          ) : (
            <TagsSidebar
              tags={tags}
            />
          )}

        </div>

      </div>
    </section>
  );
};

export default RecentStories;