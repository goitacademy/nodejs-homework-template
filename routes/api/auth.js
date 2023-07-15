const express = require("express");

const { validateBody, authenticate, upload } = require("../../middlewares");
const { registerSchema, loginSchema } = require("../../schemas/users");
const {
  register,
  login,
  getCurrent,
  logout,
  updeteAvatar,
} = require("../../controllers/users");

const router = express.Router();

router.post("/register", validateBody(registerSchema), register);

router.post("/login", validateBody(loginSchema), login);

router.get("/current", authenticate, getCurrent);

router.post("/logout", authenticate, logout);

router.patch("/avatars", authenticate, upload.single("avatar"), updeteAvatar);

module.exports = router;