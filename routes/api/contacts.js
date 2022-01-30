const express = require('express');
const createError = require('http-errors');
const Joi = require('joi');
const contacts = require('../../models/contacts');

const productSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
    // res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);

    if (!result) {
      throw new createError(404, 'Not found');
      // const error = new Error('Not found');
      // error.status = 404;
      // throw error;

      // res.status(404).json({ message: 'Not found' });
    }
    res.json(result);
  } catch (error) {
    next(error);

    // res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = productSchema.validate(req.body);
    if (error) {
      throw new createError(400, error.message);
    }
    const { name, email, phone } = req.body;
    const result = await contacts.addContact(name, email, phone);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
      throw new createError(404, 'Not found');
    }
    res.json({ message: 'contact deleted' });
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = productSchema.validate(req.body);
    if (error) {
      throw new createError(400, error.message);
    }
    const { contactId } = req.params;
    const { name, email, phone } = req.body;
    const result = await contacts.updateContact(contactId, name, email, phone);
    if (!result) {
      throw new createError(404, 'Not found');
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
