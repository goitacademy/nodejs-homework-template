const contacts = require("../models/contactsModel");

const { ApiError, ctrlWrapper } = require("../helpers");

const listContacts = async (req, res) => {
  const result = await contacts.listContacts();
  res.json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);

  if (!result) {
    throw ApiError(404, "Not found");
  }
  res.json(result);
};

const removeContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) {
    throw ApiError(404, "Not found");
  }
  res.json({ message: "Deleted successfully" });
};

const updateContactById = async (req, res) => {
  const { name, email, phone } = req.body;
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, {
    name,
    email,
    phone,
  });
  if (!result) {
    throw ApiError(404, "Not found");
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const { name, email, phone } = req.body;
  const result = await contacts.addContact({ name, email, phone });
  res.status(201).json(result);
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  updateContactById: ctrlWrapper(updateContactById),
  removeContactById: ctrlWrapper(removeContactById),
};
