const express = require('express');
const router = express.Router();
const { contactsController } = require('../../contactsJS/contactsManager');
const { validateContact } = require('../../contactsJS/contactsVerification');

router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactsController.listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await contactsController.getById(contactId);
    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  const { error } = validateContact(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { name, email, phone } = req.body;

  try {
    const newContact = await contactsController.addContact({
      name,
      email,
      phone,
    });
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const result = await contactsController.removeContact(contactId);
    if (result) {
      res.status(200).json({ message: 'Contact deleted' });
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  const { error } = validateContact(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { contactId } = req.params;
  const { name, email, phone } = req.body;

  try {
    const updatedContact = await contactsController.updateContact(contactId, {
      name,
      email,
      phone,
    });
    if (updatedContact) {
      res.status(200).json(updatedContact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
