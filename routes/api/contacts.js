const express = require('express');
const contacts = require('../../models/contacts.js');
const { HttpError } = require('../../helpers');
const Joi = require('joi');

const router = express.Router();

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const updateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
}).or('name', 'email', 'phone');

router.get('/', async (req, res, next) => {
  try {
    res.json(await contacts.listContacts());
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const contact = await contacts.getContactById(req.params.contactId);
    if (!contact) {
      throw HttpError(404, 'Not found');
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, 'missing required name field');
    } else {
      res.status(201).json(await contacts.addContact(req.body));
    }
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const contact = await contacts.removeContact(req.params.contactId);
    if (!contact) {
      throw HttpError(404, 'Not found');
    }
    res.json({ message: 'contact deleted' });
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = updateSchema.validate(req.body);
    if (error) {
      throw HttpError(400, 'missing fields');
    } else {
      const contact = await contacts.updateContact(
        req.params.contactId,
        req.body
      );
      if (!contact) {
        throw HttpError(404, 'Not found');
      }
      res.json(contact);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
