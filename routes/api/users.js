const express = require('express');
const auth = require('../../middlewares/auth');
const upload = require('../../services/upload');
const { usersPostSchema, usersSubscSchema } = require('../../schemas');
const {
  signup,
  login,
  logout,
  current,
  subscription,
  avatars,
} = require('../../controller/users');

const router = express.Router();

router.post('/signup', usersPostSchema, signup);
router.post('/login', usersPostSchema, login);
router.get('/logout', auth, logout);
router.get('/current', auth, current);
router.patch('/', auth, usersSubscSchema, subscription);
router.patch('/avatars', auth, upload.single('avatars'), avatars);

module.exports = router;
