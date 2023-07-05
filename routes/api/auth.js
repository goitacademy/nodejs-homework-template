const express = require("express");
const router = express.Router();

const { register } = require("../../controllers/auth-controller");
const { validateBody } = require("../../middlewares");
const { schemas } = require("../../models/user");

router.post("/register", validateBody(schemas.registerSchema), register);

module.exports = router;
