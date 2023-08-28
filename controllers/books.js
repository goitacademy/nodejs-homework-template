const contacts = require('../models/contacts');
const { HttpError, ctrlWrapper } = require('../utils');

const getContacts = async (req, res) => {
  const result = await contacts.listContacts();
  res.json(result);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.getContactById(id);
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const { body } = req;
  const result = await contacts.addContact(body);
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { params, body } = req;
  const { id } = params;
  const result = await contacts.updateContact(id, body);
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json(result);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.removeContact(id);
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.status(204).send();
};

module.exports = {
  getContacts: ctrlWrapper(getContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  deleteContact: ctrlWrapper(deleteContact),
};
