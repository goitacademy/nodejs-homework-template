import { Router } from "express";
import {
  signUpHandler,
  loginHandler,
  logoutHandler,
  currentHandler,
} from "../controllers/users.controller.js";

import authMiddleware from "../middleware/authenticateToken.js";

const userRouter = Router();

userRouter.post("/users/signup", signUpHandler);
userRouter.post("/users/login", loginHandler);
userRouter.get("/users/logout", authMiddleware, logoutHandler);
userRouter.get("/users/current", authMiddleware, currentHandler);

export { userRouter };
