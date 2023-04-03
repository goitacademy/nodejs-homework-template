const Contact = require('../models/contactsModel');
const { AppError } = require('../utils');

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require('../models/contacts');

const getContactsList = async (_, res) => {
  const contacts = await listContacts();
  res.status(200).json({ contacts });
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  res.status(200).json({ contact });
};

const addNewContact = async (req, res) => {
  const newContact = await addContact(req.body);
  res.status(201).json({ contact: newContact });
};

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  await removeContact(contactId);
  res.status(200).json({ message: 'contact deleted' });
};

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await updateContact(contactId, req.body);
  res.status(200).json({ contact });
};

module.exports = {
  getContactsList,
  getById,
  addNewContact,
  deleteContact,
  updateStatusContact,
};
