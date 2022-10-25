const express = require("express");
const {
  validateBody,
  authenticate,
  upload,
  resize,
} = require("../../middlewares");
const { ctrlWrapper } = require("../../helpers");
const ctrl = require("../../controllers/auth");
const { schemas } = require("../../models/user");

const router = express.Router();

router.post(
  "/signup",
  validateBody(schemas.signupSchema),
  ctrlWrapper(ctrl.signup)
);
router.post(
  "/login",
  validateBody(schemas.loginSchema),
  ctrlWrapper(ctrl.login)
);
router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));
router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));
router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  resize,
  ctrlWrapper(ctrl.updateAvatar)
);
module.exports = router;
