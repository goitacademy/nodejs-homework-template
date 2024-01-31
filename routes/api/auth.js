const express = require("express");
const { validateBody, authenticate } = require("../../middlewares");
const ctrl = require("../../controllers/auth");

const { schemas } = require("../../models/users");
const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);
router.post("/logout", authenticate, ctrl.logout);
router.post("/current", authenticate, ctrl.getCurrent);

module.exports = router;
