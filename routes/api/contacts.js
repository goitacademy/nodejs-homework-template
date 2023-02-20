const express = require("express");
const router = express.Router();
const {
  getContacts,
  getOneContact,
  createContact,
  deleteContact,
  updateContact,
} = require("../../controllers/contactsControllers.js");

router.get("/", getContacts);

router.get("/:contactId", getOneContact);

router.post("/", createContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", updateContact);

module.exports = router;
