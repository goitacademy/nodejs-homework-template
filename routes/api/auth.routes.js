const express = require("express");
const router = express.Router();
const authController = require("../../controllers/auth.controller");
const auth = require("../../middlewares/auth");

router.post("/login", authController.login);
router.post("/register", authController.register);
router.get("/current", auth, authController.current);
router.post("/logout", auth, authController.logout);

module.exports = router;
