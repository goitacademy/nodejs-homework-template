const contacts = require("../../models/contacts");
const { HttpError } = require("../../helpers");
const { controllerWrap } = require("../../utils");

// Get all contacts
const getAll = async (req, res) => {
  const result = await contacts.listContacts();
  res.json(result);
};

// Get a single contact by id
const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

// Create a new contact
const addNewContact = async (req, res) => {
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

// Delete a contact
const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) {
    throw HttpError(404);
  }
  res.status(200).json({ message: "contact deleted" });
};

// Update a contact
const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body);
  if (!result) {
    throw HttpError(404);
  }
  res.status(200).json(result);
};

module.exports = {
  getAll: controllerWrap(getAll),
  getById: controllerWrap(getById),
  addNewContact: controllerWrap(addNewContact),
  deleteContact: controllerWrap(deleteContact),
  updateContact: controllerWrap(updateContact),
};
