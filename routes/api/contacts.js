const express = require('express');
const { httpErrorFunc } = require('../..//helpers/httpErrorFunc');
const Joi = require('joi');

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../..//models/contacts');

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^380\d{9}$/)
    .required(),
});

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();

    if (!contacts) {
      throw httpErrorFunc(404, 'No contacts found');
    }
    res.status(200).json(contacts);
  } catch (err) {
    next(err);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    res.status(200).json(await getContactById(req.params.contactId));
  } catch (err) {
    throw httpErrorFunc(404, 'Not found');
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw httpErrorFunc(400, error.message);
    }
    const result = await addContact(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const result = await removeContact(req.params.contactId);
    if (!result) {
      throw httpErrorFunc(404, 'Not found');
    }
    res.status(200).json({ message: 'contact deleted' });
  } catch (err) {
    next(err);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw httpErrorFunc(400, error.message);
    }
    const result = await updateContact(req.params.contactId, req.body);
    if (!result) {
      throw httpErrorFunc(404, 'Not found');
    }
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
