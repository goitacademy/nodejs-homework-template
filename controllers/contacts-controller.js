const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../models/contacts');

const { HttpError } = require('../helpers');

const { ctrlWrapper } = require('../decorators');

const listContactsCtrl = async (req, res) => {
  const result = await listContacts();
  res.json(result);
};

const getContactByIdCtrl = async (req, res) => {
  const { contactId } = req.params;
  const result = await getContactById(contactId);
  if (!result) throw HttpError(404);
  res.json(result);
};

const addContactCtrl = async (req, res) => {
  const newContacts = await addContact(req.body);
  res.status(201).json(newContacts);
};

const removeContactCtrl = async (req, res) => {
  const { contactId } = req.params;
  const result = await removeContact(contactId);
  if (!result) throw HttpError(404);
  res.json({ message: 'contact deleted' });
};

const updateContactCtrl = async (req, res) => {
  const { contactId } = req.params;
  const result = await updateContact(contactId, req.body);
  if (!result) throw HttpError(404);
  res.json(result);
};

const isBodyEmptyCtrl = async (req, _, next) => {
  if (Object.keys(req.body).length === 0) {
    throw HttpError(400);
  }
  next();
};

module.exports = {
  listContacts: ctrlWrapper(listContactsCtrl),
  getContactById: ctrlWrapper(getContactByIdCtrl),
  addContact: ctrlWrapper(addContactCtrl),
  updateContact: ctrlWrapper(updateContactCtrl),
  removeContact: ctrlWrapper(removeContactCtrl),
  isBodyEmpty: ctrlWrapper(isBodyEmptyCtrl),
};
