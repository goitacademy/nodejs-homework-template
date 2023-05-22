const express = require("express");

const { schemas } = require("../../models/contact");

const { validateBody } = require("../../decorators");

const router = express.Router();

const {
  addContact,
  getAllContacts,
  getContactsById,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contacts-conrtoller");

router.get("/", getAllContacts);

router.get("/:contactId", getContactsById);

router.post("/", validateBody(schemas.contactsAddSchema), addContact);

router.delete("/:contactId", removeContact);

router.patch(
  "/:contactId/favorite",
  validateBody(schemas.updateFavoriteSchema),
  updateStatusContact
);

router.put(
  "/:contactId",
  validateBody(schemas.contactsAddSchema),
  updateContact
);

module.exports = { contactsRouter: router };
