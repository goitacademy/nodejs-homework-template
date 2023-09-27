const express = require("express");
const router = express.Router();

const ValidateBodyContact = require("../../middlewares/ValidateBodyAddContact");
const {
  validateUserSchemaRegister,
  validateUserSchemaLogin,
} = require("../../schemas/ValidateAuth");
const ctrl = require("../../controllers/usersCtrl");
const authenticate = require("../../middlewares/authenticate");
const { validateUpdateSubscription } = require("../../schemas/ValidateSchemasContacts");

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

router.post("/logout", authenticate, ctrl.logout);

router.patch(
  "/:userId",
  authenticate,
  ValidateBodyContact(validateUpdateSubscription),
  ctrl.updateUserSubscription
);

module.exports = router;
