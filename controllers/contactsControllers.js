const {
  listContacts,
  getContact,
  addContact,
  removeContact,
  updateContact,
} = require("../models/contacts");

const getAllContacts = async (req, res, next) => {
  res.status(200).json({ contacts: await listContacts() });
};

const getContactById = async (req, res, next) => {
  const contact = await getContact(req.params.contactId);
  if (!contact) return res.status(404).json({ message: "Not found" });
  res.status(200).json({ contact });
};

const addNewContact = async (req, res, next) => {
  await addContact(req.body);
  const contacts = await listContacts();
  res.status(201).json({ contact: contacts[contacts.length - 1] });
};

const deleteContactById = async (req, res, next) => {
  const contact = await getContact(req.params.contactId);
  if (!contact) return res.status(404).json({ message: "Not found" });
  await removeContact(req.params.contactId);
  res.status(200).json({ message: "contact deleted" });
};

const updateContactById = async (req, res, next) => {
  const contact = await getContact(req.params.contactId);
  if (!contact) return res.status(404).json({ message: "Not found" });
  const renewContact = await updateContact(req.params.contactId, req.body);
  res.status(200).json({ contact: renewContact });
};

module.exports = {
  getAllContacts,
  getContactById,
  deleteContactById,
  addNewContact,
  updateContactById,
};
