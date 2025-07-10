const jwt = require("jsonwebtoken");
const { emit } = require("../model/User");

const generateToken = (user) => {
    return jwt.sign({ userId: user?._id, email: user?.email }, process.env.JWT_SECRET, {
        expiresIn: "90d",
    });
};

module.exports = {generateToken}

