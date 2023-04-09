const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/contactsControllers.js");
const { validateBody } = require("../../utils");
const schemas = require("../../schemas");

router.get("/", ctrl.listContacts);

router.get("/:contactId", ctrl.getContactById);

router.post(
  "/",
  validateBody(schemas.contactsValidationSchemas),
  ctrl.addContact
);

router.delete("/:contactId", ctrl.removeContact);

router.put(
  "/:contactId",
  validateBody(schemas.contactsValidationSchemas),
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  validateBody(schemas.favoriteUpdateSchemas),
  ctrl.updateStatusContact
);

module.exports = router;
