const express = require("express");
const {
  register,
  login,
  logout,
  getCurrentUser,
  updateAvatar,
} = require("../../controllers/authController");
const authMiddleware = require("../../middlewares/auth");
const upload = require("../../middlewares/upload");

const router = express.Router();

router.post("/signup", register);

router.post("/login", login);

router.post("/logout", authMiddleware, logout);

router.get("/current", authMiddleware, getCurrentUser);

router.patch("/avatars", authMiddleware, upload.single("avatar"), updateAvatar);

module.exports = router;
