

const express = require('express');
const router = express.Router();
const contactsModel = require('../models/contacts');

router.get('/', async (req, res) => {
  const contacts = await contactsModel.listContacts();
  res.json(contacts);
});

router.get('/:contactId', async (req, res) => {
  const { contactId } = req.params;
  const contact = await contactsModel.getContactById(contactId);

  if (contact) {
    res.json(contact);
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});

router.post('/', async (req, res) => {
  const { body } = req;

  if (!body.name || !body.email || !body.phone) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const newContact = await contactsModel.addContact(body);
  res.status(201).json(newContact);
});

router.delete('/:contactId', async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsModel.removeContact(contactId);

  if (result) {
    res.json({ message: 'Contact deleted' });
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});

router.put('/:contactId', async (req, res) => {
  const { contactId } = req.params;
  const { body } = req;

  if (!body.name || !body.email || !body.phone) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const updatedContact = await contactsModel.updateContact(contactId, body);

  if (updatedContact) {
    res.json(updatedContact);
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});

module.exports = router;

