const express = require('express');

const { validateBody, authenticate } = require("../../meddlewares");

const router = express.Router();
const { schemas } = require("../../models/user.js")
const ctrl = require("../../controllers/auth")

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout)
module.exports = router;