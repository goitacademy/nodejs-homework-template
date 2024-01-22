const express = require('express');
const { getAllContacts, getOneContact, deleteContact, createContact, updateContact } = require("../controllers/contactsControllers");
const { validateBody } = require("../helpers");
const { createContactSchema, updateContactSchema } = require("../schemas/contactsSchemas");


const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get('/:contactId', getOneContact);

contactsRouter.delete('/:contactId', deleteContact);

contactsRouter.post('/', validateBody(createContactSchema), createContact);

contactsRouter.put('/:contactId', validateBody(updateContactSchema), updateContact);

module.exports = contactsRouter;
