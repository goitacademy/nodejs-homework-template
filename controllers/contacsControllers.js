const Contact = require("../models/contactModel");

const {
  getContactById,
  removeContact,
  addContact,
  getContacts,
} = require("../models/contacts");

async function listContacts(req, res, next) {
  const contacts = await getContacts();
  res.status(200).json(contacts);
}

async function getContact(req, res, next) {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }

  return res.status(200).json(contact);
}

async function createContact(req, res, next) {
  const newContact = await addContact(req.body);
  res.status(201).json(newContact);
}

async function deleteContact(req, res, next) {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }
  await removeContact(contactId);
  res.status(200).json({ message: "contact deleted" });
}

async function updateContact(req, res, next) {
  const response = await Contact.findByIdAndUpdate(
    req.params.contactId,
    req.body
  );
  if (response) return res.json(response);
  return res.status(404).json({ message: "Not found" });
}

async function updateStatusContact(req, res, next) {
  const response = await Contact.findByIdAndUpdate(
    req.params.contactId,
    req.body
  );
  return res.json(response);
}

module.exports = {
  listContacts,
  getContact,
  createContact,
  deleteContact,
  updateContact,
  updateStatusContact,
};
