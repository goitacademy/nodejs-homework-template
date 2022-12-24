import express, { Router } from 'express';
import {
    register,
    login,
    logout,
    getCurrentUser,
    updateStatus,
} from "../../controllers/usersControllers.js";
import userMiddleware from '../../middlewares/userMiddleware.js';
import updStatusMiddleware from '../../middlewares/updStatusMiddleware.js';
import authMiddleware from '../../middlewares/authMiddleware.js';

const router = Router();

router.post('/register', userMiddleware, register);
router.post('/login', userMiddleware, login);

router.use(authMiddleware);
router.post('/logout', logout);
router.get('/current', getCurrentUser);
router.patch('/', updStatusMiddleware, updateStatus);

export default router;