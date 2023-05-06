const express = require("express");

const router = express.Router();

const cntrl = require("../../controllers/auth");
const { validateBody, authenticate, upload } = require("../../middlewares");

const {
  validationRegistrationUser,
  validationLoginUser,
  validationSubscription,
} = require("../../models");

router.post(
  "/register",
  validateBody(validationRegistrationUser),
  cntrl.register
);

router.post("/login", validateBody(validationLoginUser), cntrl.login);

router.get("/current", authenticate, cntrl.getCurrentUser);

router.post("/logout", authenticate, cntrl.logout);

router.patch(
  "/",
  authenticate,
  validateBody(validationSubscription),
  cntrl.updateSubscription
);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  cntrl.updateAvatar
);

module.exports = router;
