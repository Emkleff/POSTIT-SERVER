const Story = require("../models/story");
const cloudinary = require("cloudinary").v2;

// get all stories
const getAllStories = async (req, res) => {
  // res.send('get all stories')
  try {
    const stories = await Story.find().populate("writtenBy", "username");
    res.status(200).json({ success: true, stories });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};
// get single story
const getAStory = async (req, res) => {
  //   res.send("get a story");
  const { storyId } = req.params;
  try {
    const story = await Story.findById({ _id: storyId }).populate(
      "writtenBy",
      "username"
    );
    res.status(200).json({ success: true, story });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

// USERS STORIES
const getUsersStories = async (req, res) => {
  res.send("get Users stories");
};

// create  a story
const createAStory = async (req, res) => {
  //   res.send("create a story");
  const { userId } = req.user;
  // get access to the image in the req.files
  try {
    // image upload
    const result = await cloudinary.uploader.upload(
      req.files.image.tempFilePath,
      {
        use_ilename: true,
        folder: "postitfileimages",
      }
    );
    req.body.image = result.secure_url;
    req.body.writtenBy = userId;
    // send post request
    const story = await Story.create({ ...req.body });
    res.status(201).json({ success: true, story });
  } catch (error) {
    res.json(error);
  }
};

// update a story
const editStory = async (req, res) => {
  res.send("edit story");
};

// delete a story
const deleteStory = async (req, res) => {
  res.send("delete story");
};

module.exports = {
  getAStory,
  getAllStories,
  getUsersStories,
  createAStory,
  editStory,
  deleteStory,
};
