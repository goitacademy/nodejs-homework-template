const contacts= require("../models/contacts");

const { HttpError, controllerWrapper } = require("../helpers");

const listContacts = async (req, res) => {
  const result = await contacts.listContacts();
  res.status(200).json(result);
};

const getContactById = async (req, res) => {
  const result = await contacts.getContactById(req.params.contactId);
  if (!result) throw HttpError("Not found", 404);
  res.status(200).json(result);
};

const removeContact = async (req, res) => {
  const result = await contacts.removeContact(req.params.contactId);
  if (!result) throw HttpError("Not found", 404);
  res.status(200).json({ message: "contact deleted" });
};
const addContact = async (req, res) => {
  const contact = req.body;
  const result = await contacts.addContact(contact);
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const updatedContact = req.body;
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, updatedContact);
  if (!result) throw HttpError("Not found", 404);
  res.status(200).json(result);
};

module.exports = {
  listContacts: controllerWrapper(listContacts),
  getContactById: controllerWrapper(getContactById),
  removeContact: controllerWrapper(removeContact),
  addContact: controllerWrapper(addContact),
  updateContact: controllerWrapper(updateContact),
};