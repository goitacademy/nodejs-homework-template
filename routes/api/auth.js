const express = require("express");

const ctrl = require("../../controllers/auth");

const { validateBody, authenticate } = require("../../middlewares");

const { registerSchemaJoi, loginSchemaJoi } = "../../models/user";

const router = express.Router();

router.post("/register", validateBody(registerSchemaJoi), ctrl.register);

router.post("/login", validateBody(loginSchemaJoi), ctrl.login);

router.post("/logout", authenticate, ctrl.logout);

module.exports = router;
