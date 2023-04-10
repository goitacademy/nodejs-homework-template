const contacts = require("../models/contacts");

const { HttpError, ctrlWrapper } = require("../helpers");

const listContacts = async (req, res) => {
  const allContacts = await contacts.listContacts();

  res.status(200).json(allContacts);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const contact = await contacts.getContactById(id);
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(contact);
};

const addContact = async (req, res) => {
  const newContact = await contacts.addContact(req.body);
  res.status(200).json(newContact);
};

const removeContact = async (req, res) => {
  const { id } = req.params;
  const filteredContacts = await contacts.removeContact(id);
  if (!filteredContacts) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ message: "contact deleted" });
};

const updateContact = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, "missing fields");
  }
  const { id } = req.params;
  const result = await contacts.updateContact(id, req.body);
  if (!result) {
    throw HttpError(404, "Contact not found");
  }

  res.status(200).json(result);
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  removeContact: ctrlWrapper(removeContact),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
};
