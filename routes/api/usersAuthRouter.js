const express = require('express');
const router = express.Router();

const {
  signupValidation,
  loginValidation,
  checkAuth,
  updateSubscriptionValidation,
} = require('../../middlewares/index');

const {
  userRegistration,
  userLogin,
  currentUser,
  userLogout,
  updateSubscription,
} = require('../../controllers/usersController');

router.post('/signup', signupValidation, userRegistration);
router.post('/login', loginValidation, userLogin);

router.get('/current', checkAuth, currentUser);
router.get('/logout', checkAuth, userLogout);

router.patch('/', checkAuth, updateSubscriptionValidation, updateSubscription);

module.exports = router;
