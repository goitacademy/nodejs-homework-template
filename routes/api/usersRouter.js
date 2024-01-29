import express from 'express';
const router = express.Router();
import {
  signUp,
  login,
  logout,
  getCurrentUser,
} from '../../controllers/usersController.js';
import authMiddleware from '../../middlewares/authMiddleware.js';

router.post('/signup', signUp);
router.post('/login', login);
router.post('/logout', authMiddleware, logout);
router.get('/current', authMiddleware, getCurrentUser);

export default router;
