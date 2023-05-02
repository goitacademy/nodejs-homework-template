const express = require("express");

const { auth: ctrl } = require("../../controllers");
const { validateBody } = require("../../utils");
const { userJoiSchema } = require("../../models");
const { authenticate, upload } = require("../../middlewares");

const authRouter = express.Router();

authRouter.post("/register", validateBody(userJoiSchema), ctrl.register);

authRouter.post("/login", validateBody(userJoiSchema), ctrl.login);

authRouter.get("/current", authenticate, ctrl.getCurrent);

authRouter.post("/logout", authenticate, ctrl.logout);

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);
module.exports = authRouter;
