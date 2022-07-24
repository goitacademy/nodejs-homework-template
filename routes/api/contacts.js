const express = require('express')

const contacts = require('../../models/contacts');
const { createError } = require('../../helpers');
const { contactSchema } = require('../../schemas');

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result)
  } catch (error) {
    next(error);
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);

    if (!result) {
      throw createError(404);
    }

    res.json(result)
  } catch (error) {
    next(error);
  }
})

router.post('/', async (req, res, next) => {
  try {
    // Preventing lack of necessary data
    const { error } = contactSchema(req.body);
    if (error) {
      throw createError(400, "missing required name field");
    }

    const result = await contacts.addContact(req.body);
    res.status(201).json(result)
  } catch (error) {
    next(error);
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);

    if (!result) {
      throw createError(404);
    }

    res.json({
      message: "Contact deleted"
    });
  } catch (error) {
    next(error);
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    // Preventing lack of necessary data
    const { error } = contactSchema(req.body);
    if (error) {
      throw createError(400, "missing fields");
    }

    const { contactId } = req.params;
    const result = await contacts.updateContactById(contactId, req.body);

    if (!result) {
      throw createError(404);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
})

module.exports = router
