const express = require("express");

const ctrl = require("../../controllers/index")

const validateBody = require("../../middlewares/validateBody");

const schemas = require("../../schemas/users");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

module.exports = router;