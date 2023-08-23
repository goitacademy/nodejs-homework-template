const contacts = require("../models/contacts");
const { httpError, ctrlWrapper } = require("../helpers");

const getAll = async (_, res) => {
  const result = await contacts.listContacts();
  res.json(result);
};

const getById = async (req, res) => {
  const result = await contacts.getById(req.params.contactId);
  if (!result) {
    throw httpError(404, "This contact was not found");
  }
  return res.json(result);
};

const addContact = async (req, res) => {
  const result = await contacts.addContact(req.body);
  return res.status(201).json(result);
};

const removeContact = async (req, res) => {
  const result = await contacts.removeContact(req.params.contactId);

  if (!result) {
    throw httpError(404, "This contact was not found");
  }

  return res.status(200).json({ message: "This contact was deleted" });
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body);

  if (!result) {
    throw httpError(404, "Not found");
  }

  return res.status(200).json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
};
