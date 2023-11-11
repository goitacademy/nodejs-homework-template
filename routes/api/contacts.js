const express = require('express');
const router = express.Router();
const contactsModel = require('../../models/contacts');

router.get('/', async (req, res, next) => {
  const contacts = await contactsModel.listContacts();
  res.json(contacts);
});

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await contactsModel.getContactById(contactId);

  if (contact) {
    res.json(contact);
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newContact = await contactsModel.addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactsModel.removeContact(contactId);

  if (result) {
    res.json({ message: 'Contact deleted' });
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});

router.put('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const updatedContact = await contactsModel.updateContact(
      contactId,
      req.body
    );
    res.json(updatedContact);
  } catch (error) {
    res.status(404).json({ message: 'Not found' });
  }
});

module.exports = router;
