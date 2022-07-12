const express = require("express");
const router = express.Router();
const { authenticate, upload } = require("../../helpers");

const {
  signup,
  login,
  getCurrent,
  logout,
  updateAvatar,
} = require("../../controllers");

router.post("/users/signup", signup);

router.post("/users/login", login);

router.get("/users/current", authenticate, getCurrent);

router.post("/users/logout", authenticate, logout);

router.patch(
  "/users/avatars",
  authenticate,
  upload.single("avatar"),
  updateAvatar
);

module.exports = router;
