const express = require('express');
const router = express.Router();
const Joi = require('joi');

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const contactsOperation = require('../../model/index');

router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactsOperation.listContacts();
    res.json({
      status: 'success',
      code: 200,
      message: 'Contants uploaded',
      data: { contacts },
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsOperation.getContactById(contactId);

    if (contact === null) {
      const error = new Error(`Contact with Id=${contactId} not found`);
      error.status = 404;
      throw error;
    }

    res.json({
      status: 'success',
      code: 200,
      message: 'Contant uploaded',
      data: {
        contact,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      const error = new Error('missing required name field');
      error.status = 400;
      throw error;
    }
    const contact = await contactsOperation.addContact(req.body);
    res.status(201).json({
      status: 'success',
      code: 201,
      message: 'Contant uploaded',
      data: {
        contact,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsOperation.removeContact(contactId);
    if (!contact) {
      const error = new Error(`Contact with Id=${contactId} not found`);
      error.status = 404;
      throw error;
    }
    res.json({
      status: 'success',
      code: 200,
      message: 'contact deleted',
      data: {
        contact,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      const error = new Error('missing fields');
      error.status = 400;
      throw error;
    }

    const { contactId } = req.params;
    const contact = await contactsOperation.updateContact(contactId, req.body);
    if (!contact) {
      const error = new Error(`Contact with Id=${contactId} not found`);
      error.status = 404;
      throw error;
    }

    res.json({
      status: 'success',
      code: 201,
      message: 'template message',
      data: {
        contact,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
