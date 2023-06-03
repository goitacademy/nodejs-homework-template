const express = require("express");

const ctrl = require("../../controllers/auth");

const { validateBody, autenticate } = require("../../middlewares");

const { shemas } = require("../../models/user");

const router = express.Router();

router.post("/register", validateBody(shemas.registerSchema), ctrl.register);
router.post("/login", validateBody(shemas.loginSchema), ctrl.login);

router.get("/current", autenticate, ctrl.getCurrent);

router.post("/logout", autenticate, ctrl.logout);

module.exports = router;
