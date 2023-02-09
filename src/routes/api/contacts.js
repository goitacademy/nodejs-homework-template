const express = require('express');
const crypto = require('crypto');
const { listContacts, getContactById, addContact, removeContact, updateContact } = require('../../models/contacts');
const {
  getContactByIdValidation,
  addContactValidation,
  updateContactValidation,
} = require('../../middlewares/contacts.validation.middleware');

const router = express.Router();

router.get('/', async (_, res) => {
  try {
    const contacts = await listContacts();
    res.status(200).json({ contacts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:contactId', getContactByIdValidation, async (req, res) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', addContactValidation, async (req, res) => {
  try {
    const newContact = await addContact({ id: crypto.randomUUID(), ...req.body });

    if (newContact) {
      res.status(201).json(newContact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:contactId', getContactByIdValidation, async (req, res) => {
  try {
    const { contactId } = req.params;
    const removedContact = await removeContact(contactId);

    if (removedContact) {
      res.status(200).json({ message: `"${removedContact.name}" contact has been deleted.` });
    } else {
      res.status(404).json({ message: `Contact not found.` });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:contactId', [getContactByIdValidation, updateContactValidation], async (req, res) => {
  try {
    const { contactId } = req.params;
    const updatedContact = await updateContact(contactId, req.body);

    if (updatedContact) {
      res.status(200).json(updatedContact);
    } else {
      res.status(404).json({ message: `Contact not found.` });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
