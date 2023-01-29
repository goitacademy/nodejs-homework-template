const { HttpError } = require("../helpers/error-func");
const Contact = require("../models/contacts");

async function getContacts(req, res, next) {
  const { limit = 5, page = 1 } = req.query;
  const skip = (page - 1) * limit;

  const contacts = await Contact.find().skip(skip).limit(limit);;
  if (!contacts) {
  return next(HttpError(404, "Contacts not found"));
  }
  
  return res.status(200).json(contacts);
}

async function getContact(req, res, next) {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
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
  const { contactId } = req.params;
  const delContact = await Contact.findById(contactId);
  if (!delContact) {
    return next(HttpError(404, "No contact"));
  }

  Contact.findByIdAndRemove(contactId);
  return res.status(200).json({delContact, "message": "contact deleted"}); 
}

async function updateContact(req, res, next) {
  const { contactId } = req.params;

  if (!req.body.name && !req.body.email && !req.body.phone) {
    return next(HttpError(400, "message : missing fields"));
  }

  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
  return res.status(200).json(updatedContact);
}

async function updateStatusContact(req, res, next) { 
  const { contactId } = req.params;

  if (!req.body.favorite) {
    return next(HttpError(400, "message : missing field favorite"));
  }

  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
  return res.status(200).json(updatedContact);
}

module.exports = {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  updateContact,
  updateStatusContact
};
