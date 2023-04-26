const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const postcardsController = require("../controllers/postcard");
const { ensureAuth } = require("../middleware/auth");

//Post Routes
//Since linked from server js treat each path as:
//post/:id, post/createPost, post/likePost/:id, post/deletePost/:id
router.get("/:id", ensureAuth, postcardsController.getPostcard);

//Enables user to create post w/ cloudinary for media uploads
router.post("/createPostcard", upload.single("file"), postcardsController.createPostcard);

router.post("/favoritePostcard/:id", postcardsController.favoritePostcard);

//Enables user to like post. In controller, uses POST model to update likes by 1
router.put("/likePostcard/:id", postcardsController.likePostcard);

//Enables user to delete post. In controller, uses POST model to delete post from MongoDB collection
router.delete("/deletePostcard/:id", postcardsController.deletePostcard);

module.exports = router;
