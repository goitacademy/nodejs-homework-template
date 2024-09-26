const express = require("express");

const ctrl = require("../../controlers");

const {
  validateBody,
  authenticate,
  isValidsSbscription,
  upload,
} = require("../../middlewares");

const { schemasUser } = require("../../models");

const router = express.Router();

router.post(
  "/register",
  validateBody(schemasUser.registerSchema),
  ctrl.register
);

router.post("/login", validateBody(schemasUser.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrentUser);

router.post("/logout", authenticate, ctrl.logout);

router.patch("/", authenticate, isValidsSbscription, ctrl.updateUser);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = router;
