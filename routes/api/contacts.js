const Joi = require('joi');
const express = require('express');
const contacts = require('../../models/contacts.js');
const router = express.Router();

const addValidate = Joi.object({
  name: Joi.string().min(2).max(40).required(),
  email: Joi.string().required(),
  phone: Joi.number().required(),
});

const updateValidate = Joi.object({
  name: Joi.string().min(2).max(40),
  email: Joi.string(),
  phone: Joi.number(),
});

router.get('/', async (req, res, next) => {
  try {
    const allContacts = await contacts.listContacts();
    res.status(200).json(allContacts);
  } catch (e) {
    res.status(404).json({ message: 'No contacts found' });
    next(e);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const contact = await contacts.getContactById(req.params.contactId);
    if (!contact) {
      throw new Error();
    }
    res.status(200).json(contact);
  } catch (e) {
    res.status(404).json({ message: 'Contact with such index not found!' });
    next(e);
  }
});

router.post('/', async (req, res, next) => {
  const { name, email, phone } = req.body;
  const { error } = addValidate.validate(req.body);

  try {
    if (error) {
      throw error;
    }
    const contact = await contacts.addContact(name, email, phone);
    if (!contact) {
      throw new Error('This contact is already in your contact list');
    }
    res.status(201).json({ contact: contact });
  } catch (e) {
    res.status(400).json({ message: e.message });
    next(e);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const contact = await contacts.removeContact(req.params.contactId);
    if (!contact) {
      throw new Error();
    }
    res.status(200).json({ message: 'Success! Contact deleted!' });
  } catch {
    res.status(404).json({ message: 'Contact with such index not found!' });
    next();
  }
});

router.put('/:contactId', async (req, res, next) => {
  const { error, value } = updateValidate.validate(req.body);
  try {
    if (error || Object.keys(value).length === 0) {
      const message = error ? error.message : 'Some fields are missing';
      res.status(400).json(message);
      return;
    }
    const contact = await contacts.updateContact(
      req.params.contactId,
      req.body,
    );
    if (contact === null) {
      throw new Error('Not found');
    }
    res.json(contact);
  } catch (e) {
    res.status(404).json({ message: e.message });
    next(e);
  }
});

module.exports = router;
