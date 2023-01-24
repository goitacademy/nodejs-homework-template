const express = require("express");

const { users: ctrl } = require("../../controllers");

const {
  validation,
  ctrlWrapper,
  authenticate,
  upload,
} = require("../../middlewares");

const { joiSingupSchema, joiLoginSchema } = require("../../models/user");

const router = express.Router();

router.post("/signup", validation(joiSingupSchema), ctrlWrapper(ctrl.singup));

router.post("/login", validation(joiLoginSchema), ctrlWrapper(ctrl.login));

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));

router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
