const express = require("express");
const {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  changeContacts,
} = require("../../controllers/contacts.controllers");

const routerContact = express.Router();

routerContact.get("/", getContacts);
routerContact.get("/:contactId", getContact);
routerContact.post("/", createContact);
routerContact.delete("/:contactId", deleteContact);
routerContact.put("/:contactId", changeContacts);

module.exports = {
  routerContact,
};
