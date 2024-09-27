const express = require("express");
const authController = require("../../controllers/auth");
const authenticate = require("../../middlewars/authenticate");
const router = express.Router();

router.post("/register", authController.register);

router.post("/login", authController.login);

router.get("/current", authenticate, authController.getCurrent);

router.post("/logout", authenticate, authController.logout);

module.exports = router;
