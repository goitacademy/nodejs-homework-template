// routes/api/users/users.js
import express from 'express';

import { authenticateToken } from '../../../middleware/authenticateToken.js';

import { login } from '../../../controllers/users/loginUsersController.js';
import { signup } from '../../../controllers/users/registerUsersController.js';
import { logout } from '../../../controllers/users/logoutUserController.js';
import { getCurrentUser } from '../../../controllers/users/getCurrentUserController.js';
import { uploadAvatar } from '../../../uploadImage.js';
import { verifyUser } from '../../../controllers/users/verifyUserController.js';
import { verifyEmail } from '../../../controllers/users/verifyEmailController.js';;

const router = express.Router();

router.post("/api/users/login", login);
router.post("/api/users/signup", uploadAvatar.single('avatar'), signup);
router.get("/api/users/logout", authenticateToken, logout);
router.get('/api/users/current', authenticateToken, getCurrentUser);
router.patch('/api/users/avatars', authenticateToken, uploadAvatar.single('avatar'), (req, res) => {
  return res.status(200).json({ message: 'Avatar successfully uploaded' });
});
  router.post('/api/users/verify', verifyUser);
  router.get("/auth/verify/:verificationToken", verifyEmail);

export default router ;