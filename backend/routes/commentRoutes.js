const express = require('express');
const {
    addComment,
    getCommentsByPost,
    deleteComment,
    getAllComments,
} = require('../controllers/commentController.js');
const { protect } = require('../middlewares/authMiddleware.js');

const router = express.Router()

router.post('/:postId',protect,addComment);
router.get('/:postId',getCommentsByPost);
router.get('/',getAllComments);
router.delete('/:commentId',protect,deleteComment);

module.exports = router