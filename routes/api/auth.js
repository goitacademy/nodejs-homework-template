const express = require("express");
const authRouter = express.Router();
const validateBody = require("../../middlewares/validateBody");
const {
  userModel: { userJoiSchemas },
} = require("../../models");
const { authCtrl } = require("../../controllers");
const authenticate = require("../../middlewares/authenticate");
const upload = require("../../middlewares/upload");

authRouter.post(
  "/register",
  validateBody(userJoiSchemas.registrationSchema),
  authCtrl.registerUser
);

authRouter.post(
  "/login",
  validateBody(userJoiSchemas.loginSchema),
  authCtrl.loginUser
);

authRouter.get("/current", authenticate, authCtrl.getCurrentUser);

authRouter.post("/logout", authenticate, authCtrl.logoutUser);

authRouter.patch(
  "/user",
  authenticate,
  validateBody(userJoiSchemas.subscriptionSchema),
  authCtrl.updateUserSubscription
);

authRouter.patch(
  "/user/avatar",
  authenticate,
  upload.single("avatar"),
  authCtrl.updateAvatar
);

module.exports = authRouter;
