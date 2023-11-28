const express = require("express");

const {
  registerAuthController,
  loginAuthController,
  logoutAuthController,
  currentAuthController,
} = require("../../controllers/authController");

const auth = require("../../middlewares/auth");

const router = express.Router();
const jsonParser = express.json();

router.post("/register", jsonParser, registerAuthController);
router.post("/login", jsonParser, loginAuthController);
router.get("/logout", auth, logoutAuthController);
router.get("/current", auth, currentAuthController);

module.exports = { authRouter: router };
