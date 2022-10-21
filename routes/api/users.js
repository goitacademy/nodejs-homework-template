const express = require("express");
const router = express.Router();
const upload = require("../../middlewares/upload");

const {
  register,
  login,
  logout,
  getCurrent,
  patchUser,
  patchAvatar,
} = require("../../controllers/users");

const authenticate = require("../../middlewares/authenticate");

router.post("/register", register);

router.post("/login", login);

router.post("/logout", authenticate, logout);

router.get("/current", authenticate, getCurrent);

router.patch("/", authenticate, patchUser);

router.patch("/avatars", authenticate, upload.single("avatar"), patchAvatar);

module.exports = router;
