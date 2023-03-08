const express = require("express");

const ctrl = require("../../controlers/auth");

const validateBody = require("../../middlewares/validateBody");

const { schemas } = require("../../models/user");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

module.exports = router;
