const express = require("express");

const {ctrlA} = require("../../controllers");

const { validateBody } = require("../../utils");

const authenticate = require("../../middlewares");

const { schemas } = require("../../models/user");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrlA.register);

router.post("/login", validateBody(schemas.loginSchema), ctrlA.login);

router.get("/current", authenticate, ctrlA.getCurrent);

router.post("/logout", authenticate, ctrlA.logout);

module.exports = router;
