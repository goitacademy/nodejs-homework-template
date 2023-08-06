const express = require('express')
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../models/contacts')

const router = express.Router()

router.get('/', async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json({ message: contacts });
});

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const response = await getContactById(contactId);
  response ? res.status(200).json({ message: response }) : res.status(404).json({ message: 'Not found' });
});

router.post('/', async (req, res, next) => {
  const body = req.body;
  const response = await addContact(body);
  response ? res.status(201).json({ message: response }) : res.status(400).json({ "message": "missing required name - field" });
});

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  response = await removeContact(contactId);
  response ? res.status(200).json({ message: response }) : res.status(404).json({ message: 'Not found' });
});

router.put('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const updatedData = req.body;
  const response = await updateContact(contactId, updatedData);
  response ? res.status(200).send(response) : res.status(404).json({ message: 'Not found' });
});

module.exports = router
