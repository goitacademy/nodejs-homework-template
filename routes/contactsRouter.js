const express = require('express');
const { getAllContacts, getOneContact, deleteContact, createContact, updateContact } = require("../controllers/contactsControllers");

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get('/:contactId', getOneContact);

contactsRouter.delete('/:contactId', deleteContact);

contactsRouter.post('/', createContact);

contactsRouter.put('/:contactId', updateContact);

module.exports = contactsRouter;
