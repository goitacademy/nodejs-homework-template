import express from "express";
import authController from "../../controllers/auth-controller.js";
import {
  authenticate,
  isEmptyBody,
  isValidId,
} from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";
import {
  userLoginSchema,
  userRegisterSchema,
  userSubscriptionUpdate,
} from "../../models/User.js";

const userRegisterValidate = validateBody(userRegisterSchema);
const userLoginValidate = validateBody(userLoginSchema);
const userSubscriptionUpdateValidate = validateBody(userSubscriptionUpdate);

const router = express.Router();

router.post(
  "/register",
  isEmptyBody,
  userRegisterValidate,
  authController.register
);

router.post("/login", isEmptyBody, userLoginValidate, authController.login);

router.get("/current", authenticate, authController.getCurrent);

router.post("/logout", authenticate, authController.logout);

router.patch(
  "/:userId",
  authenticate,
  isValidId,
  userSubscriptionUpdateValidate,
  authController.updateUserSubscription
);

export default router;
