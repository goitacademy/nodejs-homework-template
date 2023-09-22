import { Router } from "express";
import {
  signUpHandler,
  loginHandler,
  logoutHandler,
  currentHandler,
} from "../controllers/users.controller.js";

import authMiddleware from "../middleware/authenticateToken.js";

const userRouter = Router();

userRouter.post("/signup", signUpHandler);
userRouter.post("/login", loginHandler);
userRouter.get("/logout", authMiddleware, logoutHandler);
userRouter.get("/current", authMiddleware, currentHandler);

export { userRouter };
