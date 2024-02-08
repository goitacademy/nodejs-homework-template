const express = require('express');
const router = express.Router();
const contactsOperations = require('../../models/contacts');

router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts();
    res.json(contacts);
  } catch (err) {
    next(err);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const contact = await contactsOperations.getContactById(req.params.contactId);
    if (contact) {
      res.json(contact);
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newContact = await contactsOperations.addContact(req.body);
    res.status(201).json(newContact);
  } catch (err) {
    next(err);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const removedContact = await contactsOperations.removeContact(req.params.contactId);
    if (removedContact) {
      res.status(200).json({ message: 'Contact deleted' });
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (err) {
    next(err);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const updatedContact = await contactsOperations.updateContact(req.params.contactId, req.body);
    if (updatedContact) {
      res.json(updatedContact);
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (err) {
    next(err);
  }
});

router.patch('/:contactId/favorite', async (req, res, next) => {
  try {
    const { favorite } = req.body;
    if (favorite === undefined) {
      return res.status(400).json({ message: "missing field favorite" });
    }

    const updatedContact = await contactsOperations.updateStatusContact(req.params.contactId, { favorite });
    if (updatedContact) {
      return res.json(updatedContact);
    } else {
      return res.status(404).json({ message: "Not found" });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
