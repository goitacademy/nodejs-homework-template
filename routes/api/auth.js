const express = require("express");
const { validationBody, authenticate } = require("../../middlewares");
const { register, login, currentUser } = require("../../api/contacts/auth");

const { schemas } = require("../../models/user");

const router = express.Router();

router.post("/register", validationBody(schemas.registerSchema), register);
router.get("/login", validationBody(schemas.loginSchema), login);
router.get("/current", authenticate, currentUser);

module.exports = router;
