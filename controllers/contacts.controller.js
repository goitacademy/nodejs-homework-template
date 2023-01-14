const { HttpError } = require("../helpers/index");
const { Contact } = require("../models/contacts");

async function getContacts(req, res, next) {
  const { limit } = req.query;
  return res.status(200).json(await Contact.find({}).limit(limit));
}

async function getContact(req, res, next) {
  const { id } = req.params;
  const contact = await Contact.findById(id);
  if (!contact) {
    return next(HttpError(404, "Contact not found"));
  }
  return res.status(200).json(contact);
}

async function createContact(req, res, next) {
  const newContact = await Contact.create(req.body);

  return res.status(201).json(newContact);
}

async function deleteContact(req, res, next) {
  const { id } = req.params;
  const contact = await Contact.findById(id);
  if (!contact) {
    return next(HttpError(404, "Contact not found"));
  }
  await Contact.findByIdAndRemove(id);
  return res.status(200).json({ contact, message: "Contact deleted" });
}

async function changeContact(req, res, next) {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, res);
  if (!result) {
    return next(HttpError(404, "Contact not found"));
  }
  return res.status(200).json(result);
}

async function updateStatusContact(req, res, next) {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, res);
  if (!result) {
    return next(HttpError(404, "Contact not found"));
  }
  return res.status(200).json(result);
}

module.exports = {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  changeContact,
  updateStatusContact,
};
