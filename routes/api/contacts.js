/*const express = require('express');
const router = express.Router();
const Joi = require('joi');
const contactsModel = require('../../models/contacts');

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const updateContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

// GET /api/contacts
router.get('/', (req, res) => {
  const contacts = contactsModel.listContacts();
  res.status(200).json(contacts);
});

// GET /api/contacts/:id
router.get('/:id', (req, res) => {
  const contact = contactsModel.getContactById(req.params.id);
  if (contact) {
    res.status(200).json(contact);
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});

// POST /api/contacts
router.post('/', (req, res) => {
  const { error } = contactSchema.validate(req.body);

  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return;
  }

  const { name, email, phone } = req.body;
  const newContact = contactsModel.addContact({ name, email, phone });
  res.status(201).json(newContact);
});

// DELETE /api/contacts/:id
router.delete('/:id', (req, res) => {
  const contact = contactsModel.getContactById(req.params.id);

  if (!contact) {
    res.status(404).json({ message: 'Contact not found' });
    return;
  }

  const result = contactsModel.removeContact(req.params.id);
  if (result) {
    res.status(200).json({ message: 'Contact deleted' });
  } else {
    res.status(500).json({ message: 'Error deleting contact' });
  }
});


// PUT /api/contacts/:id
router.put('/:id', (req, res) => {
  const { error } = updateContactSchema.validate(req.body); // Utiliza el esquema de validación para actualizar

  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return;
  }

  const updatedContact = contactsModel.updateContact(req.params.id, req.body);
  if (updatedContact) {
    res.status(200).json(updatedContact);
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});

module.exports = router;
