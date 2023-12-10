import express from "express";

import authController from "../../controllers/auth-controller.js";
import { validateBody } from "../../decorators/index.js";
import { authenticate, isEmptyBody, upload } from "../../middlewares/index.js";
import { userSignupSchema, userSigninSchema} from "../../models/User.js";

const authRouter = express.Router();
//register
authRouter.post("/signup", isEmptyBody, validateBody(userSignupSchema), authController.signup);
//login
authRouter.post("/signin", isEmptyBody, validateBody(userSigninSchema), authController.signin);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.patch("/avatars", upload.single("avatarURL"), authenticate, authController.avatars);

//logout
authRouter.post("/signout", authenticate, authController.signout);

export default authRouter;
