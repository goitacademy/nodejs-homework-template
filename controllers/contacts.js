const { ctrlWrapper, HttpError } = require("../helpers");
const contacts = require("../models/contacts");

const getAll = async (req, res, next) => {
  const data = await contacts.listContacts();
  res.json(data);
};

const addContact = async (req, res, next) => {
  const contact = await contacts.addContact(req.body);
  res.status(201).json(contact);
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await contacts.getContactById(contactId);
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.json(contact);
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const updatedContact = await contacts.updateContact(contactId, req.body);
  if (!updatedContact) {
    throw HttpError(404, "Not found");
  }
  res.json(updatedContact);
};

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const removedContact = await contacts.removeContact(contactId);
  if (!removedContact) {
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "contact deleted",
  });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  addContact: ctrlWrapper(addContact),
  getContactById: ctrlWrapper(getContactById),
  updateContact: ctrlWrapper(updateContact),
  deleteContact: ctrlWrapper(deleteContact),
};
