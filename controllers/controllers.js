const db = require("../models/contacts");

const getListContacts = async (req, res, next) => {
  const contacts = await db.listContacts();
  res.status(200).json(contacts);
};

const getContact = async (req, res, next) => {
  const { id } = req.params;
  const contact = await db.getContactById(id);

  if (!contact) {
    res.status(404).json({ message: "Not found" });
  }
  res.status(200).json(contact);
};

const createContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  const newContact = await db.addContact({ name, email, phone });
  res.status(201).json(newContact);
};

const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  const contact = await db.removeContact(id);
  if (!contact) {
    res.status(404).json({ message: "Not found" });
  }
  res.status(200).json({
    message: "contact deleted",
  });
};

const updateContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await db.updateContact(contactId, req.body);

  if (!req.body) {
    res.status(400).json({ message: "missing fields" });
  }

  if (!contact) {
    res.status(404).json({ message: "Not found" });
  }
  res.status(200).json(contact);
};

module.exports = {
  getListContacts,
  getContact,
  createContact,
  deleteContact,
  updateContactById,
};