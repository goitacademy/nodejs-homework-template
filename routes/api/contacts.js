const express = require("express");
const contactsRouter = express.Router();


const {
  getContacts,
  getById,
  addNewCont,
  deleteContact,
  changeContact,
  changeContactStats
} = require("../../controllers/contacts");

contactsRouter.get("/", getContacts);

contactsRouter.get("/:contactId", getById);

contactsRouter.post("/",addNewCont);

contactsRouter.delete("/:contactId", deleteContact);

contactsRouter.put("/:contactId", changeContact);

contactsRouter.patch("/:contactId", changeContactStats);

module.exports = contactsRouter;