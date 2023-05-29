const express = require("express");
const router = express.Router();
const jsonParser = express.json();
const { userController } = require("../controllers");

router.post("/register", jsonParser, userController.register);
router.post("/login", jsonParser, userController.login);
// router.post("/logout");
// router.post("/current");

module.exports = router;
