const { HttpError, NotFound } = require("../helpers/index");
const { Contact } = require("../models/contacts");

async function getContacts(req, res) {
  const { limit } = req.query;
  const allContacts = await Contact.find({}).limit(limit);

  return res.json(allContacts);
}

async function getContact(req, res, next) {
  const { contactId } = req.params;

  const contact = await Contact.findById(contactId);

  if (!contact) {
    return next(HttpError(404, "Not found"));
  }

  return res.json(contact);
}

async function createContact(req, res) {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({
      message: NotFound,
    });
  }

  const newContact = await Contact.create({ name, email, phone });

  res.status(200).json(newContact);
}

async function deleteContact(req, res, next) {
  const { contactId } = req.params;

  const newContact = await Contact.findById(contactId);

  if (!newContact) {
    next(HttpError(404, "This path can't found"));
  }

  await Contact.findByIdAndRemove(contactId);

  return res.status(200).json(newContact);
}

async function changeContacts(req, res) {
  const { contactId } = req.params;

  const { body } = req;

  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({
      message: NotFound,
    });
  }

  const updatedContacts = await Contact.findByIdAndUpdate(contactId, body);

  if (!updatedContacts) {
    next(HttpError(404, "This path can't found"));
  }

  return res.status(200).json(updatedContacts);
}

module.exports = {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  changeContacts,
};