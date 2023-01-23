const express = require('express');
const Joi = require('joi');
const contacts = require('../../models/contacts');

const router = express.Router();

router.get('/', async (req, res, next) => {
  const data = await contacts.listContacts();
  res.json(data);
});

router.get('/:contactId', async (req, res, next) => {
  const data = await contacts.getContact(req.params.contactId);
  if (data.length <= 0) {
    return res.status(400).json({ message: 'contact not found' });
  }
  res.json(data);
});

router.post('/', async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    phone: Joi.string()
      .pattern(new RegExp('^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$'))
      .required(),
  });
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({ message: 'bad request', info: validationResult.error });
  }

  const { name, email, phone } = req.body;
  const data = await contacts.addContact(name, email, phone);
  res.json(data);
});

router.delete('/:contactId', async (req, res, next) => {
  const data = await contacts.removeContact(req.params.contactId);
  if (!data) {
    return res.status(400).json({ message: 'contact not found' });
  }
  res.status(200).json({ message: 'done' });
});

router.put('/:contactId', async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    phone: Joi.string()
      .pattern(new RegExp('^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$'))
      .required(),
  });
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({ message: 'bad request', info: validationResult.error });
  }

  await contacts.updateContact(req.params.contactId, req.body);
  res.status(200).json({ message: 'done' });
});

module.exports = router;
// test commit