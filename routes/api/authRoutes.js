const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/authConrollers");

const validation = require("../../middlewares/contactsValidation");

const { authSchemas } = require("../../models/userModel");

router.post("/register", validation(authSchemas.registerSchema), ctrl.register);
router.post("/login", validation(authSchemas.loginSchema), ctrl.login);

module.exports = router;
