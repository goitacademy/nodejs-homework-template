import express from 'express';
import { userMiddleware } from '../middlewares/user.js';

const router = express.Router();

router.get('/', userMiddleware, (req, res, next) => {
  res.json(req.user);
});

export default router;
