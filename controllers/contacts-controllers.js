const contacts = require("../models/contacts.js");

const HttpError = require("../helpers/index.js");

const { ctrlWrapper } = require("../decorators/index.js");

const listContacts = async (req, res) => {
  const result = await contacts.listContacts();
  res.status(200).json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);

  if (!result) {
    throw HttpError(404, `Contact with ${contactId} not found!`);
  }
  res.status(200).json(result);
};

const addContact = async (req, res) => {
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;

  const result = await contacts.removeContact(contactId);

  if (!result) {
    throw HttpError(404, `Contact with ${contactId} not found!`);
  }

  res.status(200).json({
    message: "Delete success",
  });
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;

  const result = await contacts.updateContact(contactId, req.body);

  if (!result) {
    throw HttpError(404, `Contact with ${contactId} not found!`);
  }

  res.status(201).json(result);
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
};
