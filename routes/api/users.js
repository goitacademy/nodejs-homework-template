const express = require("express");
const { registration, login } = require("../../models/users");

const {
  userRegDataValidationSchema,
} = require("../../middleware/validationContacts");

const router = express.Router();

router.post("/signup", userRegDataValidationSchema, registration);

router.post("/login", userRegDataValidationSchema, login);

module.exports = router;
