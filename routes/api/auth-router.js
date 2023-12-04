import express from "express";
import authController from "../../controllers/auth-controller.js";
import isEmptyBody from "../../utils/middlewares/isEmptyBody.js";
import isValidId from "../../utils/middlewares/isValidId.js";
import {
  userRegisterSchema,
  userLoginSchema,
  userSubscriptionSchema,
} from "../../utils/validation/authValidationSchemas.js";
import { validateBody } from "../../utils/decorators/validateBody.js";
import authenticate from "../../utils/middlewares/authenticate.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  isEmptyBody,
  validateBody(userRegisterSchema),
  authController.register
);

authRouter.post(
  "/login",
  isEmptyBody,
  validateBody(userLoginSchema),
  authController.login
);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/logout", authenticate, authController.logout);

authRouter.patch(
  "/subscription",
  authenticate,
  isEmptyBody,
  validateBody(userSubscriptionSchema),
  authController.subscription
);

export default authRouter;
