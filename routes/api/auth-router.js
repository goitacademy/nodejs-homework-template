import express from "express";
import authController from "../../controllers/auth-controler.js";
import { isEmptyBody } from "../../middlewares/index.js";

const authRouter = express.Router();

authRouter.post("/register", isEmptyBody, authController.signup);
authRouter.post("/login", isEmptyBody, authController.signin);

export default authRouter;
