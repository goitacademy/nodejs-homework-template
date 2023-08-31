const contacts = require("../models/contacts");
const { nanoid } = require("nanoid");
const { HttpError, ctrlWrapper } = require("../helpers");

const listContacts = async (req, res) => {
  const result = await contacts.listContacts();
  res.status(200).json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const deletedContacts = await contacts.removeContact(contactId);
  if (!deletedContacts) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ message: "contact deleted" });
};

const addContact = async (req, res) => {
  const { name, email, phone } = req.body;
  const id = nanoid();
  const newContact = await contacts.addContact({ id, name, email, phone });
  res.status(201).json(newContact);
};

const updateContact = async (req, res) => {
  const body = req.body;
  if (!body) {
    throw HttpError(400, "missing fields");
  }
  const { contactId } = req.params;
  const updatedContact = await contacts.updateContact(contactId, body);
  if (!updatedContact) {
    throw HttpError(404, "Not found");
  }
  res.json(updatedContact);
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  removeContact: ctrlWrapper(removeContact),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
};
