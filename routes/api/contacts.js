const express = require('express');

const router = express.Router();

const contacts = require('../../models/contacts');

router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', async (req, res, next) => {
  const contactId = req.params.id;
  const result = await contacts.getContactById(contactId)
  if (result) {
    res.json(result);
  } else {
    res.status(404).json({ message: 'Not found' });
  }
})

router.post('/', async (req, res, next) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    res.status(400).json({ message: 'missing required name field' });
  } else {
    const contact = await contacts.addContact({ name, email, phone });
    res.status(201).json(contact);
  }
})

router.delete('/:id', async (req, res, next) => {
  const contactId = req.params.id;
  const result = await contacts.removeContact(contactId);

  if (result) {
    res.json({ message: 'contact deleted' });
  } else {
    res.status(404).json({ message: 'Not found' });
  }
})

router.put('/:id', async (req, res, next) => {
  const contactId = req.params.id;
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    res.status(400).json({ message: 'missing fields' });
  } else {
    const updatedContact = await contacts.updateContact(contactId, { name, email, phone });
    
    if (updatedContact) {
      res.status(200).json(updatedContact);
    } else {
      res.status(404).json({ message: 'Not Found' });
    }
  }
})

module.exports = router
