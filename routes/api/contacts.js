const express = require('express');
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require('../../models/contacts');
const {contactValidation} = require('../../middlewares/contactsValidation');
const {v4: genereteId} = require('uuid');

const router = new express.Router();

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json({contacts});
  } catch (error) {
    console.error(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const {contactId} = req.params;
    const searchedContact = await getContactById(contactId);

    if (!searchedContact) {
      return res.status(404).json({message: 'Not found'});
    }

    res.status(200).json(searchedContact);
  } catch (error) {
    console.error(error);
  }
});

router.post('/', contactValidation, async (req, res, next) => {
  try {
    const {name, phone, email} = req.body;
    const result = await addContact({id: genereteId(), name, phone, email});
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const contacts = await listContacts();
    const {contactId} = req.params;

    const contactToDelete = contacts.find((contact) =>
      contact.id === contactId);
    if (!contactToDelete) {
      return res.status(400).json({message: 'not found'});
    }

    await removeContact(contactId);
    res.status(200).json({message: 'contact deleted'});
  } catch (error) {
    console.error(error);
  }
});

router.put('/:contactId', contactValidation, async (req, res, next) => {
  try {
    const {contactId} = req.params;
    const {body} = req;
    const contacts = await listContacts();

    const contactToUpdate = contacts.find((contact) =>
      contact.id === contactId);
    if (!contactToUpdate) {
      return res.status(400).json({message: 'not found'});
    }

    const result = await updateContact(contactId, body);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
