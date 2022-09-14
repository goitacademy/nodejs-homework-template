const express = require('express');
const Joi = require('joi');
const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
} = require('../../models/contacts');

const createError = require('../../errors');

const router = express.Router();

const schema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.number().required(),
});

router.get('/', async (req, res, next) => {
  try {
    const result = await listContacts();
    res.json({
      status: 'success',
      code: 200,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await getContactById(contactId);
    if (!result) {
      throw createError(404, 'Not found');
    }
    res.json({ status: 'success', code: 200, data: { result } });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      throw createError(400, 'missing required name field');
    }

    const result = await addContact(req.body);
    res.status(201).json({ status: 'success', code: 201, data: { result } });
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await removeContact(contactId);
    if (!result) {
      throw createError(404, 'Not found');
    }
    res.json({ status: 'success', code: 200, message: 'contact deleted' });
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      throw createError(400, 'missing fields');
    }
    const { contactId } = req.params;
    const result = await updateContact(contactId, req.body);
    if (!result) {
      throw createError(404, 'Not found');
    }
    res.json({ status: 'success', code: 200, data: { result } });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
