const express = require("express");
const {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  changeContacts,
} = require("../../controllers/contacts.controller");

const contactRouter = express.Router();

contactRouter.get("/", getContacts);
contactRouter.get("/:contactId", getContact);
contactRouter.post("/", createContact);
contactRouter.delete("/:contactId", deleteContact);
contactRouter.put("/:contactId", changeContacts);

module.exports = {
  contactRouter,
};
