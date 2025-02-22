const express = require('express');
const authenticate = require('../../middlewares/auth');
const upload = require('../../middlewares/upload');
const {
  signup,
  login,
  logout,
  getCurrentUser,
  updateAvatar,
} = require('../../controllers/users');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', authenticate, logout);
router.get('/current', authenticate, getCurrentUser);
router.patch('/avatars', authenticate, upload.single('avatar'), updateAvatar);

module.exports = router;
