const contacts = require("../models/contacts");
const { HttpError, ctrlWrapper } = require("../helpers");

// const {readContacts, writeContacts} = require('../function/readWriteContacts')

const listContacts = async (req, res) => {
  const data = await contacts.listContacts();
  res.json(data);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const data = await contacts.getContactById(contactId);
  if (!data) {
    throw new HttpError(404, "Contact not found");
  }
  res.json(data);
};

const addContact = async (req, res) => {
  const data = await contacts.addContact(req.body);
  res.status(201).json(data);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const data = await contacts.removeContact(contactId);
  if (!data) {
    throw new HttpError(404, "Contact not found");
  }
  res.json({ message: "contact deleted" });
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const data = await contacts.updateContact(contactId, req.body);

  if (!data) {
    throw new HttpError(404, "Contact not found");
  }
  res.json(data);
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
};
