const User = require("../model/User");
const bcrypt = require("bcrypt");
const { response } = require("../utils/responceHandler");


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

       
    }catch(err){
        console.log(err);
    }
};