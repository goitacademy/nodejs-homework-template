const express = require("express");

const ctrl = require("../../controllers/index")

const validateBody = require("../../middlewares/validateBody");

const authenticate = require("../../middlewares/authenticate");

const schemas = require("../../schemas/users");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

module.exports = router;