const contacts = require("../models/contacts");
const { ctrlsWrapper } = require("../helpers");

const listContacts = async (req, res, next) => {
  const result = await contacts.listContacts();
  return res.status(200).json(result);
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);
  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json(result);
};

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json({ message: "Contact deleted" });
};

const addContact = async (req, res, next) => {
  const { body } = req;
  const result = await contacts.addContact(body);
  return res.status(201).json(result);
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { body } = req;
  const result = await contacts.updateContact(contactId, body);
  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json(result);
};

module.exports = {
  listContacts: ctrlsWrapper(listContacts),
  getContactById: ctrlsWrapper(getContactById),
  removeContact: ctrlsWrapper(removeContact),
  addContact: ctrlsWrapper(addContact),
  updateContact: ctrlsWrapper(updateContact),
};
