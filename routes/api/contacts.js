const express = require('express');
const createError = require('http-errors');

const { contacts: ctrl } = require('../../controllers/index');
const contactsOperations = require('../../models/contacts');

const schema = require('../../schemas/contactSchema');

const router = express.Router();

router.get('/', ctrl.getAll);

router.get('/:contactId', ctrl.getById);

router.post('/', async (req, res, next) => {
  try {
    const body = req.body;

    const { error } = schema.validate(body);
    if (error) {
      throw createError(400, error.message);
    }
    if (
      body.name === undefined ||
      body.email === undefined ||
      body.phone === undefined
    ) {
      throw createError(400, 'missing required name field');
    }

    const result = await contactsOperations.addContact(req.body);

    res.status(201).json({
      status: 'added',
      code: 201,
      data: { result },
    });
  } catch (err) {
    next(err);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const result = await contactsOperations.removeContact(contactId);

    if (result === undefined) {
      throw createError(404, 'Not found');
    }
    res.status(200).json({
      status: 'succes',
      code: 200,
      message: 'contact deleted',
    });
  } catch (err) {
    next(err);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const { error } = schema.validateAsync(req.body);
    if (error) {
      throw createError(400, error.message);
    }

    const { name, email, phone } = req.body;

    if (name === undefined || email === undefined || phone === undefined) {
      throw createError(400, 'missing fields');
    }

    const result = await contactsOperations.updateContact(contactId, req.body);

    if (!result) {
      throw createError(404, 'Not found');
    }

    res.json({
      status: 'success',
      code: 200,
      message: 'updated',
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
