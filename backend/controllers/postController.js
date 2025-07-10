const { response } = require("../utils/responseHandler");
const { uploadFileToCloudinary } = require("../config/cloudinary");
const Post = require("../model/Post");

const createPost = async (req, res) => {
  try {
    const userId = req.user.userId;
    console.log("This is user id", userId);

    const { content } = req.body;
    const file = req.file;

    let mediaUrl = null;
    let mediaType = null;

    if (file) {
      const uploadResult = await uploadFileToCloudinary(file);
      console.log("Upload file", uploadResult);
      mediaUrl = uploadResult?.secure_url;
      mediaType = file.mimetype.startsWith("video") ? "video" : "image";
    }

    // Create a new post
    const newPost = await new Post({
      user: userId,
      content,
      mediaUrl,
      mediaType,
      likeCount: 0,
      commentCount: 0,
      shareCount: 0,
    });
    await newPost.save();
    return response(res, 201, "Post created successfully", newPost);
  } catch (error) {
    console.log("error in creating post", error);
    return response(res, 500, "Internal server error", error.message);
  }
};

// get all post
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("user", "_id username profilePicture email")
      .populate({
        path: "comments.user",
        select: "username, profilePicture",
      });

    return response(res, 200, "Get all posts successfully", posts);

    return response(res, 200, "All posts", posts);
  } catch (error) {
    console.log("error in getting all post", error);
    return response(res, 500, "Internal server error", error.message);
  }
};

//get post by userId
const getPostByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    if (!userId) {
      return response(res, 400, "User id is required to get user post");
    }
    const posts = await Post.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate("user", "_id username profilePicture email")
      .populate({
        path: "comments.user",
        select: "username, profilePicture",
      });
    return response(res, 200, "Get user post successfully", posts);
  } catch (error) {
    console.log("error in getting all post", error);
    return response(res, 500, "Internal server error", error.message);
  }
};

// like post api
const likePost = async (req, res) => {
  const { postId } = req.params;
  const userId = req.user.userId;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return response(res, 404, "Post not found");
    }
    const hasLiked = post.likes.includes(userId);
    if (hasLiked) {
      post.likes = post.likes.filter(
        (id) => id.toString() !== userId.toString()
      );
      post.likeCount = Math.max(0, post.likeCount - 1); // ensure likeCount is non-negative
    } else {
      post.likes.push(userId);
      post.likeCount += 1;
    }

    //save the like in update post
    const updatedPost = await post.save();
    return response(
      res,
      200,
      hasLiked ? "Post unliked successfully" : "Post liked successfully",
      updatedPost
    );
  } catch (error) {
    console.log("error in liking post", error);
    return response(res, 500, "Internal server error", error.message);
  }
};

//post comment by user

const addCommentToPost = async (req, res) => {
  const { postId } = req.params;
  const userId = req.user.userId;
  const {text} = req.body
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return response(res, 404, "Post not found");
    }

    post.comments.push({ user: userId, text })
    post.commentCount += 1;
    
    //save the post wirh new comment
    await post.save();
    return response(
      res,
      200,
      "Comment added successfully",
    );
  } catch (error) {
    console.log("error in comment post", error);
    return response(res, 500, "Internal server error", error.message);
  }
};

// share on post by user
const sharePost = async (req, res) => {
  const { postId } = req.params;
  const userId = req.user.userId;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return response(res, 404, "Post not found");
    }

    const hasUserShared = post.share.includes(userId);
    if (!hasUserShared) {
      post.share.push(userId);
    }

    post.shareCount += 1;
    //save the post wirh new share
    await post.save();
    return response(
      res,
      200,
      "Post shared successfully",
      post
    );
  } catch (error) {
    console.log("error in share post", error);
    return response(res, 500, "Internal server error", error.message);
  }
};


module.exports = { 
    createPost, 
    getAllPosts, 
    getPostByUserId, 
    likePost,
    addCommentToPost,
    sharePost
};
