const contacts = require('../models/contacts');
const { HttpError, CtrlWrapper } = require('../helpers');

const getAll = async (req, res, next) => {
  res.json(await contacts.listContacts());
};

const getById = async (req, res, next) => {
  const contact = await contacts.getContactById(req.params.contactId);
  if (!contact) {
    throw HttpError(404, 'Contact not found');
  }
  res.json(contact);
};

const add = async (req, res, next) => {
  res.status(201).json(await contacts.addContact(req.body));
};

const remove = async (req, res, next) => {
  const result = await contacts.removeContact(req.params.contactId);
  if (!result) {
    throw HttpError(404, 'Contact not found');
  }
  res.status(200).json({ message: 'contact deleted' });
};

const update = async (req, res, next) => {
  const result = await contacts.updateContact(req.params.contactId, req.body);
  if (!result) {
    throw HttpError(404, 'Contact not found');
  }
  res.status(200).json(result);
};

module.exports = {
  getAll: CtrlWrapper(getAll),
  getById: CtrlWrapper(getById),
  add: CtrlWrapper(add),
  remove: CtrlWrapper(remove),
  update: CtrlWrapper(update),
};
