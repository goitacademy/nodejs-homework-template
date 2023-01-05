const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../models/contacts");
const { HttpError } = require("../helpers/index");

async function getContacts(req, res) {
  const contacts = await listContacts();
  res.json({
    message: "contacts",
    status: "success",
    code: 200,
    data: {
      contacts,
    },
  });
}

async function getContact(req, res, next) {
  const { contactId } = req.params;
  const result = await getContactById(contactId);
  if (!result) {
    return next(HttpError(404, "Contact not found"));
  }
  res.json({
    message: "contact found",
    contact: result,
  });
}

async function createContact(req, res, next) {
  const { name, email, phone } = req.body;
  const newContact = await addContact({ name, email, phone });
  res.status(201).json(newContact);
}

async function deleteContact(req, res) {
  const { contactId } = req.params;
  const result = await getContactById(contactId);
  if (!result) {
    res.status(404).json({ message: "Not found" });
  }
  await removeContact(contactId);
  res.status(200).json({ message: "contact deleted" });
}

async function updateContacts(req, res, next) {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;

  const upContact = await updateContact(contactId, { name, email, phone });
  if (!upContact) {
    res.status(400).json({ message: "Not found" });
  }

  res.status(200).json(upContact);
}

module.exports = {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  updateContacts,
};
