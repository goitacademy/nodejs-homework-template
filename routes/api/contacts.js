const express = require('express')

const router = express.Router();

const contacts = require("../../models/contacts");

const { HttpError } = require('../../helpers');
const { nanoid } = require('nanoid')

const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string().pattern(/^[abc]+$/).trim().required(),
  email: Joi.string().email().trim().required(),
  phone: Joi.string().pattern(/^[abc]+$/).trim().required(),
});

router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);

  } catch (error) {
      res.status(500).json({ message: 'Server error' })
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);

    if (!result) {
      throw HttpError(404, 'Not found');
    }

    res.json(result);

  } catch (error) {
    next(error);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      throw HttpError(400, "missing required name field");
    }
    const body = {
      id: nanoid(),
      ...req.body
    }
    
    const result = await contacts.addContact(body);
    res.status(201).json(result);

  } catch (error) {
    next(error);
  }
})

router.delete('/:contactId', async (req, res, next) => {
    try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);

    if (!result) {
      throw HttpError(404, 'Not found');
    }

    res.json({ message: "contact deleted" });

  } catch (error) {
    next(error);
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {

    const { error } = schema.validate(req.body);
    if (error) {
      throw HttpError(400, "missing required name field");
    }
        const { contactId } = req.params;


    const result = await contacts.updateContact(contactId, req.body);
    if (!result) {
      throw HttpError(404, 'Not found');
    }

    res.json(result);

  } catch (error) {
    next(error);
  }
})

module.exports = router
