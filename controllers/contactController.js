const { v4: uuidv4 } = require('uuid');
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require('../models/contacts');
const { AppError } = require('../utils');

const getContactsList = async (_, res) => {
  const contacts = await listContacts();
  res.status(200).json({ contacts });
};

const getById = async (req, res, next) => {
  const contactId = req.params.contactId.toString();
  const contact = await getContactById(contactId);
  if (contact === null) {
    return next(new AppError(404, 'Not found'));
  }
  res.status(200).json({ contact });
};

const addNewContact = async (req, res) => {
  const contactToAdd = { id: uuidv4(), ...req.body };
  const addedContact = await addContact(contactToAdd);
  res.status(201).json({ contact: addedContact });
};

const deleteContact = async (req, res, next) => {
  const contactId = req.params.contactId.toString();
  const contact = await removeContact(contactId);
  if (contact === null) {
    return next(new AppError(404, 'Not found'));
  }
  res.status(200).json({ message: 'contact deleted' });
};

const updateContactById = async (req, res, next) => {
  const contactId = req.params.contactId.toString();
  const contact = await updateContact(contactId, req.body);
  if (contact === null) {
    return next(new AppError(404, 'Not found'));
  }
  res.status(200).json({ contact });
};

module.exports = {
  getContactsList,
  getById,
  addNewContact,
  deleteContact,
  updateContactById,
};
