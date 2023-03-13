const express = require("express");
const router = express.Router();
const { validateBody, authenticate } = require("../../midlewares");
const { schemas } = require("../../models/users");
const ctrl = require("../../controllers/auth");

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.post("/logout", authenticate, ctrl.logout);

router.get("/current", authenticate, ctrl.getCurrent);

module.exports = router;
