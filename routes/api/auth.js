const express = require("express");

const { validateBody } = require("../../middlewares");

const ctrl = require("../../controllers/auth")

const {schemas} = require("../../models/user")

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register)

module.exports = router;