const express = require('express');
const router = express.Router();
const Joi = require('joi');

const schemaCreateContact = Joi.object({
  name: Joi.string().alphanum().required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .regex(/^(\+)?(\(\d{2,3}\) ?\d|\d)(([ \-]?\d)|( ?\(\d{2,3}\) ?)){5,12}\d$/)
    .required(),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string().alphanum().optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string()
    .regex(/^(\+)?(\(\d{2,3}\) ?\d|\d)(([ \-]?\d)|( ?\(\d{2,3}\) ?)){5,12}\d$/)
    .optional(),
}).or('name', 'email', 'phone');

const contactsOperation = require('../../model/');

router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactsOperation.listContacts();
    if (!contacts) {
      const error = new Error('Not found');
      error.status = 404;
      throw error;
    }
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsOperation.getContactById(contactId);
    if (!contact) {
      const error = new Error('Not found');
      error.status = 404;
      throw error;
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const data = req.body;
    const { error } = schemaCreateContact.validate(data);
    if (error) {
      const errorMessage = error.message.includes('is required')
        ? 'missing required name field'
        : error.message.replace(/"/g, '').replace(/\:.*/, '');
      const err = new Error(errorMessage);
      err.status = 400;
      throw err;
    }
    const newContact = await contactsOperation.addContact(data);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const removedСontact = await contactsOperation.removeContact(contactId);
    if (!removedСontact) {
      const error = new Error('Not found');
      error.status = 404;
      throw error;
    }
    res.json({ message: 'contact deleted' });
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const data = req.body;
    const { error } = schemaUpdateContact.validate(data);
    if (error) {
      const err = new Error(error.message.replace(/"/g, '').replace(/\:.*/, ''));
      err.status = 400;
      throw err;
    }
    const updateContact = await contactsOperation.updateContact(contactId, data);
    if (!updateContact) {
      const error = new Error('Not found');
      error.status = 404;
      throw error;
    }
    res.json(updateContact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
