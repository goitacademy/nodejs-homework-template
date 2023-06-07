const contacts = require('../models/contacts');

const { httpError, ctrlWrapper } = require('../helpers');

const getAll = async (req, res) => {
  const result = await contacts.listContacts();
  res.status(200).json(result);
};

const getContactById = async (req, res) => {
  const result = await contacts.getContactById(req.params.contactId);
  if (!result) {
    throw httpError(404, 'Not Found');
  }
  res.status(200).json(result);
};

const addContact = async (req, res) => {
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

const deleteContactByID = async (req, res) => {
  const result = await contacts.removeContact(req.params.contactId);
  if (!result) {
    throw httpError(404, 'Not Found');
  }
  res.status(200).json({ message: 'contact deleted' });
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body);
  if (!result) {
    throw httpError(404, 'Not Found');
  }
  res.status(200).json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  deleteContactByID: ctrlWrapper(deleteContactByID),
  updateContact: ctrlWrapper(updateContact),
};
