const { HttpError } = require("../helpers/error-func");
const {  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../models/contacts");

async function getContacts(req, res, next) {
  const contacts = await listContacts();
  if (!contacts) {
  return next(HttpError(404, "Contacts not found"));
  }
  
  return res.status(200).json(contacts);
}

async function getContact(req, res, next) {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) {
    return next(HttpError(404, "Contact not found"));
  }
  
  return res.status(200).json(contact);
}

async function createContact(req, res, next) {
  const newContact = await addContact(req.body);
  return res.status(201).json(newContact);
}

async function deleteContact(req, res, next) {
  const { contactId } = req.params;
  const delContact = await getContactById(contactId);
  if (!delContact) {
    return next(HttpError(404, "No contact"));
  }

  await removeContact(contactId);
  return res.status(200).json({delContact, "message": "contact deleted"}); 
}

async function updateContacts(req, res, next) {
  const { contactId } = req.params;

  if (!req.body.name && !req.body.email && !req.body.phone) {
    return next(HttpError(400, "message : missing fields"));
  }

  const updatedContact = await updateContact(contactId, req.body);
  return res.status(200).json(updatedContact);
}

module.exports = {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  updateContacts,
};
