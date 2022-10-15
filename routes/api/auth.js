const express = require("express");
const ctrl = require("../../controllers/auth");

const { ctrlWrapper } = require("../../helpers/");
const { validateBody, authenticate, upload } = require("../../middlewares");
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

router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));

router.post(
  "/avatar",
  upload.single("avatar"),
  authenticate,
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
