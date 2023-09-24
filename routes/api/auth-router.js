import express from "express";
// ?????
import { validationUser } from "../../middleware/validation/index.js";
import { controllerAuth } from "../../controllers/index.js";
import { authenticate, upload } from "../../middleware/index.js";

const authRouter = express.Router();

authRouter.post(
  "/signup",
  upload.single("avatar"),
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

authRouter.patch(
  "/:userId/avatar",
  upload.single("avatar"),
  validationUser.userAvatarValidate,
  authenticate,
  controllerAuth.updateAvatar
);

export default authRouter;
