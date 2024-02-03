import { Router } from "express";

import authRouter from '../../controllers/users/authRouter.js'
import listRouter from "../../controllers/users/listRouter.js";
import authMiddleware from "../../middlewares/jwt.js"

const router = Router();

router.use("/auth", authRouter);
router.use("/list", authMiddleware, listRouter);

export default router;
