const { httpErrorFunc } = require('../helpers/httpErrorFunc');
const ctrlWrapper = require('../helpers/ctrlWrapper');

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../models/contacts');

const getAll = async (req, res) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
};

const getById = async (req, res) => {
  const result = await getContactById(req.params.contactId);
  if (!result) {
    throw httpErrorFunc(404, 'Not found');
  }
  res.status(200).json(result);
};

const add = async (req, res) => {
  const result = await addContact(req.body);
  res.status(201).json(result);
};

const deleteContact = async (req, res) => {
  const result = await removeContact(req.params.contactId);
  if (!result) {
    throw httpErrorFunc(404, 'Not found');
  }
  res.status(200).json({ message: 'contact deleted' });
};

const update = async (req, res) => {
  const result = await updateContact(req.params.contactId, req.body);
  if (!result) {
    throw httpErrorFunc(404, 'Not found');
  }
  res.status(200).json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteContact: ctrlWrapper(deleteContact),
  update: ctrlWrapper(update),
};
