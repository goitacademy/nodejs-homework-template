const express = require("express");

const ctrl = require("../../controllers/auth");

const router = express.Router();

const { validateBody, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/user");

//  signup

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

// sign in
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

module.exports = router;
