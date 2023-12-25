const express = require("express");

const { validateBody } = require("../../middlewares");

const { schemas } = require("../../models/user");

const cntrl = require("../../controllers/auth");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), cntrl.register);
router.post("/login", validateBody(schemas.loginSchema), cntrl.login);

module.exports = router;
