const express = require("express");

const ctrl = require("../../controllers/auth");

const { ctrlWrapper } = require("../../helpers");
const {
  validateBody,
  authenticate,
  resizeAvatar,
  upload,
} = require("../../middlewars");

const {
  userRegisterSchema,
  userLoginSchema,
  userEmailSchema,
} = require("../../schemas/users");

const router = express.Router();

// singup
router.post(
  "/registration",
  validateBody(userRegisterSchema),
  ctrlWrapper(ctrl.registration)
);
router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verify));

router.post("/verify", validateBody(userEmailSchema), ctrlWrapper(ctrl.resendVerifyEmail));

// singin
router.post("/login", validateBody(userLoginSchema), ctrlWrapper(ctrl.login));
router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));
router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));
router.patch(
  "/avatars",
  authenticate,
  resizeAvatar,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
