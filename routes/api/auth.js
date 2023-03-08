const express = require("express");
const router = express.Router();
const {
  registrationController,
  loginController,
  logoutController,currentUserController,
} = require("../../controllers/Auth/AuthController");

const {authMiddleware} = require('../../middlewares/authMiddleware')




router.post("/signup", registrationController);
router.post("/login", loginController);
router.get("/logout", authMiddleware, logoutController);
router.get("/current", authMiddleware, currentUserController);



module.exports = router;