const BlogPost = require("../models/BlogPost.js");
const mongoose = require("mongoose");

// @desc     Create a new blog post
// @route    POST /api/posts
// @access   Private (Admin only)
const createPost = async (req, res) => {
  try {
    const { title, content, coverImageUrl, tags, isDraft, generatedByAI } =
      req.body;
    const slug = title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");

    const newPost = new BlogPost({
      title,
      slug,
      content,
      coverImageUrl,
      tags,
      author: req.user._id,
      isDraft,
      generatedByAI,
    });

    await newPost.save();
    return res.status(201).json(newPost);
  } catch (error) {
    console.log("Error creating post", error);
    return res
      .status(500)
      .json({ mesage: "Failed to create Post", error: error.message });
  }
};

// @desc     Update a blog post
// @route    PUT /api/posts/:id
// @access   Private (Admin only)
const updatePost = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    if (
      post.author.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ message: "Not Authorized to update this post" });
    }

    const updatedData = req.body;
    if (updatedData.title) {
      updatedData.slug = updatedData.title
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");
    }

    const updatedPost = await BlogPost.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true },
    );
    return res.json(updatedPost);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ mesage: "Server error", error: error.message });
  }
};

// @desc     Delete a blog post
// @route    DELETE /api/posts/:id
// @access   Private (Admin only)
const deletePost = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    await post.deleteOne();
    res.json({ message: "Post Deleted" });
  } catch (error) {
    return res
      .status(500)
      .json({ mesage: "Failed to delete post", error: error.message });
  }
};

// @desc     GET blog posts by ststus fsll, pubished or draft and include counts
// @route    GET /api/posts?status=published[draft]all&page=1
// @access   Public
const getAllPosts = async (req, res) => {
  try {
    const status = req.query.status || "published";
    const page = Number(req.query.page) || 1;
    const limit = 4;
    const skip = (page - 1) * limit;

    // Determine filter for main posts response
    let filter = {};
    if (status === "published") filter.isDraft = false;
    else if (status === "draft") filter.isDraft = true;

    // Fetch paginated post
    const [posts, featuredPost, trendingPosts] = await Promise.all([
      BlogPost.find(filter)
        .populate("author", "name profileImageUrl")
        .sort({ updatedAt: -1 })
        .skip(skip)
        .limit(limit),

      BlogPost.findOne({
        isDraft: false,
      })
        .populate("author", "name profileImageUrl")
        .sort({
          likes: -1,
          views: -1,
        }),

      BlogPost.find({
        isDraft: false,
      })
        .populate("author", "name profileImageUrl")
        .sort({
          views: -1,
        })
        .limit(3),
    ]);

    // Count totals for paginationn and tab counts
    const [totalCount, allCount, publishedCount, draftCount] =
      await Promise.all([
        BlogPost.countDocuments(filter), // totalCount for filtered posts
        BlogPost.countDocuments(), // all posts
        BlogPost.countDocuments({ isDraft: false }), // published count
        BlogPost.countDocuments({ isDraft: true }), // draft count
      ]);

    res.json({
      featuredPost,
      trendingPosts,
      posts,
      page,
      totalPages: Math.ceil(totalCount / limit),
      totalCount,
      counts: {
        all: allCount,
        published: publishedCount,
        draft: draftCount,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: " Server error", error: error.message });
  }
};

// @desc     Get a single blog post by slug
// @route    GET /api/posts/:slug
// @access   Public
const getPostsBySlug = async (req, res) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug }).populate(
      "author",
      "name profileImaheUrl",
    );
    if (!post) return res.status(404).json({ message: "Post not found" });
    return res.json(post);
  } catch (error) {
    return res
      .status(500)
      .json({ mesage: "Server error", error: error.message });
  }
};

// @desc     Get a blog post by tag
// @route    GET /api/posts/:tag
// @access   Public
const getPostsByTag = async (req, res) => {
  try {
    const post = await BlogPost.find({
      tags: req.params.tag,
      isDraft: false,
    }).populate("author", "name profileImageUrl");
    res.json(post);
  } catch (error) {
    return res
      .status(500)
      .json({ mesage: "Server Error", error: error.message });
  }
};

// @desc     Search post by title or content
// @route    GET /api/posts/search?q=keyword
// @access   Public
const searchPosts = async (req, res) => {
  try {
    const q = req.query.q;
    const posts = await BlogPost.find({
      isDraft: false,
      $or: [
        { title: { $regex: q, $options: "i" } },
        { content: { $regex: q, $options: "i" } },
      ],
    }).populate("author", "name profileImageUrl");
    res.json(posts);
  } catch (error) {
    return res
      .status(500)
      .json({ mesage: "Server error", error: error.message });
  }
};

// @desc     Increment post view
// @route    POST /api/posts/:id/view
// @access   Public
const incrementView = async (req, res) => {
  try {
    await BlogPost.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } });
    return res.json({ message: "View count incremented" });
  } catch (error) {
    return res
      .status(500)
      .json({ mesage: "Server error", error: error.message });
  }
};
// @desc     Like a blog post
// @route    POST /api/posts/:id/like
// @access   Private (Admin only)
const likePost = async (req, res) => {
  try {
    await BlogPost.findByIdAndUpdate(req.params.id, { $inc: { likes: 1 } });
    return res.json({ message: "Like added" });
  } catch (error) {
    return res
      .status(500)
      .json({ mesage: "Server error", error: error.message });
  }
};
// @desc     Get alltop trending post
// @route    get /api/posts/trending
// @access   Public 
const getTopPosts = async (req, res) => {
  try {
    // Top performing posts
    const posts = await BlogPost.find({ isDraft: false })
      .sort({ views: -1, likes: -1 })
      .limit(5);

    return res.json(posts);
  } catch (error) {
    return res
      .status(500)
      .json({ mesage: "Server error", error: error.message });
  }
};

module.exports = {
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
};
