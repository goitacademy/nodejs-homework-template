const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");

const { nanoid } = require("nanoid");
const { HttpError, tryCatchWrapper } = require("../helpers/index");

async function getContacts(req, res, next) {
  const contacts = await listContacts();
  res.status(200).json(contacts);
}

async function getContact(req, res, next) {
  const { contactId } = req.params;
  const contacts = await getContactById(contactId);
  if (!contacts) {
    return next(HttpError(404, "Not found"));
  }
  return res.status(200).json(contacts);
}

async function createContact(req, res, next) {
  const id = nanoid();
  const { name, email, phone } = req.body;
  contact = {
    id,
    name,
    email,
    phone,
  };

  const newContact = await addContact(contact);
  res.status(201).json(newContact);
}

async function deleteContact(req, res, next) {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) {
    return next(HttpError(404, "Not found"));
  }
  await removeContact(contactId);
  return res.status(200).json({ message: "contact deleted" });
}

async function updateContacts(req, res, next) {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;

  const update = await updateContact(contactId, { name, email, phone });
  res.json(update);
}

module.exports = {
  getContact,
  getContacts,
  deleteContact,
  createContact,
  updateContacts,
};
