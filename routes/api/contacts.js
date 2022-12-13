const express = require("express");
const { validation } = require("../../middelwares");
const { contactSchema } = require("../../shemas");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const validationMiddelware = validation(contactSchema);

const router = express.Router();

router.get("/", listContacts);
router.get("/:contactId", getContactById);
router.post("/", validationMiddelware, addContact);
router.delete("/:contactId", removeContact);
router.put("/:contactId", validationMiddelware, updateContact);

module.exports = router;
