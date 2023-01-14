const express = require("express");
const { userController } = require("../../controllers");

const router = express.Router();

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.post("/current", userController.current);

module.exports = router;
