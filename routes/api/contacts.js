const express = require('express');
const contactsModel = require('../../models/contacts');
const Joi = require('joi');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactsModel.listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await contactsModel.getContactById(contactId);
    res.json(contact);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  const { body } = req;

  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
  });

  try {
    const validationResult = schema.validate(body);
    if (validationResult.error) {
      res.status(400).json({ message: 'Validation failed', error: validationResult.error.details });
      return;
    }

    const newContact = await contactsModel.addContact(body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const removedContact = await contactsModel.removeContact(contactId);
    if (!removedContact) {
      res.status(404).json({ message: 'Contact not found' });
      return;
    }
    res.json({ message: 'Contact deleted', contact: removedContact });
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const { body } = req;

  const schema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string(),
  });

  try {
    const validationResult = schema.validate(body);
    if (validationResult.error) {
      res.status(400).json({ message: 'Validation failed', error: validationResult.error.details });
      return;
    }

    const updatedContact = await contactsModel.updateContact(contactId, body);
    if (!updatedContact) {
      res.status(404).json({ message: 'Contact not found' });
      return;
    }
    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
