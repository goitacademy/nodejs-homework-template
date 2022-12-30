const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContactById,
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

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (!contact) {
    return next(createError(404, "Not found"));
  }
  await removeContact(contactId);
  return res.status(200).json({ message: "contact deleted" });
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await updateContactById(contactId, req.body);

  if (!contact) {
    return next(createError(404, "Not found"));
  }
  return res.status(200).json(contact);
};

module.exports = {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  updateContact,
};
