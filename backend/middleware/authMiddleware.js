const jwt = require("jsonwebtoken");
const { response } = require("../utils/responseHandler");


const authMiddleware = async (req, res, next) => {
    const authToken = req?.cookies?.auth_token;
    if (!authToken) {
        return response(res, 401, "Athuntication failed. Please provide token");
    }
    try {
        const decode = jwt.verify(authToken, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        console.log(error);
        return response(res, 500, "Internal token or expired. Please provide token", error.message);
    }
};

module.exports = authMiddleware;