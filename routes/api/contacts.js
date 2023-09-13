const express = require('express');
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../models/contacts');
const { schemaAdd, schemaUpdate } = require('../../validation/validation');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json({ message: contacts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Unknown Error' });
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const response = await getContactById(contactId);
    response
      ? res.status(200).json({ message: response })
      : res.status(404).json({ message: 'Not found' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Unknown Error' });
  }
});

router.post('/', async (req, res, next) => {
  try {
    const body = await schemaAdd.validateAsync(req.body);
    const response = await addContact(body);
    res.status(201).json({ message: response });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.details[0].message });
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const response = await removeContact(contactId);
    response
      ? res.status(200).json({ message: response })
      : res.status(404).json({ message: 'Not found' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Unknown Error' });
  }
});

router.put('/:contactId', (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { error } = schemaUpdate.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const updatedData = req.body;
    const response = updateContact(contactId, updatedData);

    if (response) {
      res.status(200).send(response);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Unknown Error' });
  }
});


module.exports = router;
