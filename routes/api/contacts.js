const express = require('express');
const Joi = require('joi');

const contacts = require('../../models/contacts');
const { HttpError } = require('../../helpers');

const router = express.Router();

const newContSchema = Joi.object({
  id: Joi.any(),
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get('/', async (req, res, next) => {
  try {
    const list = await contacts.listContacts();
    res.json(list);
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const contactById = await contacts.getContactById(req.params.contactId);
    if (!contactById) {
      throw HttpError(404, 'not found');
    }
    res.json(contactById);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = newContSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = contacts.addContact(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const deletedContact = await contacts.removeContact(req.params.contactId);
    if (!deletedContact) {
      throw HttpError(404, 'Not found');
    }
    res.json({ message: 'contact deleted' });
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  const bodyLength = Object.keys(req.body).length;
  if (bodyLength === 0) {
    res.status(400).json({ message: 'missing fields' });
    return;
  }
  try {
    const { error } = newContSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { contactId } = req.params;
    const updatedContact = await contacts.updateContact(contactId, req.body);
    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
