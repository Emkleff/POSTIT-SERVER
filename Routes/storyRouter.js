const router = require("express").Router();
const {
  getAStory,
  getAllStories,
  getUsersStories,
  createAStory,
  editStory,
  deleteStory,
} = require("../controller/storyController");

//all
router.get("/all/story", getAllStories);

//users
router.route("/user/story").get(getUsersStories).post(createAStory);
router
  .route("/user/story/:storyId")
  .get(getAStory)
  .patch(editStory)
  .delete(deleteStory);

module.exports = router;
