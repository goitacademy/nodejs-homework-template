const express = require("express");
const routerContact = express.Router();
const validate = require("../validator/validator");
const { auth } = require("../config/passport-jwt");
const {
  addContact,
  getContacts,
  getContactById,
  removeContact,
  updateContact,
  updateContactStatus,
} = require("../controller/contact");

routerContact.post("/contacts", validate.contactValid, auth, addContact);

routerContact.get("/contacts",auth, getContacts);

routerContact.get("/contacts/:id",auth, getContactById);

routerContact.put("/contacts/:id", validate.contactValid,auth, updateContact);

routerContact.patch("/contacts/:id/status",auth, updateContactStatus);

routerContact.delete("/contacts/:id",auth, removeContact);

module.exports = routerContact;
