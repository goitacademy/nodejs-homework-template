const express = require('express');
const router = express.Router();
const { contactSchema } = require('../../validation/validation');
const contactsController = require('../../controllers/contactsController');

router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactsController.getAllContacts(req, res, next);
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await contactsController.getContact(req, res, next);
    if (contact) {
      res.json(contact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return;
  }

  try {
    const newContact = await contactsController.createContact(req, res, next);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  try {
    await contactsController.deleteContact(req, res, next);
    res.json({ message: 'contact deleted' });
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return;
  }

  const { contactId } = req.params;
  try {
    const updatedContact = await contactsController.updateContactInfo(req, res, next);
    if (updatedContact) {
      res.json(updatedContact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
