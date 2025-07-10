const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { multerMiddleware } = require("../config/cloudinary");
const router = express.Router();
const {
  createPost,
  getAllPosts,
  getPostByUserId,
  likePost,
  sharePost,
  addCommentToPost
} = require("../controllers/postController");

// create post
router.post(
  "/posts",
  authMiddleware,
  multerMiddleware.single("media"),
  createPost
);

// get all post
router.get("/posts", authMiddleware, getAllPosts);

// get post by user id
router.get("/posts/user/:userId", authMiddleware, getPostByUserId);

// user like post route
router.post("/posts/likes/:postId", authMiddleware, likePost);

// add comment to post route
router.post("/posts/comments/:postId", authMiddleware, addCommentToPost);

// user share post route
router.post("/posts/share/:postId", authMiddleware, sharePost);

module.exports = router;
