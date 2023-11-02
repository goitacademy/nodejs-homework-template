const operations = require('../models/contacts');
const { HttpError, ctrlWrapper } = require('../utils');

const getAll = async (_, res, next) => {
  const contacts = await operations.listContacts();
  if (!contacts) {
    throw HttpError({ status: 404, message: 'Not found' });
  }
  res.status(200).json(contacts);
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await operations.getContactById(contactId);
  if (!contact) {
    throw HttpError({ status: 404, message: 'Not found' });
  }
  res.status(200).json(contact);
};

const add = async (req, res, next) => {
  try {
    const contact = await operations.addContact(req.body);
    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await operations.removeContact(contactId);
  if (!contact) {
    throw HttpError({ status: 404, message: 'Not found' });
  }
  res.status(200).json({ message: 'contact deleted' });
};

const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await operations.updateContact(contactId, req.body);
  if (!contact) {
    throw HttpError({ status: 404, message: 'Not found' });
  }
  res.status(200).json(contact);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
};
