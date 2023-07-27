const { Router } = require('express');

const {
  signup,
  login,
  logout,
  getCurrentUser,
} = require('../../controllers/auth');
const { checkSignupUserData } = require('../../middlewares/auth');

const router = Router();

// signup - register new user
router.post('/signup', checkSignupUserData, signup);

// login - login user - authentification
router.post('/login', login);

// logout - logout current user
router.get('/logout', logout);

// current - get current user
router.get('/current', getCurrentUser);

module.exports = router;
