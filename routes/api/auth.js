const express = require("express");
const router = express.Router();
const {
  registrationController,
  loginController,
} = require("../../controllers/Auth/AuthController");


router.post("/signup", registrationController);
router.post("/login", loginController);


module.exports = router;