const express = require("express");

const { validateBody, authenticate, upload } = require("../../middlewars/index.js");
const { schemas } = require("../../models/user.js");
const { register, login, logout, getCurrent, updateAvatar } = require("../../controllers");
const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), register);

router.post("/login", validateBody(schemas.loginSchema), login);

router.get("/current", authenticate, getCurrent);

router.post("/logout", authenticate, logout);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),

  updateAvatar
);

module.exports = router;
