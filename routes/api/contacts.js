const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  deleteContact,
  updateContact,
} = require("../../controllers");
const {
  validateNewContact,
  validateUpdatedContact,
} = require("../../middleware/contacts");
const addSchema = require("../../schemes/contacts");

const router = express.Router();

router.get("/", listContacts);

router.get("/:contactId", getContactById);

router.post("/", validateNewContact(addSchema), addContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", validateUpdatedContact(addSchema), updateContact);

module.exports = router;
