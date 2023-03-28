const express = require('express');
const { nanoid } = require('nanoid');
const { addContactValidator, updateContactValidator } = require('../../utils/validator');
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../models/contacts');

const router = express.Router();

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
};

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json(contacts);
  } catch (err) {
    next(err);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.json(contact);
  } catch (err) {
    next(err);
  }
});

router.post('/', addContactValidator, async (req, res, next) => {
  try {
    const newContact = await addContact({ id: nanoid(), ...req.body });
    res.status(201).json(newContact);
  } catch (err) {
    next(err);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deletedContact = await removeContact(contactId);
    if (!deletedContact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.json(deletedContact);
  } catch (err) {
    next(err);
  }
});

router.put('/:contactId', updateContactValidator, async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updatedContact = await updateContact(contactId, req.body);
    if (!updatedContact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.json(updatedContact);
  } catch (err) {
    next(err);
  }
});

router.use(errorHandler);

module.exports = router;