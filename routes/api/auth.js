const express = require("express");
const { validateBody, authentication } = require("../../middlewares");
const { schemas } = require("../../models/user");
const router = express.Router();
const ctrl = require("../../controllers/auth");

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);
module.exports = router;

router.get("/current", authentication, ctrl.getCurrent);

router.post("/logout", authentication, ctrl.logout);
