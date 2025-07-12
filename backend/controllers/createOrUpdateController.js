const Bio = require("../model/UserBio");
const User = require("../model/User");
const { response } = require("../utils/responseHandler");
const { uploadFileToCloudinary } = require("../config/cloudinary");



const createOrUpdateController = async(req, res) => {
    try {
        const {userId} = req.params;
        const {bioText,liveIn,relationShip,workplace,education,phone,hometown} = req.body;

        let bio = await Bio.findOneAndUpdate(
            {user:userId},
            {
                bioText,
                liveIn,
                relationShip,
                workplace,
                education,
                phone,
                hometown
            },
            {new:true,runValidators:true}
        )

        // if bio dose not exist to create new one
        if(!bio){
            bio = new Bio({
                user:userId,
                bioText,
                liveIn,
                relationShip,
                workplace,
                education,
                phone,
                hometown
            })
            await bio.save();
            await User.findByIdAndUpdate(userId,{bio:bio._id})
        }

        return response(res,200,"Bio updated successfully",bio)
    } catch (error) {
        console.log("Error in createOrUpdateController:", error);
        return response(res, 500, "Internal server error", error.message);
    }
}

const updateCoverProfilre = async (req, res) => {
  try {
    const { userId } = req.params;
    const file = req.file;
    let coverPhoto = null; // ✅ dùng let thay vì const

    if (file) {
      const uploadResult = await uploadFileToCloudinary(file);
      coverPhoto = uploadResult?.secure_url;
    }

    if (!coverPhoto) {
      return response(res, 400, "Failed to upload cover photo", null);
    }

    const update = await User.updateOne(
      { _id: userId },
      {
        $set: {
          coverPhoto,
        },
      }
    );

    const updateUser = await User.findById(userId);

    if (!updateUser) {
      return response(res, 400, "User not found");
    }

    return response(
      res,
      200,
      "Cover photo updated successfully",
      updateUser
    );
  } catch (error) {
    console.log("Error in updateCoverProfilre:", error);
    return response(res, 500, "Internal server error", error.message);
  }
};



const updateUserProfilre = async (req, res) => {
  try {
    const { userId } = req.params;
    const { username, gender, dateOfBirth } = req.body;
    const file = req.file;
    let profilePicture = null;

    if (file) {
      const uploadResult = await uploadFileToCloudinary(file);
      profilePicture = uploadResult?.secure_url;
    }

    if (!profilePicture) {
      return response(res, 400, "Failed to upload profile picture", null);
    }

    // update user profile
    await User.updateOne(
      { _id: userId },
      {
        $set: {
          username,
          gender,
          dateOfBirth,
          ...(profilePicture && { profilePicture }),
        },
      }
    );

    const updateUser = await User.findById(userId);

    if (!updateUser) {
      return response(res, 400, "User not found");
    }

    return response(res, 200, "User profile updated successfully", updateUser);
  } catch (error) {
    console.log("Error in updateUserProfilre:", error);
    return response(res, 500, "Internal server error", error.message);
  }
};


module.exports = {
    createOrUpdateController,
    updateCoverProfilre,
    updateUserProfilre
}