const contacts = require("../models/contacts");
const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res, next) => {
  const dataContactList = await contacts.listContacts();
  res.status(200).json(dataContactList);
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const contactInfoById = await contacts.getContactById(contactId);
  if (!contactInfoById) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(contactInfoById);
};

const addContact = async (req, res, next) => {
  const addContacts = await contacts.addContact(req.body);
  res.status(201).json(addContacts);
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body);
  if (!result) {
    throw HttpError(404, "missing fields");
  }
  res.status(200).json(result);
};

const deletedContact = async (req, res, next) => {
  const { contactId } = req.params;
  const deleteContact = await contacts.removeContact(contactId);
  if (!deleteContact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ message: "contact deleted" });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  deletedContact: ctrlWrapper(deletedContact),
};
