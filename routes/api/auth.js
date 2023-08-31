const express = require("express");
const { validationBody } = require("../../middlewares");
const { register, login } = require("../../api/contacts/auth");

const { schemas } = require("../../models/user");

const router = express.Router();

router.post("/register", validationBody(schemas.registerSchema), register);
router.get("/login", validationBody(schemas.loginSchema), login);

module.exports = router;
