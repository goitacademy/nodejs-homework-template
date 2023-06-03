const express = require('express');
const Joi = require('joi');

const contactsService = require('../../models/contacts');

const { HttpError } = require('../../helpers');

const router = express.Router();

const contactsAddSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': `missing required name field`,
  }),
  email: Joi.string().required().messages({
    'any.required': `missing required email field`,
  }),
  phone: Joi.string().required().messages({
    'any.required': `missing required phone field`,
  }),
});

router.get('/', async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsService.getContactById(id);
    if (!result) {
      throw HttpError(404, 'Not found');
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = await contactsAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contactsService.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsService.removeContact(id);
     if (!result) {
       throw HttpError(404, 'Not found');
     }
    res.json({ message: 'contact deleted' });
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { error } = await contactsAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, 'Missing fields');
    }
    const { id } = req.params;
    const result = await contactsService.updateContactsById(id, req.body);
    if (!result) {
      throw HttpError(404, 'Not found');
    } 
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
