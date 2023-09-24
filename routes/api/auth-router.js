import express from "express";
// ?????
import { validationUser } from "../../middleware/validation/index.js";
import { controllerAuth } from "../../controllers/index.js";
import { authenticate } from "../../middleware/index.js";

const authRouter = express.Router();

authRouter.post(
  "/signup",
  validationUser.userSignUPtValidate,
  controllerAuth.signup
);

authRouter.post(
  "/signin",
  validationUser.userSignINValidate,
  controllerAuth.signin
);

authRouter.get("/current", authenticate, controllerAuth.getCurrent);

authRouter.post(
  "/refresh",
  validationUser.userRefreshValidate,
  controllerAuth.refresh
);

authRouter.post("/signout", authenticate, controllerAuth.signout);

authRouter.patch(
  "/:userId/subscription",
  validationUser.userSubscriptionValidate,
  authenticate,
  controllerAuth.updateSubscription
);

export default authRouter;
