const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { connect } = require("mongoose");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cookieParser());



connectDB();





const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
