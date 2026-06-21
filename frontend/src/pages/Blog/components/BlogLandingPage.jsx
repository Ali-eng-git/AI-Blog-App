import React, { useEffect, useState } from "react";
import BlogLayout from "../../../components/layouts/BlogLayout/BlogLayout";
import axiosInstance from "../../../utils/axiosInstance";
import { API_PATHS } from "../../../utils/apiPaths";
import HeroSection from "../../../components/blog/Hero";
import StatsStrip from "../../../components/blog/StatsStrip";
import FeaturedArticle from "../../../components/blog/FeaturedArticle";
import RecentStories from "../../../components/blog/RecentStories";
import Pagination from "../../../components/Pagination";
import TrendingSection from "../../../components/blog/TrendingThisWeek";
import About from "../../../components/blog/About";
import BlogFooter from "../../../components/blog/Footer";

const BlogLandingPage = () => {
  const [featuredPost, setFeaturedPost] = useState(null);
const [trendingPosts, setTrendingPosts] = useState([]);
const [recentPosts, setRecentPosts] = useState([]);
const [popularTags, setPopularTags] = useState([]);
const [stats, setStats] = useState({});
const [page, setPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);
const [loading, setLoading] = useState(true);

const getLandingPageData = async (page = 1) => {
  setLoading(true);

  try {
    const res = await axiosInstance.get(
      `${API_PATHS.POSTS.GET_ALL}?page=${page}`
    );

    console.log("All of the api data",res.data)

    const posts = res.data.posts || [];

    setFeaturedPost(res.data.featuredPost);
    setTrendingPosts(res.data.trendingPosts || []);
    setRecentPosts(posts);

    setPopularTags([...new Set(posts.flatMap(p => p.tags || []))]);
    setStats(res.data.counts)

    setPage(res.data.page);
    setTotalPages(res.data.totalPages);

  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};


 const handlePageChange = (newPage) => {
  if (newPage < 1 || newPage > totalPages) return;
  getLandingPageData(newPage);
};

  useEffect(() => {
    getLandingPageData();
  }, []);
  return (
    <BlogLayout>
      <HeroSection
        totalPosts={stats?.all || 0}
      ></HeroSection>
      <StatsStrip totalPosts={stats?.all || 0} />
      <FeaturedArticle featuredPost={featuredPost} />

      <RecentStories
        posts={recentPosts}
        tags={popularTags}
        loading={loading}
      />

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <TrendingSection posts={trendingPosts} />
      <About />
      <BlogFooter />
    </BlogLayout>
  );
};

export default BlogLandingPage;
