const express = require('express');
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../models/contacts');
const {schemaAdd, schemaUpdate} = require('../../validation/validation');

const router = express.Router();

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
  try {
    const body = await schemaAdd.validateAsync(req.body);
    const response = await addContact(body);
    res.status(201).json({ message: response });
  }
  catch (err) {
    res.status(400).json({ message: err.details[0].message })
    console.log(err);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const response = await removeContact(contactId);
  response ? res.status(200).json({ message: response }) : res.status(404).json({ message: 'Not found' });
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updatedData = await schemaUpdate.validateAsync(req.body);
    console.log(updatedData);
    const response = await updateContact(contactId, updatedData);
    res.status(200).send(response)
  }
  catch (err) {
    res.status(400).json({ message: err.details[0].message });
    console.log(err);
  }
});

module.exports = router
