import React from "react";
import { useParams } from "react-router-dom";
import BlogLayout from "../../../components/layouts/BlogLayout/BlogLayout";
import BlogFooter from "../../../components/blog/Footer";
import Hero from "../../../components/postByTag/Hero";
import { useState } from "react";
import { useEffect } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { API_PATHS } from "../../../utils/apiPaths";
import SearchAndSort from "../../../components/postByTag/SearchaAndSort";
import Pagination from "../../../components/Pagination";
import TagPostCard from "../../../components/postByTag/TagPostCard";
import TrendingTags from "../../../components/postByTag/TrendingTags";
import PopularPosts from "../../../components/postByTag/PopularPosts";
import NewsletterCard from "../../../components/postByTag/NewsletterCard";

const PostByTags = () => {
  const { tag, tagName } = useParams();
  const [sortBy, setSortBy] = useState("latest");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [popularPosts, setPopularPosts] = useState([]);

  const POSTS_PER_PAGE = 6;

  const [page, setPage] = useState(1);


  const getPopularPost = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.POSTS.GET_TRENDING_POSTS);
      setPopularPosts(res.data);
    } catch (error) {
      console.error("Error fetching popular post", error.message);
    }
  };

  const getPostByTag = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get(
        `${API_PATHS.POSTS.GET_BY_TAG(tagName)}`,
      );
      setPosts(res.data);
    } catch (error) {
      console.error("Error fetching post by tag", error.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = [...posts].sort((a, b) => {
    switch (sortBy) {
      case "oldest":
        return new Date(a.updatedAt) - new Date(b.updatedAt);

      case "popular":
        return b.views - a.views;

      case "title":
        return a.title.localeCompare(b.title);

      case "latest":
      default:
        return new Date(b.updatedAt) - new Date(a.updatedAt);
    }
  });
    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  const paginatedPosts = filteredPosts.slice(
    (page - 1) * POSTS_PER_PAGE,
    page * POSTS_PER_PAGE,
  );

  useEffect(() => {
    getPostByTag();
  }, [tagName]);

  useEffect(() => {
    getPopularPost();
  }, []);

  if (loading) {
    return (
      <BlogLayout>
        <div className="min-h-[50vh] flex items-center justify-center">
          <div className="text-xl font-semibold animate-pulse">
            Loading articles...
          </div>
        </div>

        <BlogFooter />
      </BlogLayout>
    );
  }
  if (!loading && posts.length === 0) {
    return (
      <BlogLayout>
        <Hero tag={tag} tagName={tagName} posts={posts} />

        <div className="text-center py-20">
          <h2 className="text-3xl font-bold">No articles found</h2>

          <p className="text-gray-500 mt-3">
            There are currently no posts tagged with #{tagName}.
          </p>
        </div>

        <BlogFooter />
      </BlogLayout>
    );
  }
  return (
    <BlogLayout>
      <Hero  tagName={tagName} posts={posts} />
      <SearchAndSort sortBy={sortBy} setSortBy={setSortBy} />

      <div className="max-w-7xl mx-auto px-5 py-16 ">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* POSTS */}
          <div className="lg:col-span-8">
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
              {paginatedPosts?.map((post) => (
                <TagPostCard key={post._id} post={post} />
              ))}
            </div>

            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>

          {/* SIDEBAR */}
          <aside className="lg:col-span-4 space-y-8">
            <TrendingTags />
            <PopularPosts posts={popularPosts} />
            <NewsletterCard />
          </aside>
        </div>
      </div>

      <BlogFooter />
    </BlogLayout>
  );
};

export default PostByTags;
