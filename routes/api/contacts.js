const express = require('express');
const router = express.Router();
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require('../../models/contacts');
const { validateContact } = require('../../Helper/helper');

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json(contacts);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const contact = await getContactById(id);
    if (contact) {
      res.json(contact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (err) {
    next(err);
  }
});

router.post('/', validateContact, async (req, res, next) => {
    const { name, email, phone } = req.body;
    try {
      const contact = await addContact({ name, email, phone });
      res.status(201).json(contact);
    } catch (err) {
      next(err);
    }
  });

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await removeContact(id);
    if (result) {
      res.json({ message: 'Contact deleted' });
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  try {
    const contact = await updateContact(id, { name, email, phone });
    if (contact) {
      res.json(contact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
