const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router()
const {
    generateBlogPost,
    generateBlogPostIdeas,
    generateCommentReply,
    generatePostSummary
}= require('../controllers/aiController.js');

router.post('/generate',protect,generateBlogPost);
router.post('/generate-ideas',protect,generateBlogPostIdeas);
router.post('/generate-reply',protect,generateCommentReply);
router.post('/generate-summary',protect,generatePostSummary);

module.exports = router