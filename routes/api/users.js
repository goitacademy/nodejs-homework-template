const express = require("express");

const { auth, validation, upload, ctrlWrapper } = require("../../middlewares");
const { users: ctrl } = require("../../controllers");
const { joiSubscriptionSchema } = require("../../models/user");

const router = express.Router();

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));
router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verify));
router.patch(
  "/",
  auth,
  validation(joiSubscriptionSchema),
  ctrlWrapper(ctrl.updateSubscription)
);
router.patch("/avatars", auth, upload.single('avatar'), ctrlWrapper(ctrl.updateAvatar));
module.exports = router;
