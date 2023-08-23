const express = require("express");

const ctrl = require('../../controllers/auth')

const { validateBody } = require("../../middlewares");

const { registerLoginSchema } = require("../../models/user");

const router = express.Router();

router.post("/register", validateBody(registerLoginSchema), ctrl.register);

router.post("/login", validateBody(registerLoginSchema), ctrl.login);

module.exports = router;
