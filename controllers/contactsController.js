const contacts = require('../models/contacts');
const { HttpError, controllerWrapper } = require('../helpers');

const fetchAllContacts = async (req, res) => {
  const result = await contacts.listContacts();
  res.json(result);
};
const fetchContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);
  if (!result) {
    throw HttpError(404, 'Not found').HttpError;
  }
  res.json(result);
};
const addNewContact = async (req, res) => {
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};
const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json({ message: 'Contact deleted' });
};
const deleteContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body);
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json(result);
};

module.exports = {
  listContacts: controllerWrapper(fetchAllContacts),
  getContactById: controllerWrapper(fetchContactById),
  addNewContact: controllerWrapper(addNewContact),
  updateContact: controllerWrapper(updateContact),
  deleteContactById: controllerWrapper(deleteContactById),
};
