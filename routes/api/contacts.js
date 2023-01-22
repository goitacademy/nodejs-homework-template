const express = require("express");
const {
  getAllContacts,
  getContact,
  createContact,
  deleteContact,
  updateContactById,
  updateStatusContact,
} = require("../../controllers/controller.contacts.js");

const routerContacts = express.Router();

routerContacts.get("/", getAllContacts);
routerContacts.get("/:id", getContact);
routerContacts.post("/", createContact);
routerContacts.delete("/:id", deleteContact);
routerContacts.put("/:id", updateContactById);
routerContacts.patch("/:id/favorite", updateStatusContact);

module.exports = routerContacts;
