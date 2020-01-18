const mongoose = require("mongoose"),
      PointSchema = require("./utils/PointSchema");


DevSchema = new mongoose.Schema({
    name: String,
    github_username: String,
    bio: String,
    avatar_url: String,
    techs: [String],
    location: {
        type: PointSchema,
        index: '2dsphere'
    }
});


module.exports = mongoose.model("Dev", DevSchema);