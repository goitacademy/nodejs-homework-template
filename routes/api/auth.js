const express = require("express");
const router = express.Router();

const {
  register,
  login,
  current,
  logout,
} = require("../../controllers/userControllers");
const { authenticate } = require("../../middlewares");
const { userValidate } = require("../../middlewares/userValidate");

router.route("/register").post(userValidate, register);
router.route("/login").post(userValidate, login);
router.route("/current").get(authenticate, current);
router.route("/logout").post(authenticate, logout);

module.exports = router;
