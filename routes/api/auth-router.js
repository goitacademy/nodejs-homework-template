import express from "express";
import { validateBody } from "../../decorators/index.js";
import usersSchemas from "../../schemes/index.js";
import authControllers from "../../controllers/auth-controllers.js";
import { authenticate, upload } from "../../middlewars/index.js";

const authRouter = express.Router();

authRouter.post(
  "/signup",
  validateBody(usersSchemas.userSignupSchema),
  authControllers.signup
);

authRouter.post(
  "/signin",
  validateBody(usersSchemas.userSigninSchema),
  authControllers.signin
);

authRouter.post("/current", authenticate, authControllers.getCurrent);

authRouter.post("/signout", authenticate, authControllers.signout);

authRouter.patch("/", authenticate, authControllers.updateSubscription);

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  authControllers.updateAvatar
);

export default authRouter;
