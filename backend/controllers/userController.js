const { response } = require("../utils/responseHandler");
const User = require("../model/User");

// Follow a user
const followUser = async (req, res) => {
  const { userIdToFollow } = req.body;
  const userId = req?.user?.userId;

  // Prevent user from following themselves
  if (userId === userIdToFollow) {
    return response(res, 400, "You can't follow yourself");
  }
  try {
    const userToFollow = await User.findById(userIdToFollow);
    const currentUser = await User.findById(userId);

    // Check if both users exist
    if (!userToFollow || !currentUser) {
      return response(res, 404, "User not found");
    }

    // Check if already following
    if (currentUser.following.includes(userIdToFollow)) {
      return response(res, 400, "You are already following this user");
    }

    currentUser.following.push(userIdToFollow);
    userToFollow.followers.push(currentUser._id);

    userToFollow.followerCount += 1;
    currentUser.followingCount += 1;

    await currentUser.save();
    await userToFollow.save();

    return response(res, 200, "User followed successfully");
  } catch (error) {
    console.log("Error in followUser:", error);
    return response(res, 500, "Internal server error", error.message);
  }
};

// Unfollow a user
const unFollowUser = async (req, res) => {
  const { userIdToUnFollow } = req.body;
  const userId = req?.user?.userId;

  // Prevent user from unfollowing themselves
  if (userId === userIdToUnFollow) {
    return response(res, 400, "You can't unfollow yourself");
  }

  try {
    const userToUnFollow = await User.findById(userIdToUnFollow);
    const currentUser = await User.findById(userId);

    // Check if both users exist
    if (!userToUnFollow || !currentUser) {
      return response(res, 404, "User not found");
    }

    // Check if not following
    if (!currentUser.following.includes(userIdToUnFollow)) {
      return response(res, 400, "You are not following this user");
    }

    currentUser.following = currentUser.following.filter(
      id => id.toString() !== userIdToUnFollow
    );
    userToUnFollow.followers = userToUnFollow.followers.filter(
      id => id.toString() !== userId
    );

    currentUser.followingCount = Math.max(currentUser.followingCount - 1, 0);
    userToUnFollow.followerCount = Math.max(userToUnFollow.followerCount - 1, 0);

    await currentUser.save();
    await userToUnFollow.save();

    return response(res, 200, "User unfollowed successfully");
  } catch (error) {
    console.log("Error in unFollowUser:", error);
    return response(res, 500, "Internal server error", error.message);
  }
};

// Remove a friend request
const deleteUserFormRequest = async (req, res) => {
  try {
    const loggedInUserId = req?.user?.userId;
    const { requestSenderId } = req.body;

    const requestSender = await User.findById(requestSenderId);
    const loggedInUser = await User.findById(loggedInUserId);

    if (!requestSender || !loggedInUser) {
      return response(res, 404, "User not found");
    }

    const isRequestSend = requestSender.following.includes(loggedInUserId);
    if (!isRequestSend) {
      return response(res, 400, "This user is not following you");
    }

    requestSender.following = requestSender.following.filter(
      id => id.toString() !== loggedInUserId
    );
    loggedInUser.followers = loggedInUser.followers.filter(
      id => id.toString() !== requestSenderId
    );

    requestSender.followingCount = requestSender.following.length;
    loggedInUser.followerCount = loggedInUser.followers.length;

    await requestSender.save();
    await loggedInUser.save();

    return response(
      res,
      200,
      `Friend request from ${requestSender.username} removed successfully`
    );
  } catch (error) {
    console.log("Error in deleteUserFormRequest:", error);
    return response(res, 500, "Internal server error", error.message);
  }
};

// Get all friend requests (users following you but not followed back)
const getAllFriendRequest = async (req, res) => {
  try {
    const loggedInUserId = req?.user?.userId;
    const loggedInUser = await User.findById(loggedInUserId).select('followers following');
    if (!loggedInUser) {
      return response(res, 404, "User not found");
    }

    const userToFollowBack = await User.find({
      _id: {
        $in: loggedInUser.followers,
        $nin: loggedInUser.following,
      },
    }).select("username profilePicture email followerCount");

    return response(res, 200, "Friend requests fetched successfully", userToFollowBack);
  } catch (error) {
    console.log("Error in getAllFriendRequest:", error);
    return response(res, 500, "Internal server error", error.message);
  }
};

// Get all users that the current user has no connection with
const getAllUserForRequest = async (req, res) => {
  try {
    const loggedInUserId = req?.user?.userId;

    const loggedInUser = await User.findById(loggedInUserId).select("followers following");
    if (!loggedInUser) {
      return response(res, 404, "User not found");
    }

    const excludedIds = [
      ...loggedInUser.followers,
      ...loggedInUser.following,
      loggedInUserId,
    ];

    const userForFriendRequest = await User.find({
      _id: { $nin: excludedIds },
    }).select("username profilePicture email followerCount");

    return response(
      res,
      200,
      "Users available for friend request fetched successfully",
      userForFriendRequest
    );
  } catch (error) {
    console.log("Error in getAllUserForRequest:", error);
    return response(res, 500, "Internal server error", error.message);
  }
};

// Get mutual friends
const getAllMutualFriend = async (req, res) => {
  try {
    const loggedInUserId = req?.user?.userId;

    const loggedInUser = await User.findById(loggedInUserId)
      .select("followers following")
      .populate("following", "username profilePicture email followerCount followingCount")
      .populate("followers", "username profilePicture email followerCount followingCount");

    if (!loggedInUser) {
      return response(res, 404, "User not found");
    }

    const followingUserId = new Set(loggedInUser.following.map(user => user._id.toString()));

    const mutualFriends = loggedInUser.followers.filter(user =>
      followingUserId.has(user._id.toString())
    );

    return response(res, 200, "Mutual friends fetched successfully", mutualFriends);
  } catch (error) {
    console.log("Error in getAllMutualFriend:", error);
    return response(res, 500, "Internal server error", error.message);
  }
};

// Get all users (for searching profiles)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('username profilePicture email followerCount followingCount');
    return response(res, 200, "Users fetched successfully", users);
  } catch (error) {
    console.log("Error in getAllUsers:", error);
    return response(res, 500, "Internal server error", error.message);
  }
};

// Check if user is authenticated
const checkAuthenticated = async (req, res) => {
  try {
    const userId = req?.user?.userId;
    if (!userId) return response(res, 401, "Please login to continue");

    const user = await User.findById(userId).select("-password");
    if (!user) return response(res, 404, "User not found");

    return response(res, 200, "User authenticated successfully", user);
  } catch (error) {
    console.log("Error in checkAuthenticated:", error);
    return response(res, 500, "Internal server error", error.message);
  }
};

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const loggedInUserId = req?.user?.userId;

    const userProfile = await User.findById(userId).select("-password");
    if (!userProfile) return response(res, 404, "User not found");

    const isOwner = loggedInUserId === userId;

    return response(res, 200, "User profile fetched successfully", { profile: userProfile, isOwner });
  } catch (error) {
    console.log("Error in getUserProfile:", error);
    return response(res, 500, "Internal server error", error.message);
  }
};

module.exports = {
  followUser,
  unFollowUser,
  deleteUserFormRequest,
  getAllFriendRequest,
  getAllMutualFriend,
  getAllUserForRequest,
  getAllUsers,
  checkAuthenticated,
  getUserProfile
};
