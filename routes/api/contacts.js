const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const Joi = require('joi');
const { listContacts, getById, addContact, removeContact, updateContact } = require('../../models/contacts');

// Schematy walidacji
const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required()
});

const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string()
}).or('name', 'email', 'phone');

// Trasy
router.get('/', (req, res) => {
  const contacts = listContacts();
  res.json(contacts);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const contact = getById(id);

  if (contact) {
    res.json(contact);
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});

router.post('/', (req, res) => {
  const { error } = contactSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: `Validation error: ${error.details.map(detail => detail.message).join(', ')}` });
  }

  const newContact = { id: uuidv4(), ...req.body };
  addContact(newContact);
  res.status(201).json(newContact);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const deleted = removeContact(id);

  if (deleted) {
    res.json({ message: 'Contact deleted' });
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { error } = updateContactSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: `Validation error: ${error.details.map(detail => detail.message).join(', ')}` });
  }

  const updatedContact = updateContact(id, req.body);

  if (updatedContact) {
    res.json(updatedContact);
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});

module.exports = router;



