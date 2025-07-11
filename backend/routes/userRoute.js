const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  followUser,
  unFollowUser,
  deleteUserFormRequest,
  getAllFriendRequest,
  getAllMutualFriend,
  getAllUserForRequest,
  getAllUsers,
  checkAuthenticated,
  getUserProfile

} = require("../controllers/userController");
const router = express.Router();


// follow user
router.post("/follow",authMiddleware,followUser);

// unfollow user
router.post("/unfollow",authMiddleware,unFollowUser);

// delete user
router.post("/friend-request/remove", authMiddleware, deleteUserFormRequest);

// get all friend request from user
router.get("/friend-request", authMiddleware, getAllFriendRequest);

// get all mutual friend
router.get("/mutual-friends", authMiddleware, getAllMutualFriend);

// get all user for request
router.get("/user-to-request", authMiddleware, getAllUserForRequest);

// get all users
router.get("/", authMiddleware, getAllUsers);


// check authenticated
router.get("/check-auth", authMiddleware, checkAuthenticated);

// get user profile
router.get("/profile/:userId", authMiddleware, getUserProfile);





module.exports = router;
