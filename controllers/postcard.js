const cloudinary = require("../middleware/cloudinary");
const Postcard = require("../models/Postcard");
const Favorite = require("../models/Favorite");
//not sure why but vscode doesnt want me to capitalize Favorite here
module.exports = {
  getProfile: async (req, res) => { 
    console.log(req.user)
    try {
      //Since we have a session each request (req) contains the logged-in users info: req.user
      //console.log(req.user) to see everything
      //Grabbing just the posts of the logged-in user
      const postcards = await Postcard.find({ user: req.user.id });
      //Sending post data from mongodb and user data to ejs template
      res.render("profile.ejs", { postcards: postcards, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getFavorites: async (req, res) => { 
    console.log(req.user)
    try {
      //Since we have a session each request (req) contains the logged-in users info: req.user
      //console.log(req.user) to see everything
      //Grabbing just the posts of the logged-in user
      const postcards = await Favorite.find({ user: req.user.id }).populate('postcard');

      console.log(Favorite)
      
      //Sending post data from mongodb and user data to ejs template
      res.render("favorites.ejs", { postcards: postcards, user: req.user });
    } catch (err) {
      console.log(err);
    }//I fucked something up here maybe I fixed it?
  },
  getPostcard: async (req, res) => {
    try {
      //id parameter comes from the post routes
      //router.get("/:id", ensureAuth, postsController.getPost);
      //http://localhost:2121/post/631a7f59a3e56acfc7da286f
      //id === 631a7f59a3e56acfc7da286f
      const postcard = await Postcard.findById(req.params.id);
      res.render("postcard.ejs", { postcard: postcard, user: req.user});
    } catch (err) {
      console.log(err);
    }
  },
  createPostcard: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      //media is stored on cloudainary - the above request responds with url to media and the media id that you will need when deleting content 
      await Postcard.create({
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        likes: 0,
        user: req.user.id,
      });
      console.log("Postcard has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  favoritePostcard: async (req, res) => {
    try {
      //media is stored on cloudainary - the above request responds with url to media and the media id that 
      //you will need when deleting content 
      await Favorite.create({
        user: req.user.id,
        // image: result.secure_url,
        // cloudinaryId: result.public_id,
        // leaving it as caption only but can come back if I need it delete if cleaning
        //possibly add in thumbnail to see previews of the favorites
        postcard: req.body.id,
        //altering this to see if it fixes things

      });
      console.log("Favorite postcard has been added!");
      res.redirect(`/postcard/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  likePostcard: async (req, res) => {
    try {
      await Postcard.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/postcard/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deletePostcard: async (req, res) => {
    try {
      // Find post by id
      let postcard = await Postcard.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(postcard.cloudinaryId);
      // Delete post from db
      await Postcard.remove({ _id: req.params.id });
      console.log("Deleted Postcard");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
