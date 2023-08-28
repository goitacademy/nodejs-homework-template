const express = require('express');
const contacts = require('../../models/contacts');
const { HttpError, schema } = require('../../utils');
const router = express.Router();

router.get('/', async (_, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.getContactById(id);
    if (!result) {
      throw HttpError(404, 'Not found');
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post('/', async ({ body }, res, next) => {
  try {
    const { error } = schema.validate(body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contacts.addContact(body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async ({ params, body }, res, next) => {
  try {
    const { id } = params;
    const { error } = schema.validate(body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contacts.updateContact(id, body);
    if (!result) {
      throw HttpError(404, 'Not found');
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async ({ params }, res, next) => {
  try {
    const { id } = params;
    const result = await contacts.removeContact(id);
    if (!result) {
      throw HttpError(404, 'Not found');
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
