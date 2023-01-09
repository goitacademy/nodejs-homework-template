const { HttpError } = require("../httpError");
const {
  getContactsService,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");

async function getContacts(req, res, next) {
  const { limit } = req.query;
  const contact = await getContactsService({ limit });
  return res.status(200).json(contact);
}

async function getContact(req, res, next) {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) {
    throw new HttpError("Not found", 404);
  }
  return res.status(200).json(contact);
}

async function createContact(req, res, next) {
  const body = req.body;
  const contact = await addContact(body);
  return res.status(201).json(contact);
}

async function deleteContact(req, res, next) {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) {
    throw new HttpError("Not found", 404);
  }
  await removeContact(contactId);
  return res.status(200).json({ message: "contact deleted" });
}

async function refreshContact(req, res, next) {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  if (!req.body) {
    throw new HttpError("missing fields", 400);
  }
  const contact = await updateContact(contactId, { name, email, phone });

  if (!contact) {
    throw new HttpError("Not found", 404);
  }
  return res.status(200).json(contact);
}

module.exports = {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  refreshContact,
};
