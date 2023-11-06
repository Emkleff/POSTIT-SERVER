const router = require('express').Router();
const { registerUser, loginUser } = require('../controller/authController');

router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
