const contacts = require('../models/contacts');
const { HttpError, ctrlWrapper } = require('../helpers');
const { newContSchema } = require('../schemas/');

const getList = async (req, res) => {
  const list = await contacts.listContacts();
  res.json(list);
};
const getById = async (req, res) => {
  const contactById = await contacts.getContactById(req.params.contactId);
  if (!contactById) {
    throw HttpError(404, 'not found');
  }
  res.json(contactById);
};
const add = async (req, res) => {
  const { error } = newContSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const result = await contacts.addContact(req.body);
  console.log(result);
  res.status(201).json(result);
};
const del = async (req, res) => {
  const deletedContact = await contacts.removeContact(req.params.contactId);
  if (!deletedContact) {
    throw HttpError(404, 'Not found');
  }
  res.json({ message: 'contact deleted' });
};
const update = async (req, res) => {
  const bodyLength = Object.keys(req.body).length;
  if (bodyLength === 0) {
    res.status(400).json({ message: 'missing fields' });
    return;
  }
  const { error } = newContSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const { contactId } = req.params;
  const updatedContact = await contacts.updateContact(contactId, req.body);
  res.json(updatedContact);
};

module.exports = {
  getList: ctrlWrapper(getList),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  del: ctrlWrapper(del),
  update: ctrlWrapper(update),
};
