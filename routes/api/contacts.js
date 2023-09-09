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
  name: Joi.string().min(3).max(30).required(),

  email: Joi.string().email().lowercase().required(),

  phone: Joi.string().min(5).max(13).required(),
});

const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(30),

  email: Joi.string().email().lowercase(),

  phone: Joi.string().min(5).max(13),
});

router.get('/', async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json({ contacts });
});

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) {
    res.status(404).json({ message: 'Not found' });
  } else {
    res.status(200).json(contact);
  }
});

router.post('/', async (req, res, next) => {
  try {
    Joi.attempt(req.body, addContactSchema);

    const newContact = await addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const removed = await removeContact(contactId);

  if (!removed) {
    res.status(404).json({ message: 'Not found' });
  } else {
    res.status(200).json({ message: 'Contact deleted' });
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const body = req.body;

    Joi.attempt(body, updateContactSchema);
    await updateContact(contactId, body);
    res.status(200).json({ message: 'Contact updated' });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
