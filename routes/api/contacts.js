const express = require('express');

const router = express.Router();

const contacts = require('../../models/contacts');

const { HttpError } = require('../../helpers');

const Joi = require('joi');

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get('/', async (req, res, next) => {
  try {
    const allContacts = await contacts.listContacts();
    res.json(allContacts);
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const contactById = await contacts.getContactById(id);
    if (!contactById) {
      throw HttpError(404, 'Not found');
    }
    res.json(contactById);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const newContact = await contacts.addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const removingContact = await contacts.removeContact(id);
    if (!removingContact) {
      throw HttpError(404, 'Not found');
    }
    res.json({ message: 'Contact deleted' });
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const id = req.params.contactId;
    const updatingContact = await contacts.updateContact(id, req.body);
    if (!updatingContact) {
      throw HttpError(404, 'Not found');
    }
    res.json(updatingContact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
