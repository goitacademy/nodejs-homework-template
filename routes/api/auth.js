const express = require("express");
const router = express.Router();
const { auth: controllers } = require("../../controllers");
const { auth } = require("../../middlewares");

router.post("/signup", controllers.signup);

router.post("/login", controllers.login);

router.post("/logout", auth, controllers.logout);

module.exports = router;
