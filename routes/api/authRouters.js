const express = require("express");
const {
  registerController,
  loginController,
  getCurrent,
  logout,
} = require("../../controller/authController");
const { auth } = require("../../middleware/authMiddleware");
const router = express.Router();
router.post("/signup", registerController);
router.post("/login", loginController);
router.get("/current", auth, getCurrent);
router.get("/logout", auth, logout);
module.exports = router;
