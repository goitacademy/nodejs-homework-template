const express = require("express");
const { users: ctrl } = require("../../controllers");
const { validation, ctrlWrapper, auth, upload } = require("../../middlewars");
const { joiSchema, emailJoiSchema } = require("../../models/user");

const router = express.Router();

router.post("/signup", validation(joiSchema), ctrlWrapper(ctrl.signUp));

router.post("/login", validation(joiSchema), ctrlWrapper(ctrl.login));

router.get("/logout", auth, ctrlWrapper(ctrl.logout));

router.get("/current", auth, ctrlWrapper(ctrl.currentUser));

router.get("/verify/:verifycationToken", ctrlWrapper(ctrl.verification));

router.post(
  "/verify",
  validation(emailJoiSchema),
  ctrlWrapper(ctrl.reVerification)
);

router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
