const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
  updateAvatar,
} = require("../../controllers/authCtrl");
const { upload, authenticate } = require("../../middlewares");

router.post("/register", register);

router.post("/login", login);

router.get("/current", authenticate, getCurrent);

router.patch("/", authenticate, updateSubscription);

router.post("/logout", authenticate, logout);

router.patch("/avatars", authenticate, upload.single("avatar"), updateAvatar);

module.exports = router;
