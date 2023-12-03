const express = require('express');
const Joi = require('joi');

const contacts = require('../../models/contacts');
const { HttpError } = require('../../helpers');

const router = express.Router();
const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const result = await contacts.getContactById(req.params.contactId);
    if (!result) throw HttpError(404, 'Not Found!');
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      const [details] = error.details;
      throw HttpError(400, `Missing required ${details.context.key} field!`);
    }
    const result = await contacts.addContact(req.body);
    if (!result)
      throw HttpError(400, `${req.body.name} is already in contacts!`);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const result = await contacts.removeContact(req.params.contactId);
    if (!result) throw HttpError(404, 'Not Found!');
    res.json({ message: 'Contact deleted!' });
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) throw HttpError(400, 'Missing fields!');
    const result = await contacts.updateContact(req.params.contactId, req.body);
    if (!result) throw HttpError(404, 'Not Found!');
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
