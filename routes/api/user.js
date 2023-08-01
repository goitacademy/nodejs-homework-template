import express from "express";
import { userController } from "../../controllers/index.js";

const authRouter = express.Router();

authRouter.post('/signup', userController.signup);

authRouter.post('/login', userController.login);

export default authRouter;