const { UpsErrors, AddSchema, ctrlWraper } = require("../Helpers");
const contacts = require("../models/contacts");

const listContacts = async (req, res) => {
  const result = await contacts.listContacts();
  res.json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);
  if (!result) {
    throw UpsErrors(404, "Not found");
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const { error } = AddSchema.validate(req.body);
  if (error) {
    throw UpsErrors(404, error.message);
  }
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) {
    throw UpsErrors(404, "Error deleting the Contact");
  }
  res.json({ message: "Huray! its deleted" });
};

const updateContact = async (req, res) => {
  const { error } = AddSchema.validate(req.body);
  if (error) {
    throw UpsErrors(404, error.message);
  }
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body);
  if (!result) {
    throw UpsErrors(404, "Not found");
  }
  res.json(result);
};

module.exports = {
  listContacts: ctrlWraper(listContacts),
  addContact: ctrlWraper(addContact),
  removeContact: ctrlWraper(removeContact),
  updateContact: ctrlWraper(updateContact),
  getContactById: ctrlWraper(getContactById),
};
