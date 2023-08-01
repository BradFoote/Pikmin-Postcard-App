const mongoose = require("mongoose");

const FavoriteSchema = new mongoose.Schema({
//   image: {
//     type: String,
//     require: true,
//   },
//   cloudinaryId: {
//     type: String,
//     require: true,
//   },
//saving for possible future use. delete if cleaning
  // caption: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Postcard",
  // },
//if there's a problem it's probably here ^ doesn't need a caption i think? Or is this bringing caption from the og post?
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
module.exports = mongoose.model("favorite", FavoriteSchema);
