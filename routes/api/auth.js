const express = require("express");
const router = express.Router();

const { register, login } = require("../../controllers/userControllers");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout");

module.exports = router;
