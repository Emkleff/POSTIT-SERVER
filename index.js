require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
const fileUpload = require("express-fileupload");
const PORT = process.env.PORT || 8000;
const authRouter = require("./Routes/authRouter");
const storyRouter = require("./Routes/storyRouter");
const auth = require("./middlewares/authentication");

// cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
//MiddleWares
app.use(fileUpload({ useTempFiles: true }));
app.use(express.json());
app.use(cors());
//routes
app.use("/api", authRouter);
app.use("/api", auth, storyRouter);
// error routes
app.use((req, res) => {
  res.status(404).json({ message: "Resource not found" });
});

// db connection

const startserver = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { dbName: "POSTITDB" });
    app.listen(PORT, () => {
      console.log(`server running on port : ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startserver();
