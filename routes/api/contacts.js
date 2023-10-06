const express = require('express');
const contacts = require('../../models/contacts.js');
const { HttpError } = require('../../helpers');
const Joi = require('joi');

const router = express.Router();

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: 
});

router.get('/', async (req, res, next) => {
  try {
    res.json(await contacts.listContacts());
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const contact = await contacts.getContactById(req.params.contactId);
    if (!contact) {
      throw HttpError(404, 'Not found');
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    if (name && email && phone) {
      res.status(201).json(await contacts.addContact(req.body));
    } else {
      res.status(404).json({ message: 'missing required name field' });
    }
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  const contact = await contacts.removeContact(req.params.contactId);
  contact
    ? res.json({ message: 'contact deleted' })
    : res.status(404).json({ message: 'Not found' });
});

router.put('/:contactId', async (req, res, next) => {
  console.log(req.body);
  if (!req.body) {
    res.status(400).json({ message: '"missing fields"' });
  }
});

module.exports = router;
