const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/authConrollers");

const validation = require("../../middlewares/validationAuth");

const authenticate = require("../../middlewares/authorization");

const { authSchemas } = require("../../models/userModel");

router.post("/register", validation(authSchemas.registerSchema), ctrl.register);
router.post("/login", validation(authSchemas.loginSchema), ctrl.login);
router.get("/current", authenticate, ctrl.getCurrent);
router.post("/logout", authenticate, ctrl.logout);

module.exports = router;
