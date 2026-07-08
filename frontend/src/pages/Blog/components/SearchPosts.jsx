import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import BlogLayout from "../../../components/layouts/BlogLayout/BlogLayout";
import axiosInstance from "../../../utils/axiosInstance";
import { API_PATHS } from "../../../utils/apiPaths";
import TagPostCard from "../../../components/postByTag/TagPostCard";
import BlogFooter from "../../../components/blog/Footer";

const SearchPosts = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchPosts = async () => {
    try {
      setLoading(true);

      const response = await axiosInstance.get(
        `${API_PATHS.POSTS.SEARCH}?q=${query}`
      );

      setPosts(response.data);
    } catch (error) {
      console.error("Error searching posts:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      searchPosts();
    }
  }, [query]);

  return (
    <>
    <BlogLayout>
      <div className="max-w-7xl mx-auto py-10">

        <h1 className="text-4xl font-bold mb-8">
          Search Results for "{query}"
        </h1>

        {loading ? (
          <p>Searching...</p>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-3xl font-bold">
              No posts found
            </h2>

            <p className="text-gray-500 mt-3">
              Try searching with different keywords.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 pl-7 pr-7">
            {posts.map((post) => (
              <TagPostCard
              key={post._id}
                post={post}
                />
            ))}
          </div>
        )}
      </div>
    </BlogLayout>
    <BlogFooter/>
        </>
  );
};

export default SearchPosts;