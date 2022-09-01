const express = require("express");
const { ctrlWrapper } = require("../../utils");
const ctrl = require("../../controllers/auth");
const { validationBody, authenticate, upload } = require("../../middlewares");
const { schemas } = require("../../models/user");

const router = express.Router();

router.post(
  "/signup",
  validationBody(schemas.signupSchema),
  ctrlWrapper(ctrl.signup)
);
router.post(
  "/login",
  validationBody(schemas.loginSchema),
  ctrlWrapper(ctrl.login)
);
router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);
router.get("/current", authenticate, ctrlWrapper(ctrl.currentUser));
router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));

module.exports = router;
