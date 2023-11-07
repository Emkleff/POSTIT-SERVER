const router = require("express").Router();
const {
  registerUser,
  loginUser,
  getUser,
} = require("../controller/authController");

const auth = require("../middlewares/authentication");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user", auth, getUser);

module.exports = router;
