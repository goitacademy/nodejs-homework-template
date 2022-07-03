const express = require("express");

const {
  authWrapper,
  upload,
  validation,
  ctrlWrapper,
} = require("../../middlewares");
const { auth: ctrl } = require("../../controllers");
const { joiRegisterSchema, joiLoginSchema } = require("../../models/user.js");

const router = express.Router();

router.post(
  "/signup",
  validation(joiRegisterSchema),
  ctrlWrapper(ctrl.register)
);

router.post("/login", validation(joiLoginSchema), ctrlWrapper(ctrl.login));
router.get("/current", authWrapper, ctrlWrapper(ctrl.getCurrent));
router.get("/logout", authWrapper, ctrlWrapper(ctrl.logout));

router.patch(
  "/avatars",
  authWrapper,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));

module.exports = router;
