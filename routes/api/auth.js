const express = require("express");
const router = express.Router();

const { auth, upload } = require("../../middlewares");

const {
  registerUser,
  login,
  getCurent,
  logout,
  patchAvatar,
} = require("../../controllers/users");

router.post("/signup", registerUser);

router.post("/login", login);

router.get("/logout", auth, logout);

router.get("/current", auth, getCurent);

router.patch("/avatar", auth, upload.single("avatar"), patchAvatar);

module.exports = router;
