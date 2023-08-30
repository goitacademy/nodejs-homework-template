const express = require("express");
const { validationBody } = require("../../middlewares");
const { register } = require("../../api/contacts/auth");

const {
  userSchema: { schemas },
} = require("../../models");

const router = express.Router();

router.post("/register", validationBody(schemas.registerSchema), register);

module.exports = router;
