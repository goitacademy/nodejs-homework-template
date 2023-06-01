const express = require('express');
const Joi = require('joi');

const router = express.Router();
const contactsService = require('../../models/contacts');
const { HttpError } = require('../../helpers');

const contactAddShema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': `"name" cannot be an empty field`,
    'any.required': `"name" is a required field`,
  }),
  email: Joi.string().required().messages({
    'string.empty': `"email" cannot be an empty field`,
    'any.required': `"email" is a required field`,
  }),
  phone: Joi.string().required().messages({
    'string.empty': `"phone" cannot be an empty field`,
    'any.required': `"phone" is a required field`,
  }),
});

router.get('/', async (req, res, next) => {
  try {
    const resultList = await contactsService.listContacts();
    res.json(resultList);
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const getContactResult = await contactsService.getContactById(contactId);
    if (getContactResult === null) {
      throw HttpError(404);
    } else res.json(getContactResult);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactAddShema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const addContactResult = await contactsService.addContact(req.body);
    res.status(201).json(addContactResult);
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const deleteContactResult = await contactsService.removeContact(contactId);
    if (deleteContactResult === null) {
      throw HttpError(404);
    } else res.status(200).json('Contact removed successfully');
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = contactAddShema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const contactId = req.params.contactId;
    const updateContactResult = await contactsService.updateContact(
      contactId,
      req.body
    );
    if (updateContactResult === null) {
      throw HttpError(404);
    } else res.json(updateContactResult);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
