const contacts = require("../models/contacts");
const { HttpError, validate } = require("../helpers");

const getAllContacts = async (req, res) => {
  const allContacts = await contacts.listContacts();
  res.status(200).json(allContacts);
};

const getContactById = async (req, res, next) => {
  const contactId = req.params.contactId;
  const contact = await contacts.getContactById(contactId);
  contacts ? res.status(200).json(contact) : HttpError(404, "Not found");
};

const addContact = async (req, res, next) => {
  const { error, value } = validate(req.body);
  if (error) {
    return HttpError(400, error.message);
  }
  const newContact = await contacts.addContact(value);
  res.status(201).json(newContact);
};

const deleteContact = async (req, res, next) => {
  const contactId = req.params.contactId;
  const result = await contacts.removeContact(contactId);
  console.log(result);
  result
    ? res.json({ message: "contact deleted", contactId })
    : HttpError(404, "Not found");
};

const updateContact = async (req, res, next) => {
  const contactId = req.params.contactId;
  const { error, value } = validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const updatedContact = await contacts.updateContact(contactId, value);
  updatedContact
    ? res.status(200).json(updatedContact)
    : HttpError(404, "Not found");
};

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  deleteContact,
  updateContact,
};
