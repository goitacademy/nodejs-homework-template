import express from 'express';

import { authenticateToken } from '../../../middleware/authenticateToken.js';

import { login } from '../../../controllers/users/loginUsersController.js';
import { signup } from '../../../controllers/users/registerUsersController.js';
import { logout } from '../../../controllers/users/logoutUserController.js';
import { getCurrentUser } from '../../../controllers/users/getCurrentUserController.js';

const router = express.Router();

router.post("/api/users/login", login);
router.post("/api/users/signup", signup);
router.get("/api/users/logout", authenticateToken, logout);
router.get('/api/users/current', authenticateToken, getCurrentUser);

export default router ;