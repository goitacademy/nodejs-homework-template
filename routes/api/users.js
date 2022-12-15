const express = require('express');
const auth = require('../../middlewares/auth');
const { usersPostSchema, usersSubscSchema } = require('../../schemas');
const {
  signup,
  login,
  logout,
  current,
  subscription,
} = require('../../controller/users');

const router = express.Router();

router.post('/signup', usersPostSchema, signup);
router.post('/login', usersPostSchema, login);
router.get('/logout', auth, logout);
router.get('/current', auth, current);
router.patch('/', auth, usersSubscSchema, subscription);

module.exports = router;
