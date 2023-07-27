const contacts = require("../models/contacts");
const { HttpError, assistWrapper } = require("../assistants");

const listContacts = async (req, res) => {
  const result = await contacts.listContacts();
  res.json(result);
};

const addContact = async (req, res) => {
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(201).json(result);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json({
    message: "Delete success",
  });
};

module.exports = {
  listContacts: assistWrapper(listContacts),
  addContact: assistWrapper(addContact),
  getById: assistWrapper(getById),
  removeContact: assistWrapper(removeContact),
  updateContact: assistWrapper(updateContact),
};