import { FaReply, FaTrash } from "react-icons/fa";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import { useContext, useState } from "react";
import { UserContext } from "../../context/userContent";

const CommentCard = ({ comment, postId, onReplyAdded, onCommentDeleted }) => {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState("");

  const { user } = useContext(UserContext);

  const handleDelete = async () => {
    try {
      if (!window.confirm("Delete this comment?")) {
        return;
      }
      await axiosInstance.delete(API_PATHS.COMMENTS.DELETE(comment._id));

      onCommentDeleted(comment._id);
    } catch (error) {
      console.log(error);
    }
  };

  const canDelete =
    user && (user.role === "admin" || user._id === comment.author?._id);

  const handleReply = async () => {
    if (!replyText.trim()) return;

    try {
      const res = await axiosInstance.post(API_PATHS.COMMENTS.ADD(postId), {
        content: replyText,
        parentComment: comment._id,
      });

      onReplyAdded(comment._id, res.data);

      setReplyText("");
      setShowReplyBox(false);
    } catch (error) {
      console.log(error);
    }
  };

  const canComment =  user &&
  (user.role === "admin" || user.role === "member");
  return (
    <div className="flex gap-4 w-full md:w-3/5">
      {/* Avatar */}
      <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
        {comment?.author?.profileImageUrl ? (
          <img
            src={comment.author.profileImageUrl}
            className="w-full h-full object-cover"
          />
        ) : null}
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="bg-white p-5 rounded-2xl border border-gray-200">
          {/* header */}
          <div className="flex justify-between items-start">
            <div>
              <p className="font-semibold">{comment.author?.name}</p>

              <p className="text-xs text-gray-500">
                {new Date(comment.createdAt).toLocaleString()}
              </p>
            </div>

            {canDelete && (
              <button
                onClick={handleDelete}
                className="text-red-500 hover:text-red-600"
              >
                <FaTrash />
              </button>
            )}
          </div>

          {/* text */}
          <p className="text-gray-600">{comment.content}</p>
        </div>

        {/* actions */}
        <div className="flex gap-4 mt-2 ml-2 text-sm text-gray-500">
          <button
            className="hover:text-sky-500 flex flex-row items-center gap-1"
            onClick={() => setShowReplyBox(!showReplyBox)}
          >
            <FaReply /> Reply
          </button>
        </div>
        {showReplyBox && (
          <div className="mt-4">
            <textarea
            disabled={!canComment}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write a reply..."
              className="w-full border border-gray-200 rounded-xl p-3"
            />

            <div className="flex justify-end mt-2">
              <button
              disabled={!canComment}
                onClick={handleReply}
                className="bg-sky-500 text-white px-4 py-2 rounded-full"
              >
                Reply
              </button>
            </div>
          </div>
        )}

        {/* replies */}
        {comment.replies?.length > 0 && (
          <div className="mt-6 ml-6 space-y-4">
            {comment.replies.map((reply) => (
              <CommentCard
                key={reply._id}
                comment={reply}
                postId={postId}
                onReplyAdded={onReplyAdded}
                onCommentDeleted={onCommentDeleted}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentCard;
