const express = require("express");
const router = express.Router();
const authController = require("../../controller/auth/users");

const { validateAuth } = require("../../middlewares/validation");
const authenticate = require("../../middlewares/authenticate");

router.post("/register", validateAuth, authController.register);
router.post("/login", validateAuth, authController.login);
router.get("/logout", authenticate, authController.logout);
router.get("/current", authenticate, authController.currentUser);

module.exports = router;
