const express = require('express');
const operations = require('../../models/contacts');
const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const contacts = await operations.listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await operations.getContactById(contactId);
    if (!contact) {
      const error = new Error(`Contact with id: ${contactId} not found`);
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
    const { error } = productSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const contact = await operations.addContact(req.body);
    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deletedContact = await operations.removeContact(contactId);
    if (!deletedContact) {
      const error = new Error(`Contact with id: ${contactId} not found`);
      error.status = 404;
      throw error;
    }
    res.json(deletedContact);
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = productSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const { contactId } = req.params;
    const updatedContact = await operations.updateContact(contactId, req.body);
    if (!updatedContact) {
      throw new Error(`Product with id=${contactId} not found`);
    }
    res.status(201).json(updatedContact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
