const express = require("express");

const router = express.Router();

const ctrl = require("../../Controllers/contacts");

const {
  validateSchemeUpdContact,
  validateSchemeAddContact,
  isValidId,
  validateSchemeFavorContact,
  validateToken,
} = require("../../Middlewares");

const {
  schemaContact,
  schemaUpdateContact,
} = require("../../Service/schemas/contacts");

router.get("/", validateToken,  ctrl.listContacts);

router.get("/:id", validateToken, isValidId, ctrl.getContactById);

router.post(
  "/",
  validateToken,
  validateSchemeAddContact(schemaContact),
  ctrl.addContact
);

router.delete("/:id", validateToken, isValidId, ctrl.removeContact);

router.put(
  "/:id",
  validateToken,
  isValidId,
  validateSchemeUpdContact(schemaContact),
  ctrl.updateContact
);

router.patch(
  "/:id/favorite",
  validateToken,
  isValidId,
  validateSchemeFavorContact(schemaUpdateContact),
  ctrl.updateStatus
);

// router.get("/:favorite=true", validateToken, ctrl.getContactFavorite);

module.exports = router;
