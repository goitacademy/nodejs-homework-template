const express = require('express');
const router = express.Router();
const { listContacts, getContactById, addContact, removeContact, updateContact } = require('../../models/contacts');
const { contactSchema } = require('../../validation'); 

router.get('/', async (req, res) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
  const contact = await getContactById(req.params.id);
  if (contact) {
    res.status(200).json(contact);
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});

router.post('/', (req, res) => {
  const { error } = contactSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const newContact = addContact(req.body);
  res.status(201).json(newContact);
});

router.delete('/:id', (req, res) => {
  const result = removeContact(req.params.id);
  if (result) {
    res.status(200).json({ message: 'contact deleted' });
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});

router.put('/:id', (req, res) => {
  const { error } = contactSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const updatedContact = updateContact(req.params.id, req.body);
  if (updatedContact) {
    res.status(200).json(updatedContact);
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});

module.exports = router;
