const express = require("express");

const router = express.Router();

const jsonParser = express.json();

const ContactsCtrl = require("../../controllers/contacts");

const { validateBody, validateId } = require("../../middlewares");

const schemes = require("../../schemes/contacts");

router.get("/", ContactsCtrl.getContacts);

router.get("/:contactId", validateId, ContactsCtrl.getContact);

router.post("/", jsonParser, validateBody(schemes.addSchema), ContactsCtrl.createContact);

router.delete("/:contactId", validateId, ContactsCtrl.deleteContact);

router.put(
  "/:contactId",
  jsonParser,
  validateBody(schemes.addSchema),
  validateId,
  ContactsCtrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  jsonParser,
  validateBody(schemes.updateFavoriteSchema),
  validateId,
  ContactsCtrl.updateStatusContact
);

module.exports = router;
