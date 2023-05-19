const express = require("express");

const router = express.Router();

const {
  getListContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../controllers/contacts-controllers");

router.get("/", getListContacts);

router.get("/:contactId", getContactById);

router.post("/", addContact);

router.delete("/:contactId", removeContact);

router.put("/:contactId", updateContact);

module.exports = router;
