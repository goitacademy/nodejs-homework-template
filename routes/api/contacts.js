const express = require('express');

const contactsOperations = require('../../models/contacts');

const { RequestError, addSchema } = require('../../helpers');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const result = await contactsOperations.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperations.getContactById(contactId);

    if (!result) {
      throw RequestError(404, 'Not found');
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw RequestError(400, error.message);
    }

    const newContact = { ...req.body };

    const result = await contactsOperations.addContact(newContact);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const result = await contactsOperations.removeContact(contactId);

    if (!result) {
      throw RequestError(404, 'Not found');
    }

    res.json({ message: 'contact deleted' });
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const {
      params: { contactId },
      body,
    } = req;

    if (Object.keys(body).length === 0) {
      throw RequestError(400, 'missing fields');
    }

    const { error } = addSchema.validate(body);

    if (error) {
      throw RequestError(400, error.message);
    }

    const result = await contactsOperations.updateContact(contactId, body);

    if (!result) {
      throw RequestError(404, 'Not found');
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
