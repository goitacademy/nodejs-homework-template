const contacts = require('../models/contacts');
const HttpError = require('../utils/error');
const joiSchema = require('../schema/JoiSchema');
const ctrlWrapper = require('../utils/ctrlWrapper');

const listContacts = async (_, res) => {
  const data = await contacts.listContacts();
  res.json(data);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const data = await contacts.getContactById(contactId);
  if (!data) {
    throw HttpError(404, 'Not found');
  }
  res.json(data);
};

const addContact = async (req, res) => {
  const { error } = joiSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const data = await contacts.addContact(req.body);
  res.status(201).json(data);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const data = await contacts.removeContact(contactId);
  if (!data) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json({ "message": "contact deleted" });
};

const updateContact = async (req, res) => {
  const { error } = joiSchema.validate(req.body);
  if (error) {
    throw HttpError(400, 'missing fields');
  }
  const { contactId } = req.params;
  const data = await contacts.updateContact(contactId, req.body);
  if (!data) {
    throw HttpError(404, 'Not found');
  }
  res.json(data);
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
};