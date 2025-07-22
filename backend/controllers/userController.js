
const User = require("../model/User");
const response = require("../utils/responseHandler");

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
    const [userToUnFollow, currentUser] = await Promise.all([
      User.findById(userIdToUnFollow),
      User.findById(userId),
    ]);

    // Check if both users exist
    if (!userToUnFollow || !currentUser) {
      return response(res, 404, "User not found");
    }

    // Check if not following
    const isFollowing = currentUser.following.some(
      (id) => id.toString() === userIdToUnFollow
    );
    if (!isFollowing) {
      return response(res, 400, "You are not following this user");
    }

    // Remove from following/followers
    currentUser.following = currentUser.following.filter(
      (id) => id.toString() !== userIdToUnFollow
    );
    userToUnFollow.followers = userToUnFollow.followers.filter(
      (id) => id.toString() !== userId
    );

    // Update count fields safely
    currentUser.followingCount = Math.max(
      (currentUser.following?.length || 0),
      0
    );
    userToUnFollow.followerCount = Math.max(
      (userToUnFollow.followers?.length || 0),
      0
    );

    await Promise.all([currentUser.save(), userToUnFollow.save()]);

    return response(res, 200, "User unfollowed successfully");
  } catch (error) {
    console.error("Error in unFollowUser:", error);
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

//get all frined request fro user
const getAllFriendRequest  = async (req, res) => {
    try {
         const loggedInUserId = req.user.userId;

         //find the logged in user and retrive their followers and following

         const loggedInUser = await User.findById(loggedInUserId).select('followers following')
         if(!loggedInUser){
            return response(res, 404, 'User not found')
         }

         //find user who follow the logged in user but are not followed back
          const userToFollowBack = await User.find({
            _id:{
                $in:loggedInUser.followers, //user who follow the logged in user
                $nin: loggedInUser.following // exclued users the logged in user already follow back
            }
          }).select('username profilePicture email followerCount');

          return response(res,200, 'user to follow back get successfully',userToFollowBack)

    } catch (error) {
        return response(res, 500, 'Internal server error', error.message)
    }
}


//get all frined request fro user
const getAllUserForRequest = async (req, res) => {
    try {
         const loggedInUserId = req.user.userId;

         //find the logged in user and retrive their followers and following

         const loggedInUser = await User.findById(loggedInUserId).select('followers following')
         if(!loggedInUser){
            return response(res, 404, 'User not found')
         }

         //find user who  neither followers not following of the login user
          const userForFriendRequest = await User.find({
            _id:{
                $ne:loggedInUser, //user who follow the logged in user
                $nin: [...loggedInUser.following, ...loggedInUser.followers]// exclued both
            }
          }).select('username profilePicture email followerCount');

          return response(res,200, 'user for frined request get successfully ',userForFriendRequest)

    } catch (error) {
        return response(res, 500, 'Internal server error', error.message)
    }
}

// Get mutual friends
const getAllMutualFriends = async (req, res) => {
  try {
      const ProfileUserId = req.params.userId;

      //find the logged in user and retrive their followers and following
      const loggedInUser = await User.findById(ProfileUserId)
      .select('followers following')
      .populate('following', 'username profilePicture email followerCount followingCount')
      .populate('followers','username profilePicture email followerCount followingCount')

      if(!loggedInUser){
         return response(res, 404, 'User not found')
      }

      //create a set of user id that logged in user is following
      const followingUserId = new Set(loggedInUser.following.map(user => user._id.toString()))

      //filter followers to get only those who are also following you and followed by loggin user 
      const mutualFriends = loggedInUser.followers.filter(follower => 
          followingUserId.has(follower._id.toString())
      )

      return response(res,200, 'Mutual friends get successfully', mutualFriends)

 } catch (error) {
     return response(res, 500, 'Internal server error', error.message)
 }
}

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

    // Sửa tại đây: populate trường bio
    const userProfile = await User.findById(userId).select("-password").populate('bio');
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
  getAllMutualFriends,
  getAllUserForRequest,
  getAllUsers,
  checkAuthenticated,
  getUserProfile
};
