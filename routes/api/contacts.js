const express = require('express');
const { NotFound } = require('http-errors');
const contactsHelprer = require('../../models/contacts');
const Joi = require('joi');

const router = express.Router();

const contanctSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactsHelprer.listContacts();

    res.json({
      status: 'success',
      code: 200,
      data: {
        result: contacts,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const result = await contactsHelprer.getContactById(contactId);

    if (!result) throw new NotFound(`Product with id ${contactId} not found`);

    res.json({
      status: 'succes',
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = contanctSchema.validate(req.body);

    if (error) {
      error.status = 400;
      throw error;
    }

    const result = await contactsHelprer.addContact(req.body);

    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsHelprer.removeContact(contactId);

    if (!result) throw new NotFound(`Product with id ${contactId} not found`);

    res.json({
      status: 'success',
      code: 200,
      message: 'contact deleted',
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = contanctSchema.validate(req.body);

    if (error) {
      error.status = 400;
      throw error;
    }

    const { contactId } = req.params;
    const result = await contactsHelprer.updateContact(contactId);

    if (!result) throw new NotFound(`Product with id ${contactId} not found`);

    res.json({
      status: 'success',
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
