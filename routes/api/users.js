// usersRouter.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/auth');
const {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
} = require('../../controllers/authControllers');

// Описуйте маршрути з використанням контролерів
router.post('/register', registerUser);
router.post('/login', loginUser);
router.use(authMiddleware);
router.get('/logout', logoutUser);
router.get('/current', getCurrentUser);

module.exports = router;