const { response } = require("../utils/responseHandler");
const User = require("../model/User");

// follow user
const followUser = async (req, res) => {
    const { userIdToFollow } = req.body;
    const userId = req?.user?.userId;

    //prevent the user to follow itself
    if (userId === userIdToFollow) {
        return response(res, 400, "You can't follow yourself");
    }
    try {
        const userToFollow = await User.findById(userIdToFollow);
        const currentUser = await User.findById(userId);

        //check both users exist in database or not
        if (!userToFollow || !currentUser) {
            return response(res, 404, "User not found");
        }

        //check if current user is already following the user
        if (currentUser.following.includes(userIdToFollow)) {
            return response(res, 400, "You are already following this user");
        }

        //add user to current user's following list
        currentUser.following.push(userIdToFollow);
        //add current user to userToFollow's followers list
        userToFollow.followers.push(currentUser._id);

        //update the follower and following count
        userToFollow.followerCount += 1;
        currentUser.followingCount += 1;

        //save the user
        await currentUser.save();
        await userToFollow.save();

        return response(res, 200, "User followed successfully");
    } catch (error) {
        console.log("error in following user", error);
        return response(res, 500, "Internal server error", error.message);
    }
}

module.exports = {
    followUser
}