const express = require("express");
const router = express.Router();
const { registerUser, loginUser, logoutUser } = require("../controllers/authController");
const passport = require("passport");
const { session } = require("express-session");
const { generateToken } = require("../utils/generateToken");



router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)


// google auth router
router.get('/google',passport.authenticate('google',{scope:['profile','email']}))

// google auth callback router
router.get('/google/callback',passport.authenticate('google',{failureRedirect:`${process.env.FRONTEND_URL}/user-login`,session: false}),
(req,res) => {
    const accessToken = generateToken(req?.user);
    res.cookie("auth_token",accessToken,{
        httpOnly: true,
    })
    res.redirect(`${process.env.FRONTEND_URL}`)
}
)

module.exports = router;