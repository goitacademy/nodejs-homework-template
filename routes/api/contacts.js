const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contacts.controller");
const {
  validatePostContact,
  validatePutContact,
  validatePatchContact,
} = require("../../models/validateContacts");
const { contactSchema } = require("../../models/contactsSchema");

const router = express.Router();

router.get("/", listContacts);

router.get(`/:id`, getContactById);

router.post("/", validatePostContact(contactSchema), addContact);

router.delete("/:contactId", removeContact);

router.put("/:contactId", validatePutContact(contactSchema), updateContact);

router.patch(
  "/:contactId/favorite",
  validatePatchContact(contactSchema),
  updateStatusContact
);

module.exports = router;
