const express = require("express");
const {
  getContacts,
  getContactById,
  deleteContact,
  addContact,
  updateContact,
} = require("../../controllers/contactsControllers");
const router = express.Router();

router.get("/", getContacts);

router.get("/:contactId", getContactById);

router.delete("/:contactId", deleteContact);

router.post("/", addContact);

router.put("/:contactId", updateContact);

module.exports = router;
