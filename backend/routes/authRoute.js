const express = require("express");
const router = express.Router();
const { registerUser, loginUser, logoutUser } = require("../controllers/authController");
const passport = require("passport");
const { session } = require("express-session");
const { generateToken } = require("../utils/generateToken");



router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)


router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
    accessType: "offline",
    responseType: "code"
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.FONTEND_URL || "http://localhost:3000",
    failureRedirect: "/login/failed"
  })
);


module.exports = router;