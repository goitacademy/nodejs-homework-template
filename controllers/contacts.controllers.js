const {
  getContactById,
  listContacts,
  addContact,
  updateContact,
  removeContact,
  getContactById,
} = require("../models/contacts");
const { HttpErrors } = require("../helpers/index");

async function getContacts(req, res, next) {
  const contacts = await listContacts();
  res.json(contacts);
}

async function getContact(req, res, next) {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (!contact) {
    return next(HttpErrors(404, "Contact Not Found"));
  }
  return res.json(contact);
}

async function createContact(req, res, next) {
  const { name, email, phone } = req.body;
  const newContact = await addContact({ name, email, phone });
  res.status(201).json(newContact);
  return newContact;
}

async function createPutContact(req, res, next) {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) {
    return next(HttpErrors(404, "Not found"));
  }
  const updatedContact = await updateContact(contactId, req.body);
  return res.status(200).json("Contact update");
}

async function removedContact(req, res, next) {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  await removeContact(contactId);
  if (!contact) {
    return next(HttpErrors(404, `Not found contact with id=${contactId}`));
  }

  return res.status(200).json({ message: "Contact deleted" });
}

module.exports = {
  getContacts,
  getContact,
  createContact,
  createPutContact,
  removedContact,
};
