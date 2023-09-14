const express = require("express");
const ctrl = require("../../controllers/auth");
const validateBody = require("../../middlewares/validateBody");
const { registerSchema, loginSchema } = require("../../models/user");
const authenticate = require("../../middlewares/authenticate");

const router = express.Router();

router.post("/register", validateBody(registerSchema), ctrl.register);
router.post("/login", validateBody(loginSchema), ctrl.login);
router.get("/current", authenticate, ctrl.getCurrent);
router.post("/logout", authenticate, ctrl.logout);

module.exports = router;
