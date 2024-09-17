const contacts = require("../models/contacts");

const { HttpError, ctrlWrapper } = require("../utils");

const getAll = async (req, res) => {
  const result = await contacts.listContacts();
  res.json(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);
  if (!result) {
    throw HttpError(404, "Not found!");
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

const updateContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body);
  if (!result) {
    throw HttpError(404, "Not found!");
  }
  res.json(result);
};

const deletedContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) {
    throw HttpError(404, "Not found!");
  }
  res.json({
    deletedContact: result,
    message: "Deleted successfully",
  });
};

module.exports = {
  getById: ctrlWrapper(getById),
  getAll: ctrlWrapper(getAll),
  addContact: ctrlWrapper(addContact),
  deletedContactById: ctrlWrapper(deletedContactById),
  updateContactById: ctrlWrapper(updateContactById),
};
