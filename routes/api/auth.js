const express = require("express");

const { validateBody } = require("../../middlewares");

const { isValidId } = require("../../middlewares");

const { schemas } = require("../../models/user");

const { register } = require("../../controllers/auth");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), register);

module.exports = router;
