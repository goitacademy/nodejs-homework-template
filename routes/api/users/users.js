// routes/api/users/users.js
import express from 'express';

import { authenticateToken } from '../../../middleware/authenticateToken.js';

import { login } from '../../../controllers/users/loginUsersController.js';
import { signup } from '../../../controllers/users/registerUsersController.js';
import { logout } from '../../../controllers/users/logoutUserController.js';
import { getCurrentUser } from '../../../controllers/users/getCurrentUserController.js';
import { uploadAvatar } from '../../../config.js';

const router = express.Router();

router.post("/api/users/login", login);
router.post("/api/users/signup", uploadAvatar.single('avatar'), signup);
router.get("/api/users/logout", authenticateToken, logout);
router.get('/api/users/current', authenticateToken, getCurrentUser);
router.patch('/avatars', authenticateToken, uploadAvatar.single('avatar'), (req, res) => {
    return res.status(200).json({ message: 'Avatar successfully uploaded' });
  });

export default router ;