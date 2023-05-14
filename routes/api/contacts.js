const express = require('express');
const router = express.Router();
const Joi = require('joi');
const {
  listContacts,
  getContactById,
  addContact,
  updById,
  removeContact,
} = require('../../models/contacts');

const { HttpError } = require('../../utils');

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.number().required(),
});

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const contactId = await getContactById(id);

    if (!contactId) {
      throw HttpError(404, 'Not found');
    }

    res.status(200).json(contactId);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { name, phone, email } = req.body;
    const newContact = await addContact(name, email, phone);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { id } = req.params;
    const { name, phone, email } = req.body;

    const updContact = await updById(id, name, email, phone);

    if (!updContact) {
      throw HttpError(404, 'Not found');
    }

    res.status(200).json(updContact);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedContact = await removeContact(id);

    if (!deletedContact) {
      throw HttpError(404, 'Not found');
    }

    res.json({ message: 'Delete successed' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
