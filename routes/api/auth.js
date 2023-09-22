const express = require("express");
const router = express.Router();

const ValidateBodyContact = require("../../middlewares/ValidateBodyAddContact");
const {
  validateUserSchemaRegister,
  validateUserSchemaLogin,
} = require("../../schemas/ValidateAuth");
const ctrl = require("../../controllers/usersCtrl");

router.post(
  "/register",
  ValidateBodyContact(validateUserSchemaRegister),
  ctrl.registerUser
);

router.post(
  "/login",
  ValidateBodyContact(validateUserSchemaLogin),
  ctrl.loginUser
);

module.exports = router;
