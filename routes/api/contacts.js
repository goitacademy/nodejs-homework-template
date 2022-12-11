const express = require('express');
const router = express.Router();
const Joi = require('joi');
const contacts = require('../../models/contacts');
const { createError } = require('../../helpers');
const contactsSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net',] },
  }).required(),
  phone: Joi.string().required(),
});

router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (e) {
    next(e);
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw createError(404, 'Not Found');
    }
    res.json(result);
  } catch (e) {
    next(e);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      throw createError(422, error.message);
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
      throw createError(404, 'Not Found');
    }
    res.json({
      message: 'Successfully removed contact',
    });
  } catch (e) {
    next(e);
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      throw createError(422, error.message);
    }
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    if (!result) {
      throw createError(404, 'Not Found');
    }
    res.json(result);
  } catch (e) {
    next(e);
  }
})

module.exports = router
