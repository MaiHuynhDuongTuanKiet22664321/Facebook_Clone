const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { connect } = require("mongoose");
const connectDB = require("./config/db");
require("dotenv").config();
const authRoute = require("./routes/authRoute");
const postRoute = require("./routes/postRoute");
const userRoute = require("./routes/userRoute");

const app = express();
app.use(express.json());
app.use(cookieParser());



connectDB();

// api route
app.use("/auth", authRoute);
app.use('/users',postRoute);
app.use('/users',userRoute);




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
