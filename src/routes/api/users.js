const express = require("express");
const {
  createUserValidation,
  loginUserValidation,
} = require("../../middlewares/validateMiddlewar");
const { authMiddlewar } = require("../../middlewares/authMiddlewar");
const {
  signup,
  login,
  logout,
  getCurrentUser,
} = require("../../services/usersService");

const router = express.Router();

router.post("/signup", createUserValidation, signup);
router.get("/login", loginUserValidation, login);
router.get("/logout", authMiddlewar, logout);
router.get("/current", authMiddlewar, getCurrentUser);

module.exports = router;
