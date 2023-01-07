const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");
const { httpError } = require("../helpers/helpers");

async function getListOfContacts(req, res, next) {
  const { limit } = req.query;
  const contacts = await listContacts({ limit });
  return res.status(200).json(contacts);
}

async function getContact(req, res, next) {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) {
    return next(httpError(404, "Not found"));
  }
  return res.status(200).json(contact);
}

async function createContact(req, res, next) {
  const newContact = await addContact(req.body);
  if (!newContact) {
    return next(httpError(404, "Not found"));
  }
  return res.status(201).json(newContact);
}

async function deleteContact(req, res, next) {
  const { contactId } = req.params;
  const contactToDelete = await getContactById(contactId);
  if (!contactToDelete) {
    return next(httpError(404, "Not found"));
  }
  await removeContact(contactId);
  return res.status(200).json({ message: "contact deleted" });
}

async function editContact(req, res, next) {
  const { contactId } = req.params;
  const contactToUpdate = await getContactById(contactId);
  if (!contactToUpdate) {
    return next(httpError(404, "Not found"));
  }
  const updatedContact = await updateContact(contactId, req.body);
  return res.status(200).json(updatedContact);
}

module.exports = {
  getListOfContacts,
  getContact,
  createContact,
  deleteContact,
  editContact,
};
