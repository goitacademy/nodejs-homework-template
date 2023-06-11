const express = require('express');
const Joi = require('joi');

const router = express.Router();
const contactsService = require('../../models/contacts/contacts');

const HttpError = require('../../helpers/HttpError');

const addContactSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ 'any.required': `missing required "name" field` }),
  email: Joi.string()
    .required()
    .messages({ 'any.required': `missing required "email" field` }),
  phone: Joi.string()
    .required()
    .messages({ 'any.required': `missing required "phone" field` }),
});

router.get('/', async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.getContactById(contactId);

    if (!result) {
      throw HttpError(404, `Contact with id=${contactId} not found`);
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = addContactSchema.validate(req.body);

    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contactsService.addContact(req.body);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.removeContact(contactId);
    if (result) {
      res.status(200).json({ message: 'contact deleted' });
    } else {
      throw HttpError(404, `Contact with id=${contactId} not found`);
    }
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = addContactSchema.validate(req.body);

    if (error) {
      throw HttpError(400, error.message);
    }

    const { contactId } = req.params;

    const result = await contactsService.updateContactById(contactId, req.body);

    if (!result) {
      throw HttpError(404, `Contact with id=${contactId} not found`);
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
