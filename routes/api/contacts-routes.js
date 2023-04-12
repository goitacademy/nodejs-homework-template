const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/contacts-controllers.js");
const { validateBody } = require("../../utils/index.js");
const schemas = require("../../schemas/index.js");

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
