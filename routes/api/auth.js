const express = require("express");

const auth = require("../../controllers/auth");

const { authenticate } = require("../../middleVares");

const router = express.Router();

router.post("/register", auth.register);

router.post("/login", auth.login);

router.get("/current", authenticate, auth.getCurrentUser);

router.post("/logout", authenticate, auth.logOut);

module.exports = router;
