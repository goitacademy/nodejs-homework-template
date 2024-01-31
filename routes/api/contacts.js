const express = require('express');
const router = express.Router();
const Joi = require('joi');

const contacts = require('../../models/contacts');
const { HttpError } = require('../../helpers');

const addShema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});
const putShema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
}).min(1);

router.get('/', async (req, res, next) => {
  try {
    const list = await contacts.listContacts();
    res.json(list);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const el = await contacts.getContactById(req.params.id);
    if (!el) {
      throw HttpError(404, 'Not found');
    }
    res.json(el);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = addShema.validate(req.body);
    console.log(error);
    if (error) {
      throw HttpError(400, error.message);
    }
    const newContact = await contacts.addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error } = putShema.validate(req.body);
    if (error) {
      throw HttpError(400, 'Body must have at least one field');
    }

    const updatedEl = await contacts.updateContact(id, req.body);
    if (!updatedEl) {
      throw HttpError(404, 'Not found');
    }
    res.json(updatedEl);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteEl = await contacts.removeContact(id);
    if (!deleteEl) {
      throw HttpError(404, 'Not found');
    }
    res.json(deleteEl);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
