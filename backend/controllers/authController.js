const User = require("../model/User");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");
const response = require("../utils/responseHandler");


const registerUser = async (req, res) => {
    try{
        const { username, email, password,gender,dateOfBirth } = req.body;


        // check the existing of the user with email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return response(res, 400, "User with this email already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword,gender,dateOfBirth });
        await newUser.save();

        const accessToken = generateToken(newUser);
        res.cookie("auth_token",accessToken,{
            httpOnly: true,
        })
       
        return response(res, 201, "User registered successfully", {
            username: newUser.username,
            email: newUser.email
        });
    }catch(err){
        console.log(err);
        return response(res, 500, "Internal server error",err.message);
    }
};

module.exports = { registerUser };


const loginUser = async (req, res) => {
    try{
        const {email, password} = req.body;


        // check the existing of the user with email
        const user = await User.findOne({ email });
        if (!user) {
            return response(res, 404, "User not found with this email");
        }

        const matchPassword = await bcrypt.compare(password, user.password);
        if (!matchPassword) {
            return response(res, 404, "Invalid password");
        }

        const accessToken = generateToken(user);

        res.cookie("auth_token",accessToken,{
            httpOnly: true,
        })
       
        return response(res, 201, "User login successfully", {
            username: user.username,
            email: user.email
        });
    }catch(err){
        console.log(err);
        return response(res, 500, "Internal server error",err.message);
    }
};

const logoutUser = async (req, res) => {
    try{
        res.cookie("auth_token",null,{
            httpOnly: true,
            expires: new Date(0),
        })
        return response(res, 200, "User logout successfully");
    }catch(err){
        console.log(err);
        return response(res, 500, "Internal server error",err.message);
    }
};

module.exports = {registerUser, loginUser , logoutUser };
