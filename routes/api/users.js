const express = require("express");
const { schemas } = require("../../models/user");
const { validateBody, authenticate } = require("../../middlewars");
const router = express.Router();
const ctrl = require("../../controllers/users");

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);
router.get("/current", authenticate, ctrl.getCurrentUser);
router.post("/logout", authenticate, ctrl.logout);

module.exports = router;