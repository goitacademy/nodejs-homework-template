const contacts = require("../models/contacts");
const { HttpError, NotFound } = require("../helpers/message");
const { addContactSchema } = require("../schemas/contacts-validate");

async function getContacts(req, res) {
  const { limit } = req.query;

  const allContacts = await contacts.listContacts({ limit });

  return res.json(allContacts);
}

async function contactById(req, res, next) {
  const { contactId } = req.params;

  const byId = await contacts.getContactById(contactId);

  if (!byId) {
    return next(HttpError(404, "Not found"));
  }
  return res.json(byId);
}

async function createContact(req, res) {
  const { error } = addContactSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: NotFound,
    });
  }

  const { name, email, phone } = req.body;

  const newContact = await contacts.addContact(name, email, phone);
  res.status(200).json(newContact);
}

async function deleteContact(req, res, next) {
  const { contactId } = req.params;

  const newContact = await contacts.getContactById(contactId);

  if (!newContact) {
    next(HttpError(404, "This path can't found"));
  }

  await contacts.removeContact(contactId);

  return res.status(200).json(newContact);
}

async function changeContacts(req, res, next) {
  const { contactId } = req.params;
  const { body } = req;

  const { error } = addContactSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: NotFound,
    });
  }

  const updatedContacts = await contacts.updateContact(contactId, body);

  if (!updatedContacts) {
    return next(HttpError(404, "Page not found"));
  }

  return res.status(200).json(updatedContacts);
}

module.exports = {
  getContacts,
  contactById,
  createContact,
  deleteContact,
  changeContacts,
};
