const express = require("express");

const { auth, upload, ctrlWrapper, validation } = require("../../middlewares");
const { users: ctrl } = require("../../controllers");
const { joiSubscribtionSchema } = require("../../models");

const router = express.Router();

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));
router.patch(
  "/",
  auth,
  validation(joiSubscribtionSchema),
  ctrlWrapper(ctrl.updateSubscribtion)
);
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);
router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));

module.exports = router;
