import express from 'express';
import Joi from 'joi';

import contactsService from '../../models/contacts.js';

import { HttpError } from '../../helpers/index.js';

const router = express.Router();

const contactsAddSchema = Joi.object({
  name: Joi.string().required().max(49).messages({
    'any.required': 'missing required name field!!',
    'string.empty': "Name can't be empty!!",
    'string.base': 'Name must be a string!',
    'string.max': 'Name must not exceed 49 characters!',
  }),
  email: Joi.string().email().required().max(49).messages({
    'any.required': 'missing required email field!',
    'string.empty': "Email can't be empty!",
    'string.email': 'Invalid email format!',
    'string.max': 'Email must not exceed 49 characters!',
  }),
  phone: Joi.string()
    .pattern(/^[\d()\s+-]+$/)
    .required()
    .messages({
      'string.pattern.base':
        "Phone number must contain only digits, spaces, and the following characters: '()', '+', and '-'!",
      'any.required': 'missing required phone field!',
      'string.empty': "Phone number can't be empty!",
    }),
});

router.get('/', async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.getContactById(contactId);
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactsAddSchema.validate(req.body);
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
    if (!result) {
      throw HttpError(404);
    }
    res.json('contact deleted');
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      throw HttpError(400, 'missing fields');
    }
    const { error } = contactsAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const { contactId } = req.params;
    const result = await contactsService.updateContactById(contactId, req.body);
    if (!result) {
      throw HttpError(404);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
});

export default router;
