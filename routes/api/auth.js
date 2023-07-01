const express = require("express");
const { schemas } = require("../../models/user");
const { validateBody } = require("../../middleware/contacts");
const { register } = require("../../controllers");

const router = express.Router();

router.post("/api/auth", validateBody(schemas.registerSchema), register);

module.exports = router;
