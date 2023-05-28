const { HttpError, ctrlWrapper } = require("../helpers");
const contacts = require("../models/contacts");

const getAll = async (req, res, next) => {
  const contactsList = await contacts.listContacts();
  res.json(contactsList);
};

const getById = async (req, res, next) => {
  const contact = await contacts.getContactById(req.params.contactId);
  if (!contact) {
    throw HttpError(404);
  }
  res.json(contact);
};

const add = async (req, res, next) => {
  const contact = await contacts.addContact(req.body);
  res.status(201).json(contact);
};

const updateById = async (req, res, next) => {
  const contact = await contacts.updateContact(req.params.contactId, req.body);
  res.status(200).json(contact);
};

const deleteById = async (req, res, next) => {
  const contact = await contacts.removeContact(req.params.contactId);
  if (!contact) {
    throw HttpError(404);
  }
  res.status(200).json({ message: "Contact deleted" });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};
