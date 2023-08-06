const contacts = require('../models/contacts');

const { HttpError, ctrlWrapper } = require('../helpers');

const listContacts = async (req, res) => {
  const result = await contacts.listContacts();
  res.status(200).json(result);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.getContactById(id);
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json(result);
};

const addContact = async (req, res) => {
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

const removeContact = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.removeContact(id);
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json({
    message: 'Deleted',
  });
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.updateById(id, req.body);

  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json({
    message: 'Contact Updated',
  });
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  removeContact: ctrlWrapper(removeContact),
  addContact: ctrlWrapper(addContact),
  updateById: ctrlWrapper(updateById),
};