const express = require('express');
const router = express.Router();

const { signUp, login, logout } = require('../controllers/authController');


router.post('/signup', signUp);
router.post('/login', login);
router.delete('/logout', logout);
// router.route("/signup").post(signUp)

module.exports = router;
