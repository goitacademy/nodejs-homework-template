const ContactsOperations = require("../models/contacts.js");

const HttpError = require("../helpers/HttpError.js");

const getAllContacts = async (req, res) => {
  const result = await ContactsOperations.listContacts();
  res.json(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;

  const result = await ContactsOperations.getContactById(contactId);

  if (!result) {
    throw HttpError(404, `Contact with id=${contactId} not found`);
  }

  res.status(200).json(result);
};

const addNewContact = async (req, res) => {
  const contact = await ContactsOperations.addContact(req.body);
  res.status(201).json(contact);
};
const deleteContact = async (req, res) => {
  const { contactId } = req.params;

  const contact = await ContactsOperations.removeContact(contactId);
  if (!contact) {
    throw HttpError(404, `Contact with id=${contactId} not found`);
  }

  res.status(200).json({ message: "Contact deleted" });
};

const updateContactById = async (req, res) => {
  const { id } = req.params;

  const contact = await ContactsOperations.updateContact(id, req.body);
  if (!contact) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }

  res.status(200).json(contact);
};

module.exports = {
  getAllContacts,
  getById,
  addNewContact,
  deleteContact,
  updateContactById,
};
