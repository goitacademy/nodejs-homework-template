const express = require('express');
const Joi = require('joi');

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../models/contacts');

const router = express.Router();

const additionSchema = Joi.object({
  name: Joi.string().alphanum().required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .regex(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/)
    .required(),
});

const updateSchema = Joi.object({
  name: Joi.string().alphanum(),
  email: Joi.string().email(),
  phone: Joi.string().regex(
    /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/
  ),
}).xor('name', 'email', 'phone');

router.get('/', async (_, res) => {
  try {
    const data = await listContacts();

    res.json(data);
  } catch {
    res.status(500).json({ text: 'Server error has occured.' });
  }
});

router.get('/:contactId', async (req, res) => {
  const contactId = req.params.contactId;

  try {
    const data = await getContactById(contactId);

    if (!data) {
      res.status(404).json({ message: 'Contact has not been found.' });
    }

    res.json(data);
  } catch {
    res.status(500).json({ text: 'Server error has occured.' });
  }
});

router.post('/', async (req, res) => {
  const body = req.body;

  const { error: validationError } = additionSchema.validate(body);

  if (validationError) {
    res.status(400).json({ message: validationError.details[0].message });
    return;
  }

  try {
    const addedContact = await addContact(body);

    res.status(201).json(addedContact);
  } catch {
    res.status(500).json({ text: 'Server error has occured.' });
  }
});

router.delete('/:contactId', async (req, res) => {
  const contactId = req.params.contactId;

  try {
    const removedContact = await removeContact(contactId);

    if (!removedContact) {
      res.status(404).json('Contact has not been found.');
    }

    res.json(removedContact);
  } catch {
    res.status(500).json({ text: 'Server error has occured.' });
  }
});

router.put('/:contactId', async (req, res) => {
  const contactId = req.params.contactId;
  const body = req.body;

  const { error: validationError } = updateSchema.validate(body);

  if (validationError) {
    res.status(400).json({ message: validationError.details[0].message });
    return;
  }

  try {
    const updatedContact = await updateContact(contactId, body);

    if (!updatedContact) {
      res.status(404).json({ message: 'Contact has not been found.' });
    }

    res.json(updatedContact);
  } catch {
    res.status(500).json({ text: 'Server error has occured.' });
  }
});

module.exports = router;
