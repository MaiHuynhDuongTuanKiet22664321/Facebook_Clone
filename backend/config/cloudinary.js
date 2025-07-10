const multer = require("multer");
const {CloudinaryStorage} = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();



cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

const uploadFileToCloudinary = (file) => {
    const options = {
        use_filename: true, // hoặc false nếu không muốn giữ tên file gốc
        resource_type: file.mimetype.startsWith('video') ? 'video' : 'image'
    };

    return new Promise((resolve, reject) => {
        //for video update
        if(file.mimetype.startsWith('video')) {
            cloudinary.uploader.upload_large(file.path, options, (error, result) => {
                if(error) {
                    reject(error);
                }
                resolve(result);

            });
        }else{
            //image upload
            cloudinary.uploader.upload(file.path, options, (error, result) => {
                if(error) {
                    reject(error);
                }
                resolve(result);
            });
        }
    });
};

const multerMiddleware = multer({dest : "uploads/"})

module.exports = {uploadFileToCloudinary,multerMiddleware}