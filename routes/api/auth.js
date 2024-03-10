const express = require("express");

const router = express.Router();

const { validation, authenticate } = require("../../middlewares");
const { loginSchema } = require("../../schemas");
const { auth } = require("../../controllers");

router.post("/register", validation(loginSchema), auth.register);

router.post("/login", validation(loginSchema), auth.login);

router.get("/current", authenticate, auth.current);

router.post("/logout", authenticate, auth.logout);

router.patch("/", authenticate, auth.updSubscription);

module.exports = router;
