const express = require('express');
const router = express.Router();

const {
  loginController,
  signupController,
  logoutController,
  currentController,
} = require('../../controllers/usersController');
const authMiddleware = require('../../middlewares/authMiddleware');

router.use(authMiddleware);

router.post('/signup', signupController);
router.post('/login', loginController);
router.get('/logout', logoutController);
router.get('/get', currentController);

module.exports = router;
