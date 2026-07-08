import { Link } from "react-router-dom";
import { LuEye, LuClock } from "react-icons/lu";
import BlogLayout from "../../../components/layouts/BlogLayout/BlogLayout";
import BlogFooter from "../../../components/blog/Footer";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { API_PATHS } from "../../../utils/apiPaths";
import PostDetails from "../../../components/post/PostDetails";
import CommentSection from "../../../components/post/CommentSection";

const BlogPostView = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [loadingComment, setLoadingComment] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchPost = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.POSTS.GET_BY_SLUG(slug));
      const postID = res?.data._id;
      const commentRes = await axiosInstance.get(
        `${API_PATHS.COMMENTS.GET_ALL_BY_POST(postID)}`,
      );
      setComments(commentRes.data);

      setPost(res.data);
    } catch (err) {
      console.error("Error fetching post:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async () => {
    if (!commentText.trim()) return;

    try {
      setLoadingComment(true);

      const res = await axiosInstance.post(
        `${API_PATHS.COMMENTS.ADD(post._id)}`,
        {
          content: commentText,
          parentComment: null,
        },
      );

      // NEW COMMENT from backend
      const newComment = res.data;

      // optimistic update
      setComments((prev) => {
        const updated = [...prev];
        return [newComment, ...updated];
      });

      setCommentText("");
    } catch (err) {
      console.error("Comment error:", err);
    } finally {
      setLoadingComment(false);
    }
  };

  useEffect(() => {
    if (slug) fetchPost();
  }, [slug]);

  useEffect(() => {
  if (!post?._id) return;

  const key = `viewed_${post._id}`;

  if (!sessionStorage.getItem(key)) {
    axiosInstance.post(API_PATHS.POSTS.INCREMENT_VIEW(post._id));
    sessionStorage.setItem(key, "true");
  }
}, [post?._id]);

  if (loading) return (
      <BlogLayout>
        <div className="min-h-[50vh] flex items-center justify-center">
          <div className="text-xl font-semibold animate-pulse">
            Loading articles...
          </div>
        </div>

        <BlogFooter />
      </BlogLayout>
    );

  return (
    <>
      <BlogLayout>
        <PostDetails post={post} comments={comments} />

        <CommentSection
        postId ={post._id}
          comments={comments}
          commentText={commentText}
           setComments={ setComments}
          setCommentText={setCommentText}
          onAddComment={handleAddComment}
          loading={loadingComment}
        />

        <BlogFooter />
      </BlogLayout>
    </>
  );
};

export default BlogPostView;
