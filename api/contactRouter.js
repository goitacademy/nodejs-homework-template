const express = require("express");
const routerContact = express.Router();
const validate = require("../validator/validator");

const {
  addContact,
  getContacts,
  getContactById,
  removeContact,
  updateContact,
  updateContactStatus,
} = require("../controller/contact");

routerContact.post("/Contacts", validate.contactValid, addContact);

routerContact.get("/Contacts", getContacts);

routerContact.get("/Contacts/:id", getContactById);

routerContact.put("/Contacts/:id", validate.contactValid, updateContact);

routerContact.patch("/Contacts/:id/status", updateContactStatus);

routerContact.delete("/Contacts/:id", removeContact);

module.exports = routerContact;
