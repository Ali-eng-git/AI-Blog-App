const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
  getPostsBySlug,
  getPostsByTag,
  searchPosts,
  incrementView,
  likePost,
  getTopPosts,
} = require("../controllers/blogController.js");

const router = express.Router();

// /Admin ony middlewaare
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role == "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Admin access only" });
  }
};

router.post("/", protect, adminOnly, createPost);
router.get("/", getAllPosts);
router.get("/slug/:slug", getPostsBySlug);
router.put("/:id", protect, adminOnly, updatePost);
router.delete("/:id", protect, adminOnly, deletePost);
router.get("/tag/:tag", getPostsByTag);
router.get("/search", searchPosts);
router.post("/:id/view", incrementView);
router.post("/:id/like", protect, likePost);
router.get("/trending", getTopPosts);

module.exports = router;
