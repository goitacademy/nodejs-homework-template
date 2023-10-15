const express = require("express");
const router = express.Router();
const userController = require("../../controllers/user.controller");
const auth = require("../../middleware/auth");

router.post("/login", userController.login);
router.post("/signup", userController.signup);
router.get("/logout", auth, userController.logout);
router.get("/current", auth, userController.current);

module.exports = router;
