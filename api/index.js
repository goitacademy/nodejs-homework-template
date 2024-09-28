const express = require("express");

const router = express.Router();

const {
  getListContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateContactStatus
} = require("../controller");

router.get("/", getListContacts);

router.get("/:contactId", getContactById);

router.post("/", addContact);

router.delete("/:contactId", removeContact);

router.put("/:contactId", updateContact);

router.patch("/:contactId/favorite", updateContactStatus);

module.exports = router;
