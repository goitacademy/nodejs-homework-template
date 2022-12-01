/* eslint-disable linebreak-style */
const {v4: genereteId} = require('uuid');
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require('../models/contacts');

const listContactsController = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json({contacts});
  } catch (error) {
    console.error(error);
  }
};

const getContactByIdController = async (req, res, next) => {
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
};

const addContactController = async (req, res, next) => {
  try {
    const {name, phone, email} = req.body;
    const result = await addContact({id: genereteId(), name, phone, email});
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
  }
};

const removeContactController = async (req, res, next) => {
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
};

const updateContactController = async (req, res, next) => {
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
};

module.exports = {
  getContactByIdController,
  listContactsController,
  removeContactController,
  addContactController,
  updateContactController,
};
