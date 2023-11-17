const express = require('express')

const controllers = require("../../controllers/contacts");

const router = express.Router()

const  {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = controllers;

router.get("/", listContacts);

router.get("/:contactId", getContactById);

router.post("/", addContact);

router.delete("/:contactId", removeContact);

router.put("/:contactId", updateContact);

module.exports = router
