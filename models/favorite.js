const mongoose = require("mongoose");

const FavoriteSchema = new mongoose.Schema({
  postcard: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Postcard"
},
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//MongoDB Collection named here - will give lowercase plural of name 
module.exports = mongoose.model("Favorite", FavoriteSchema);
