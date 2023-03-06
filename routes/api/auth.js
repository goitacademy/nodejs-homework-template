const express = require("express");
const router = express.Router();
const {
  registrationController,
  loginController,
  logoutController
} = require("../../controllers/Auth/AuthController");




router.post("/signup", registrationController);
router.post("/login", loginController);
router.get("/logout", logoutController);


module.exports = router;