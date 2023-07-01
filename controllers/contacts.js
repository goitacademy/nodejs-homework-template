const { HttpError, ctrlWrapper } = require("../helpers");
const contacts = require("../models/contacts");

const getAll = async (req, res, next) => {
  const allContacts = await contacts.listContacts();
  res.json(allContacts);
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await contacts.getContactById(contactId);
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.json(contact);
};

const add = async (req, res, next) => {
  const newContact = await contacts.addContact(req.body);
  res.status(201).json(newContact);
};

const deleteById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "delete success" });
};

const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body);
  if (!result) {
    throw HttpError(404, "Not found id");
  }
  res.json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
};
