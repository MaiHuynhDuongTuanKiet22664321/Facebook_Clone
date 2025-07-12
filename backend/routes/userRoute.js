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
const { 
  updateUserProfilre,
  createOrUpdateController,
  updateCoverProfilre
} = require("../controllers/createOrUpdateController");
const router = express.Router();
const {multerMiddleware} = require("../config/cloudinary");


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

// create or update user bio
router.put("/bio/:userId", authMiddleware, createOrUpdateController);


// update cover photo
router.put("/profile/:userId", authMiddleware, multerMiddleware.single("profilePicture"), updateUserProfilre);

// update user profile
router.put("/profile/cover-photo/:userId", authMiddleware, multerMiddleware.single("coverPhoto"),updateCoverProfilre);





module.exports = router;
