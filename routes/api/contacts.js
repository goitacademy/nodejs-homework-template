const express = require('express');
const Joi = require('joi');

const contactsService = require('../../models/contacts');

const { HttpError } = require('../../helpers');

const router = express.Router();

const contactAddSchema = Joi.object({
  name: Joi.string().messages({
'any.required': `missing required name field`
  }).required(),
  email: Joi.string().email().messages({
'any.required': `missing required name field`
  }).required(),
  phone: Joi.string().pattern(/^\(\d{3}\) \d{3}-\d{4}$/).messages({
'any.required': `missing required name field`
  }).required(),
})

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
      throw new HttpError(404, `Contact with id '${contactId}' not found`);
    }
  res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw new HttpError(400, error.message);
    }
    const result = await contactsService.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error)
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.removeContact(contactId);
    if (!result) {
      throw new HttpError(404);
    }
    res.json({
      message: "Contact deleted"
    })
  } catch (error) {
    next(error)
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw new HttpError(404, error.message);
    }
    const { contactId } = req.params;
    const result = await contactsService.updateContact(contactId, req.body);
    if (!result) {
      throw new HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error)
  }
});

module.exports = router;
