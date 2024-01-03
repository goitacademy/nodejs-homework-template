import express from "express";
import userController from "../../controllers/user-controller.js";

import { authenticate, isEmptyBody } from "../../middlewares/index.js";

const userRouter = express.Router();

userRouter.post("/register", isEmptyBody, userController.register);
userRouter.post("/login", isEmptyBody, userController.login);
userRouter.get("/current", authenticate, userController.getCurrent);
userRouter.post("/logout", authenticate, userController.logout);

export default userRouter;
