const express = require('express');
const {  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");


const routeContacts = express.Router();


routeContacts.get('/', async (req, res, next) => {
 const contacts = await listContacts();
  res.status(200).json({contacts});
})

routeContacts.get('/:contactId', async (req, res, next) => {
  console.log(req)
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  res.status(200).json({contact});
})

routeContacts.post('/', async (req, res, next) => {
  const newContact = await addContact(req.body);
  res.status(201).json({newContact});
})

routeContacts.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const delContact = await removeContact(contactId);
  console.log(contactId, req)

  res.status(204).json(delContact);
})

routeContacts.put('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const updatedContact = await updateContact(contactId, req.body);
  res.status(200).json({ updatedContact });
})

module.exports = routeContacts;

