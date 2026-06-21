import { useContext } from "react";
import { UserContext } from "../../context/userContent";
import CommentCard from "./CommentCard";

const CommentSection = ({
  comments = [],
  postId,
  commentText,
  setComments,
  setCommentText,
  onAddComment,
  loading,
}) => {
   const { user } = useContext(UserContext);

  const addReplyToTree = (comments, parentId, reply) => {
    return comments.map((comment) => {
      if (comment._id === parentId) {
        return {
          ...comment,
          replies: [...comment.replies, reply],
        };
      }

      return {
        ...comment,
        replies: addReplyToTree(comment.replies || [], parentId, reply),
      };
    });
  };

  const removeCommentFromTree = (comments, commentId) => {
    return comments
      .filter((comment) => comment._id !== commentId)
      .map((comment) => ({
        ...comment,
        replies: removeCommentFromTree(comment.replies || [], commentId),
      }));
  };
   const canComment =  user &&
  (user.role === "admin" || user.role === "member");

    console.log(canComment)

  return (
    <section className="mb-12 pl-2 md:pl-6" id="comments">
      {/* HEADER */}
      <h2 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-3">
        Comments
        <span className="text-gray-500 text-lg">({comments.length})</span>
      </h2>

      {/* FORM */}
      <div className="p-6 rounded-2xl mb-10 border border-gray-200 bg-white">
        <textarea
        disabled={!canComment}
          className="w-full md:w-1/2 h-32 p-4 border border-gray-300 rounded-xl focus:border-sky-500 focus:ring-4 focus:ring-sky-100 transition outline-none resize-none mb-4"
          placeholder="Join the discussion..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />

        <div className="flex justify-end md:justify-center">
          <button
            onClick={onAddComment}
            disabled={loading || !canComment}
            className="bg-sky-500 text-white px-8 py-2.5 rounded-full font-semibold hover:bg-sky-600 transition disabled:opacity-50"
          >
            {loading ? "Posting..." : "Post Comment"}
          </button>
        </div>
      </div>

      {/* COMMENTS LIST */}
      <div className="space-y-8">
        {comments.map((comment) => (
          <CommentCard
            key={comment._id}
            comment={comment}
            postId={postId}
            onReplyAdded={(parentId, reply) => {
              setComments((prev) => addReplyToTree(prev, parentId, reply));
            }}
            onCommentDeleted={(commentId) => {
              setComments((prev) => removeCommentFromTree(prev, commentId));
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default CommentSection;
