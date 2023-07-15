const express = require("express");
const router = express.Router();

const {
  register,
  login,
  current,
  logout,
} = require("../../controllers/userControllers");
const { authenticate } = require("../../middlewares");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/current").get(authenticate, current);
router.route("/logout").post(authenticate, logout);

module.exports = router;
