const express = require('express');
const contactsOperations = require('../../models/contacts');
const router = express.Router();
const { HttpError } = require('../../helpers');
const Joi = require('joi');

const addSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^\+38-\d{3}-\d{3}-\d{2}-\d{2}$/)
    .required(),
});

router.get('/', async (_, res, next) => {
  try {
    const contacts =
      await contactsOperations.listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const response =
      await contactsOperations.getContactById(
        req.params.contactId,
      );
    if (!response) {
      throw HttpError(404, 'Not Found');
    }
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const newContact = await contactsOperations.addContact(
      req.body,
    );
    res.status(201).json(newContact);
    if (!newContact) {
      throw HttpError(404, 'Unable to add contact');
    }
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const response = await contactsOperations.removeContact(
      req.params.contactId,
    );
    if (!response) {
      throw HttpError(404, 'Not Found');
    }
    res.status(200).json({ message: 'contact deleted' });
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const updatedContact =
      await contactsOperations.updateContact(
        req.params.contactId,
        req.body,
      );

    if (!updatedContact) {
      throw HttpError(404, 'Not Found');
    }
    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
