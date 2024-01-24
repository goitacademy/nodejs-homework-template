const express = require("express");

const ctrl = require("../../controllers/auth");

const { validateBody } = require("../../middlewares");

const { schema } = require("../../models/user");

const router = express.Router();
router.post("/register", validateBody(schema.registerSchema), ctrl.register);

router.post("/login", validateBody(schema.loginSchema), ctrl.login);

router.get("/logout", ctrl.logout);

// router.get("/current", authenticate, ctrl.getCurrent);
// router.post("/login", validateBody(schema.loginSchema), ctrl.login);

module.exports = router;
