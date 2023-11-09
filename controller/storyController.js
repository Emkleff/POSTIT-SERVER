const Story = require("../models/story");
const cloudinary = require("cloudinary").v2;
const fs = require('fs')

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
  //   res.send("get Users stories");
  const { userId } = req.user;
  try {
    const stories = await Story.find({ writtenBy: userId }).populate(
      "writtenBy",
      "username"
    );
    res.status(200).json({ success: true, stories });
  } catch (error) {
    res.json(error);
  }
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
    fs.unlinkSync(req.files.image.tempFilePath);
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
//   res.send("edit story");
const { userId } = req.user;
const { storyId } = req.params;
try {
  const story = await Story.findOneAndUpdate({
    _id: storyId,
    writtenBy: userId,
  }, req.body, {new: true, runValidators: true, });
  res.status(200).json({ success: true, story });
} catch (error) {
    console.log(error);
  res.json(error);
}
    
};

// delete a story
const deleteStory = async (req, res) => {
//   res.send("delete story");
const { userId } = req.user
const { storyId } = req.params
    try {
        const story = await Story.findOneAndDelete({ _id: storyId, writtenBy: userId, });
        res.status(200).json({ success: true, message: 'story deleted'});
    } catch (error) {
        res.json(error)
    }
};

module.exports = {
  getAStory,
  getAllStories,
  getUsersStories,
  createAStory,
  editStory,
  deleteStory,
};
