import { useEffect, useState } from "react";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import axiosInstance from "../../../utils/axiosInstance";
import { API_PATHS } from "../../../utils/apiPaths";
import Modal from "../../../components/Modal";
import { toast } from "react-hot-toast";
import moment from "moment";
import { LuTrash2, LuSparkles, LuMessageSquare } from "react-icons/lu";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  const [aiModal, setAiModal] = useState({
    open: false,
    comment: null,
  });

  const [aiReply, setAiReply] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const generateReply = async (comment) => {
    if (aiLoading) return; // 🔥 prevents spam requests

    try {
      setAiLoading(true);
      setAiReply("");

      const res = await axiosInstance.post(
        API_PATHS.AI.GENERATE_BLOG_REPLY,
        {
          author: comment.author?.name,
          content: comment.content,
        },
      );

      setAiReply(res.data);
    } catch (error) {
      console.error(error);

      if (error.response?.status === 429) {
        setAiReply("⚠️ Too many requests. Please wait a moment and try again.");
      } else {
        setAiReply("⚠️ AI is temporarily unavailable. Try again later.");
      }
    } finally {
      setAiLoading(false);
    }
  };

  // ---------------- FETCH COMMENTS ----------------
  const fetchComments = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get(API_PATHS.COMMENTS.GET_ALL);
      setComments(res.data || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load comments");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- DELETE COMMENT ----------------
  const deleteComment = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.COMMENTS.DELETE(id));

      toast.success("Comment deleted");

      setComments((prev) => prev.filter((c) => c._id !== id));
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete comment");
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  // ---------------- COMMENT CARD ----------------
  const CommentCard = ({ comment, depth = 0 }) => {
    return (
      <div
        className={`bg-white rounded-xl border border-gray-100 shadow-sm p-4 ${
          depth > 0 ? "ml-8 mt-3 border-l-4 border-sky-200" : ""
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 font-semibold">
              {comment.author?.name?.charAt(0)?.toUpperCase()}
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-800">
                {comment.author?.name}
              </p>
              <p className="text-xs text-gray-400">
                {moment(comment.createdAt).fromNow()}
              </p>
            </div>
          </div>

          <button
            className="hidden md:group-hover:flex items-center gap-2 text-xs text-rose-500 bg-rose-50 px-3 py-1 rounded  text-nowrap border border-rose-100 hover:border-s-rose-200 cursor-pointer"
            onClick={() => {
              deleteComment(comment._id);
            }}
          >
            <LuTrash2 /> <span className="hidden md:block">Delete</span>
          </button>
        </div>

        {/* Content */}
        <p className="mt-3 text-gray-700 text-sm leading-relaxed">
          {comment.content}
        </p>

        {/* Post info */}
        <div className="mt-3 flex items-center gap-2 text-xs text-gray-500 bg-gray-50 p-2 rounded-lg">
          <img
            src={comment.post?.coverImageUrl}
            className="w-8 h-8 rounded object-cover"
          />
          <span className="line-clamp-1">{comment.post?.title}</span>
        </div>

        {/* AI ACTION */}
        <div className="mt-3 flex justify-end">
          <button
            onClick={() => setAiModal({ open: true, comment })}
            className="flex items-center gap-1 text-xs bg-sky-50 text-sky-600 px-3 py-1 rounded-lg hover:bg-sky-100"
          >
            <LuSparkles size={14} />
            AI Reply
          </button>
        </div>

        {/* Replies */}
        {comment.replies?.map((reply) => (
          <CommentCard key={reply._id} comment={reply} depth={depth + 1} />
        ))}
      </div>
    );
  };

  return (
    <DashboardLayout activeMenu="Comments">
      <div className="p-6 max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <LuMessageSquare />
            Comments Management
          </h2>
          <p className="text-sm text-gray-500">
            Manage user discussions & AI replies
          </p>
        </div>

        {/* Comments */}
        {loading ? (
          <p>Loading comments...</p>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => (
              <CommentCard key={comment._id} comment={comment} />
            ))}
          </div>
        )}

        {/* AI MODAL */}
        <Modal
          isOpen={aiModal.open}
          onClose={() => {
            setAiModal({ open: false, comment: null });
            setAiReply("");
          }}
          title="AI Reply Generator"
        >
          <div className="p-5 w-[90vw] md:w-[500px]">
            <p className="text-sm text-gray-600 mb-3">
              Comment:{" "}
              <span className="font-medium">{aiModal.comment?.content}</span>
            </p>

            <button
              onClick={() => generateReply(aiModal.comment)}
              disabled={aiLoading}
              className="bg-sky-600 text-white px-4 py-2 rounded-lg text-sm disabled:opacity-50"
            >
              {aiLoading ? "Generating..." : "Generate Reply"}
            </button>

            {aiReply && (
              <div className="mt-4 bg-gray-50 border rounded-lg p-3 text-sm">
                {aiReply}
              </div>
            )}
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Comments;
