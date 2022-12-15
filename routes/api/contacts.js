const express = require('express');
const Joi = require('joi');

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require('../../models/contacts');

const router = express.Router();

const addContactSchema = Joi.object({
  name: Joi.string().alphanum().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const updateContactSchema = Joi.object({
  name: Joi.string().alphanum(),
  email: Joi.string().email(),
  phone: Joi.string(),
}).min(1);

router.get('/', async (req, res, next) => {
  const data = await listContacts();
  res.json(data);
});

router.get('/:contactId', async (req, res, next) => {
  const data = await getContactById(req.params.contactId);
  if (data.length === 0) {
    res.status(404).json({ message: 'Not found' });
    return;
  }
  res.json(data);
});

router.post('/', async (req, res, next) => {
  const { error } = await addContactSchema.validate(req.body);
  if (error) {
    console.log(error);
    res.status(400).json({
      message: 'missing or incorrect fields',
    });
    return;
  }
  const data = await addContact(req.body);
  res.status(201).json(data);
});

router.delete('/:contactId', async (req, res, next) => {
  const data = await removeContact(req.params.contactId);
  if (data) {
    res.json({ message: 'contact deleted' });
    return;
  }
  res.status(404).json({ message: 'Not found' });
});

router.put('/:contactId', async (req, res, next) => {
  const { error } = await updateContactSchema.validate(req.body);
  if (error) {
    console.log(error);
    res.status(400).json({
      message: 'missing or incorrect fields',
    });
    return;
  }

  const updatedContact = await updateContact(req.params.contactId, req.body);
  if (updatedContact) {
    res.json(updatedContact);
    return;
  }
  res.status(404).json({ message: 'Not found' });
});

module.exports = router;
