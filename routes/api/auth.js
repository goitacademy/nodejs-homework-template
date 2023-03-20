const express = require("express");

const ctrl = require("../../controllers/auth");

const { validatebody, authenticate } = require("../../middlewares");

const { registerSchemaJoi, loginSchemaJoi } = "../api/auth";

const router = express.Router();

router.post("/register", validatebody(registerSchemaJoi), ctrl.register);

router.post("/login", validatebody(loginSchemaJoi), ctrl.login);

router.post("/logout", authenticate, ctrl.logout);

module.exports = router;
