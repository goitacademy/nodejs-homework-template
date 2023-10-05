const express = require('express');
const router = express.Router();
const Contact = require('../../models/contacts');

// Отримання списку контактів
router.get('/', async (req, res, next) => {
  try {
    const contacts = await Contact.listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

// Отримання контакту за ID
router.get('/:contactId', async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const contact = await Contact.getContactById(contactId);

    if (!contact) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.json(contact);
  } catch (error) {
    next(error);
  }
});

// Додавання нового контакту
router.post('/', async (req, res, next) => {
  try {
    const newContact = await Contact.addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

// Видалення контакту за ID
router.delete('/:contactId', async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const removedContact = await Contact.removeContact(contactId);

    if (!removedContact) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.json({ message: 'Contact deleted' });
  } catch (error) {
    next(error);
  }
});

// Оновлення контакту за ID
router.put('/:contactId', async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const updatedContact = await Contact.updateContact(contactId, req.body);

    if (!updatedContact) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
});

// Оновлення статусу контакту за ID
router.patch('/:contactId/favorite', async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const { favorite } = req.body;

    if (favorite === undefined) {
      return res.status(400).json({ message: 'Missing field favorite' });
    }

    const updatedContact = await Contact.updateStatusContact(contactId, favorite);

    if (!updatedContact) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
