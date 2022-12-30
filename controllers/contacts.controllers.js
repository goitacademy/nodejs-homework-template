const {
  listContacts,
  getContactById,
  addContact,
} = require("../models/contacts");
const { createError } = require("../helpers/index");

const getContacts = async (req, res) => {
  const contacts = await listContacts();
  res.json(contacts);
};

const getContact = async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await getContactById(contactId);

  if (!contact) {
    return next(createError(404, "Not found"));
  }
  return res.json(contact);
};

const createContact = async (req, res, next) => {
  const newContact = await addContact(req.body);
  res.status(201).json(newContact);
};

module.exports = { getContacts, getContact, createContact };
