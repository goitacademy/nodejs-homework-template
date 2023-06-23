const express = require("express");
const ctrl = require("../../controllers/auth");

const validateBody = require("../../middleWares/validateBody");
const { schemas } = require("../../models/users");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

module.exports = router;
