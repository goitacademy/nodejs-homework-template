const express = require("express");

const ctrl = require("../../Controllers/auth");

const router = express.Router();

const { ValidBody, authenticate } = require("../../middleWars");

const { schemas } = require("../../models/user");

router.post("/register", ValidBody(schemas.registerSchema), ctrl.register);

router.post("/login", ValidBody(schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.current);

router.post("/logout", authenticate, ctrl.logout);

// router.patch('/update', authenticate, ctrlWraper.update);

module.exports = router;
