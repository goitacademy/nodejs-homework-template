const express = require("express");
const { validateBody, authenticate } = require("../../middlewares");
const { authSchema, loginSchema } = require("../../models/users");

const ctrl = require("../../controllers/auth");

const router = express.Router();

router.post("/register", validateBody(authSchema), ctrl.register);

router.post("/login", validateBody(loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

module.exports = router;
