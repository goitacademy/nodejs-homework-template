const express = require('express');
const router = express.Router();
const functionContacts = require('../../models/contacts.js');

router.get('/', (req, res, next) => {
  const contactList = functionContacts.listContacts();
  res.status(200).json(contactList);
});

router.get('/:contactId', (req, res, next) => {
  const contactId = req.params.contactId;

  const foundContact = functionContacts.getContactById(
    contactId,
    `Contact not found!`
  );

  if (!foundContact) {
    return res.status(400).json({
      message: `Contact not found!`,
    });
  }

  res.status(200).json(foundContact);
});

router.post('/', (req, res, next) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({
      message: 'Missing required name field',
    });
  }

  const updateContact = functionContacts.addContact(name, email, phone);

  res.status(201).json(updateContact);
});

router.delete('/:contactId', (req, res, next) => {
  const contactId = req.params.contactId;

  const newContacts = functionContacts.removeContact(
    contactId,
    `Contact not found!`
  );

  if (!newContacts) {
    return res.status(400).json({
      message: `Contact not found!`,
    });
  }

  res
    .status(200)
    .json({ message: `Contact with ID=${contactId} deleted successfully!` });
});

router.put('/:contactId', (req, res, next) => {
  const contactId = req.params.contactId;
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({
      message: 'Missing required name field',
    });
  }

  const updateContacts = functionContacts.updateContact(
    contactId,
    name,
    email,
    phone,
    `Contact not found!`
  );

  if (!updateContacts) {
    return res.status(404).json({
      message: `Contact not found!`,
    });
  }

  res.status(200).json(updateContacts);
});

module.exports = router;
