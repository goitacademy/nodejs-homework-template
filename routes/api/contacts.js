const express = require('express');
const contacts = require('../../models/index');
const router = express.Router();
const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),
  phone: Joi.number().min(3).max(16).required(),
});

router.get('/', async (req, res, next) => {
  try {
    const all = await contacts.listContacts();
    res.json(all);
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const contact = await contacts.getContactById(id);
    if (!contact) {
      res.status(404).json({ message: 'Not found' });
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error });
    }
    const { name, email, phone } = req.body;
    const contact = await contacts.addContact(name, email, phone);
    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const deletedContact = await contacts.removeContact(id);
    if (!deletedContact) {
      throw createError(404, 'Not found');
    }
    // res.status(204).json({ message: 'contact deleted' });
    res.json({ message: 'contact deleted' });
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error });
    }
    const id = req.params.contactId;
    const { name, email, phone } = req.body;
    const updateContact = await contacts.updateContact(id, name, email, phone);
    if (!updateContact) {
      res.status(404).json('not found');
    }
    res.json(updateContact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
