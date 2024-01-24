import { Router } from "express";
import "../../auth/services/auth.strategy.js";
import auth from "../../auth/middlewares/auth.js";
import { updateUser } from "../controllers/update.js";

const router = Router();

router.patch("/", auth, updateUser);

export default router;
