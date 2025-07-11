const { response } = require("../utils/responseHandler");
const { uploadFileToCloudinary } = require("../config/cloudinary");
const Post = require("../model/Post");
const Story = require("../model/story");

// Create a new post
async function createPost(req, res) {
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

    // Create Post object
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
    console.log("Error creating post", error);
    return response(res, 500, "Internal server error", error.message);
  }
}

// Create a new story
const createStory = async (req, res) => {
  try {
    const userId = req.user.userId;
    const file = req.file;

    if(!file) {
      return response(res, 400, "No file uploaded");
    }
    let mediaUrl = null;
    let mediaType = null;

    if (file) {
      const uploadResult = await uploadFileToCloudinary(file);
      console.log("Upload file", uploadResult);
      mediaUrl = uploadResult?.secure_url;
      mediaType = file.mimetype.startsWith("video") ? "video" : "image";
    }

    // Create Story object
    const newStory = await new Story({
      user: userId,
      mediaUrl,
      mediaType,
    });
    await newStory.save();
    return response(res, 201, "Story created successfully", newStory);
  } catch (error) {
    console.log("Error creating story", error);
    return response(res, 500, "Internal server error", error.message);
  }
};

// Get all stories
const getAllStory = async (req, res) => {
  try {
    const story = await Story.find()
      .sort({ createdAt: -1 })
      .populate("user", "_id username profilePicture email")

    return response(res, 200, "Get all stories successfully", story);
  } catch (error) {
    console.log("Error getting stories", error);
    return response(res, 500, "Internal server error", error.message);
  }
};

// Get all posts
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
  } catch (error) {
    console.log("Error getting all posts", error);
    return response(res, 500, "Internal server error", error.message);
  }
};

// Get posts by userId
const getPostByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    if (!userId) {
      return response(res, 400, "User id is required to get posts");
    }
    const posts = await Post.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate("user", "_id username profilePicture email")
      .populate({
        path: "comments.user",
        select: "username, profilePicture",
      });
    return response(res, 200, "Get user's posts successfully", posts);
  } catch (error) {
    console.log("Error getting user's posts", error);
    return response(res, 500, "Internal server error", error.message);
  }
};

// API like post
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
      post.likeCount = Math.max(0, post.likeCount - 1); // Ensure likeCount is not negative
    } else {
      post.likes.push(userId);
      post.likeCount += 1;
    }

    // Save the post after like/unlike
    const updatedPost = await post.save();
    return response(
      res,
      200,
      hasLiked ? "Post unliked successfully" : "Post liked successfully",
      updatedPost
    );
  } catch (error) {
    console.log("Error liking post", error);
    return response(res, 500, "Internal server error", error.message);
  }
};

// Add comment to post
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
    
    // Save the post with new comment
    await post.save();
    return response(
      res,
      200,
      "Comment added successfully",
    );
  } catch (error) {
    console.log("Error commenting post", error);
    return response(res, 500, "Internal server error", error.message);
  }
};

// Share post
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
    // Save the post with new share
    await post.save();
    return response(
      res,
      200,
      "Post shared successfully",
      post
    );
  } catch (error) {
    console.log("Error sharing post", error);
    return response(res, 500, "Internal server error", error.message);
  }
};

module.exports = { 
    createPost, 
    getAllPosts, 
    getPostByUserId, 
    likePost,
    addCommentToPost,
    sharePost,
    getAllStory,
    createStory,
};
