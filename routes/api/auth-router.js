import express from "express";

import authController from "../../controllers/auth-controller.js";
import { validateBody } from "../../decorators/index.js";
import { isEmptyBody } from "../../middlewares/index.js";
import { userSignupSchema, userSigninSchema} from "../../models/User.js";

const authRouter = express.Router();

authRouter.post("/signup", isEmptyBody, validateBody(userSignupSchema), authController.signup);

authRouter.post("/signin", isEmptyBody, validateBody(userSigninSchema), authController.signin);

export default authRouter;
