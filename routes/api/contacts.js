const express = require('express');
const { v4 } = require('uuid');

const router = express.Router();

const Joi = require('joi');

const contactShema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../models/contacts');

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json({
      status: 'success',
      code: 200,
      data: { result: contacts },
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (!contact) {
      const error = new Error('Not found');
      error.status = 404;
      throw error;
    }
    res.status(200).json({
      status: 'success',
      code: 200,
      data: { result: contact },
    });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactShema.validate(req.body);
    if (error) {
      error.status = 400;
      error.message = 'missing required name field';
      throw error;
    }
    const result = await addContact({ id: v4(), ...req.body });
    res.status(201).json({
      status: 'success',
      code: 201,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await removeContact(contactId);
    if (!contact) {
      const error = new Error('Not found');
      error.status = 404;
      throw error;
    }
    res.status(200).json({
      status: 'success',
      code: 200,
      message: 'contact deleted',
      data: contact,
    });
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { name, email, phone } = req.body;
    if (!name && !email && !phone) {
      const error = new Error('missing fields');
      error.status = 400;
      throw error;
    }
    const result = await updateContact(contactId, req.body);
    if (!result) {
      const error = new Error('Not found');
      error.status = 404;
      throw error;
    }
    res.status(200).json({
      status: 'success',
      code: 201,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
