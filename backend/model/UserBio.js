const mongoose = require("mongoose");

const bioShema = new mongoose.Schema(
    {
        bioText: { type: String, default: null },
        liveIn: { type: String, default: null },
        relationShip: { type: String, default: null },
        workplace: { type: String, default: null },
        education: { type: String, default: null },
        phone: { type: String, default: null },
        hometown: { type: String, default: null },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },
    },
    { timestamps: true }
);

const Bio = mongoose.model("Bio", bioShema);
module.exports = Bio;