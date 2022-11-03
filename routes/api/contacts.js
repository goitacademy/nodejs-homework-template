const express = require('express');
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../models/contacts.js');

const router = express.Router();

router.get('/', async (req, res) => {
  const contacts = await listContacts();
  if (contacts) {
    res.status(200).json(contacts);
  } else {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:contactId', async (req, res) => {
  const id = req.params.contactId;
  const contact = await getContactById(id);
  if (contact) {
    res.status(200).json(contact);
  } else {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  const { email, phone, name } = req.body;
  await addContact({ email, phone, name });
  res.status(201).send('created');
});

router.delete('/:contactId', async (req, res) => {
  const id = req.params.contactId;
  const contact = await removeContact(id);
  if (contact) {
    res.status(201).send('created');
  } else {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:contactId', async (req, res) => {
  const id = req.params.contactId;
  const contact = await updateContact(id, req.body);
  if (contact) {
    res.status(201).send('created');
  } else {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
