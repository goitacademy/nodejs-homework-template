const express = require("express");

const ctrl = require("../../controllers/auth");

const { ctrlWrapper } = require("../../helpers");

const { validationBody, authenticate, upload } = require("../../middlewares");

const { schemas } = require("../../models/user");

const router = express.Router();

router.post(
  "/register",
  validationBody(schemas.registerSchema),
  ctrlWrapper(ctrl.register)
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

router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));

router.get("/current", authenticate, ctrlWrapper(ctrl.current));

module.exports = router;
