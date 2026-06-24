const Comment = require("../models/Comment.js");
const BlogPost = require("../models/BlogPost.js");

// @desc    Add a comment to a blog pst
// @route   POST /api/comments/:postId
// @access  Private

const addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content, parentComment }= req.body;

    // Ensure a blog post exists
    const post = await BlogPost.findById(postId);
    if (!post) {
        return res.status(404).json({message:"Post not found"})
    }

    const comment = await Comment.create({
        post:postId,
        author:req.user._id,
        content,
        parentComment:parentComment || null,
    });

    await comment.populate("author", "name profileImageUrl")

    return res.status(201).json(comment)
  } catch (error) {
    return res.status(500)
      .json({ message: "Failed to add a comment", error: error.message });
  }
};

// @desc    Get  all comment to a blog pst
// @route   GET /api/comments/
// @access  Public

const getAllComments = async (req, res) => {
  try {
    // Fetch all comments with author populated
    const comments = await Comment.find()
     .populate("author","name profileImageUrl")
     .populate("post","title coverImageUrl")
     .sort({createdAt:1});

     //Create a map for commentId->comment objet
     const commentMap={}
     comments.forEach((comment)=>{
        comment = comment.toObject();  //convert from mongoose document to plain object
        comment.replies = [];
        commentMap[comment._id] = comment;
     })

    //  Nest replies under their parentComment
    const nestedComments =[];
    comments.forEach(comment=>{
        if (comment.parentComment) {
            const parent = commentMap[comment.parentComment];
            if (parent) {
                parent.replies.push(commentMap[comment._id])
            }
        }else{
            nestedComments.push(commentMap[comment._id]);
        }
    })

    return res.json(nestedComments)
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch comments", error: error.message });
    }
};

// @desc    Add a comment to a blog pst
// @route   GET /api/comments/:postId
// @access  Public

const getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.find({post:postId})
     .populate("author","name profileImageUrl")
     .populate("post", "title coverImage")
     .sort({createdAt: 1});

     const commentMap ={};
     comments.forEach(comment=>{
        comment= comment.toObject();
        comment.replies = [];
        commentMap[comment._id] = comment;
     })

     const nestedComments =[];
     comments.forEach(comment=>{
        if (comment.parentComment) {
            const parent = commentMap[comment.parentComment];
            if (parent) {
                parent.replies.push(commentMap[comment._id])
            }
        }else{
            nestedComments.push(commentMap[comment._id])
        }
     })

     return res.json(nestedComments)

  } catch (error) {
    return res.status(500)
      .json({ message: "Failed to fetch comments", error: error.message });
  }
};


// @desc    Delete comment to a blog pst
// @route   POST /api/comments/:commentId
// @access  Private

const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    // Delete all nested replies
    await deleteRepliesRecursively(commentId);

    // Delete the parent comment itself
    await Comment.findByIdAndDelete(commentId);

    return res.status(200).json({
      message: "Comment deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete comment",
      error: error.message,
    });
  }
};

const deleteRepliesRecursively = async (commentId) => {
  const replies = await Comment.find({
    parentComment: commentId,
  });

  for (const reply of replies) {
    await deleteRepliesRecursively(reply._id);
    await Comment.findByIdAndDelete(reply._id);
  }
};

module.exports ={
    addComment,
    getCommentsByPost,
    getAllComments,
    deleteComment
}
