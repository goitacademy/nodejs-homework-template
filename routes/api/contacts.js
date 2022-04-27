const express = require('express');

const router = express.Router();

const contacts = require('../../models/contacts');
const { createError, contactsSchema } = require('../../helpers');

router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);

    if (!result) {
      throw createError(404);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;

    const { error } = contactsSchema.validate({ name, email, phone });
    if (error) {
      throw createError(400, error.message);
    }

    const result = await contacts.addContact(name, email, phone);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);

    if (!result) {
      throw createError(404);
    }

    res.json({ message: 'Contact deleted' });
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { name, email, phone } = req.body;

    const { error } = contactsSchema.validate({ name, email, phone });
    if (error) {
      throw createError(400, error.message);
    }

    const result = await contacts.updateContact(contactId, name, email, phone);
    if (!result) {
      throw createError(404);
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
