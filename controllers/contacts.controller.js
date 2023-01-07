const { httpError } = require("../helpers");
const db = require("../models/contacts");

async function getContactList(req, res, next) {
  const { limit } = req.query;
  const movie = await db.listContacts({ limit });
  return res.status(200).json(movie);
}

async function getContactId(req, res, next) {
  const { contactId } = req.params;
  const contact = await db.getContactById(contactId);
  if (!contact) {
    return next(httpError(404, "Not found"));
  }
  return res.status(200).json(contact);
}

async function createContact(req, res, next) {
  const body = req.body;
  const contact = await db.addContact(body);
  return res.status(201).json(contact);
}

async function deleteContact(req, res, next) {
  const { contactId } = req.params;
  const contact = await db.getContactById(contactId);
  if (!contact) {
    return next(httpError(404, "Not found"));
  }
  await db.removeContact(contactId);
  return res.status(200).json({ message: "contact deleted" });
}

async function refreshContact(req, res, next) {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  if (!req.body) {
    return next(httpError(400, { message: "missing fields" }));
  }
  const contact = await db.updateContact(contactId, { name, email, phone });

  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json(contact);
}

module.exports = {
  getContactList,
  getContactId,
  createContact,
  deleteContact,
  refreshContact,
};
