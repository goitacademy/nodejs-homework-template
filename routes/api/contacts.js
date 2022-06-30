const express = require("express");
const router = express.Router();

const {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
} = require("../../controllers/contactsController");

router.get("/", listContacts);

router.get("/:contactId", getById);

router.post("/", addContact);

router.delete("/:contactId", removeContact);

router.put("/:contactId", updateContact);

module.exports = router;
