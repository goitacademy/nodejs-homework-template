const express = require("express");
const router = express.Router();

const ValidateBodyContact = require("../../middlewares/ValidateBodyAddContact");
const {
  validateUserSchemaRegister,
  validateUserSchemaLogin,
} = require("../../schemas/ValidateAuth");
const ctrl = require("../../controllers/usersCtrl");
const authenticate = require("../../middlewares/authenticate");

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

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout)

module.exports = router;
