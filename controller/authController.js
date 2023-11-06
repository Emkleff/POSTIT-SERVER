const Users = require("../models/user");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

const handleError = require("../utils/error");

//hashing password
const registerUser = async (req, res) => {
  // res.send('register user')
  try {
    const user = await Users.create(req.body);
    res.status(201).json({
      success: true,
      user: { email: user.email, username: user.username },
    });
  } catch (error) {
    const errors = handleError(error);
    res.status(400).json(errors);
    // res.json(error);
  }
};

const loginUser = async (req, res) => {
  // res.send('login user')
  const { email, password } = req.body;
  try {
    const user = await Users.findOne({ email });
    if (!user) {
      throw Error("no user");
    }
    const isCorrect = await bcrypt.compare(password, user.password);
    if (!isCorrect) {
      throw Error("invalid");
    }
    // generate token
    const token = JWT.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.status(200).json({
      success: true,
      user: { email: user.email, username: user.username },
      token,
    });
  } catch (error) {
    const errors = handleError(error);
    res.status(400).json(errors);
    // res.json(error);
  }
};

module.exports = { registerUser, loginUser };
