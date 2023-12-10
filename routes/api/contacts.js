const express = require('express');
const uuid = require('uuid').v4;
const models = require('../../models/contacts');

const router = express.Router();

router.get('/', async (req, res) => {
  const contacts = await models.listContacts();
  res.json(contacts);
});

router.get('/:contactId', async (req, res) => {
  const ID = req.params.contactId;
  const contact = await models.getContactById(ID);
  if (contact) res.json(contact);
  else res.status(404).json({ message: 'Not found' });
});

router.post('/', async ({ body }, res) => {
  const bodyKeys = Object.keys(body);

  if (!bodyKeys.includes('name')) {
    res.status(400).json({ message: 'missing required field: name' });
    return;
  }
  if (!bodyKeys.includes('email')) {
    res.status(400).json({ message: 'missing required field: email' });
    return;
  }
  if (!bodyKeys.includes('phone')) {
    res.status(400).json({ message: 'missing required field: phone' });
    return;
  }

  const id = uuid();
  const add = await models.addContact({ id, ...body });
  res.status(201).json(add);
});

router.delete('/:contactId', async (req, res) => {
  const ID = req.params.contactId;
  const deletedContact = await models.removeContact(ID);
  if (deletedContact) res.status(200).json(deletedContact);
  else res.status(404).json({ message: 'Not found' });
});

router.put('/:contactId', async ({ body, params }, res) => {
  const bodyKeys = Object.keys(body);
  if (bodyKeys.length < 1) {
    res.status(400).json({ message: 'missing fields' });
    return;
  }
  const ID = params.contactId;
  const updatedContact = await models.updateContact(ID, body);
  if (!updatedContact) {
    res.status(404).json({ message: 'Not found' });
    return;
  }
  res.json(updatedContact);
});

module.exports = router;
