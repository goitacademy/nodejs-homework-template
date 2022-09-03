const express = require("express");
const router = express.Router();

const {
  signUpUser,
  loginUser,
  logOutUser,
  currentUser,
} = require("../../models/users");
const { userValidation } = require("../../middleware/validateMiddleware");
const { authMiddleware } = require("../../middleware/authMiddleware");

router.post("/signup", userValidation, signUpUser);
router.post("/login", userValidation, loginUser);
router.post("/logout", authMiddleware, logOutUser);
router.post("/current", authMiddleware, currentUser);

module.exports = router;
