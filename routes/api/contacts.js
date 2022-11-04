const express = require('express');
const Joi = require('joi');
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../models/contacts.js');

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  phone: Joi.string().pattern(
    /^\+?(\d{10,12}|(38|)(\s?(\(\d{3}\)\s?|\d{3}\s)(\d{7}|\d{3}(\s|-)\d{2}(\s|-)?\d{2})))$/
  ),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),
});

const router = express.Router();

router.get('/', async (req, res) => {
  const contacts = await listContacts();
  if (contacts) {
    res.status(200).json(contacts);
  } else {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:contactId', async (req, res) => {
  const id = req.params.contactId;
  const contact = await getContactById(id);
  if (contact) {
    res.status(200).json(contact);
  } else {
    res.status(400).json({ message: 'Not found' });
  }
});

router.post('/', async (req, res) => {
  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    return res.status(400).send({ message: 'missing required name field' });
  } else {
    const contact = await addContact(req.body);
    res.status(201).send(contact);
  }
});

router.delete('/:contactId', async (req, res) => {
  const id = req.params.contactId;
  const contact = await removeContact(id);
  if (contact) {
    res.status(200).send({ message: 'contact deleted' });
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});

router.put('/:contactId', async (req, res) => {
  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    return res.status(400).send({ message: 'missing fields' });
  }

  const id = req.params.contactId;
  const contact = await updateContact(id, req.body);
  if (contact) {
    res.status(200).send(contact);
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});

module.exports = router;
