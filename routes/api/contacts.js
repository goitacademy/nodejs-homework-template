const express = require("express");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contacts");

const router = express.Router();

router.get("/", listContacts);

router.get("/:contactId", getContactById);

router.post("/", addContact);

router.put("/:contactId", updateContact);

router.delete("/:contactId", removeContact);

router.patch("/:contactId/favorite", updateStatusContact);

module.exports = router;
