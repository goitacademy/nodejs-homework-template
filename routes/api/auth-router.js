import express from "express";
import userSchemas from "../../schemas/user-schemas.js";
import { validateBody, validateQuery } from "../../decorators/index.js";
import authControllers from "../../controllers/auth-controllers.js";
import { authenticate } from "../../middlewares/index.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(userSchemas.userSignupSchema),
  authControllers.register
);

authRouter.post(
  "/login",
  validateBody(userSchemas.userSigninSchema),
  authControllers.signin
);

authRouter.get("/current", authenticate, authControllers.getCurrent);

authRouter.post("/logout", authenticate, authControllers.logout);

authRouter.patch(
  "/",
  authenticate,
  validateQuery(userSchemas.userSubscriptionUpdateSchema),
  authControllers.updateUsersSubscription
);

export default authRouter;
