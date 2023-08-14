const express = require("express");

const { register } = require("../../controllers/auth");
const { login } = require("../../controllers/auth");
const { logout } = require("../../controllers/auth");
const { getCurrent } = require("../../controllers/auth");
const { updateUserSubscription } = require("../../controllers/auth");
const { updateAvatar } = require("../../controllers/auth");

const router = express.Router();

const schemas = require("../../schemas/users");

const { validateBody } = require("../../decorators");

const { authenticate, upload } = require("../../middlewares");

router.post("/register", validateBody(schemas.userRegisterSchema), register);

router.post("/login", validateBody(schemas.userLoginSchema), login);

router.post("/logout", authenticate, logout);

router.get("/current", authenticate, getCurrent);

router.patch(
  "/",
  authenticate,
  validateBody(schemas.userSubscriptionSchema),
  updateUserSubscription
);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatarURL"),
  updateAvatar
);

module.exports = router;
