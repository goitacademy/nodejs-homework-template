const express = require("express");
const router = express.Router();

const { auth } = require("../../middlewares/auth");
const {
  registerUser,
  login,
  getCurent,
  logout,
} = require("../../controllers/users");

router.post("/signup", registerUser);

router.post("/login", login);

router.get("/logout", auth, logout);

router.get("/current", auth, getCurent);

module.exports = router;
