// const fs = require('fs/promises')
const shortid = require("shortid");

let contacts = require("./contacts.json");

const listContacts = async (req, res, next) => {
  res.status(200).json({ contacts, message: "success" });
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const [contact] = contacts.filter((item) => item.id === contactId);

  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json({ contact, message: "success" });
};

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const [contact] = contacts.filter((item) => item.id === contactId);

  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }
  contacts = contacts.filter((item) => item.id !== req.params.contactId);

  res.status(200).json({ message: "contact deleted" });
};

const addContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  contacts.push({
    id: shortid.generate(),
    name,
    email,
    phone,
  });
  res.status(201).json({ message: "success" });
};

const updateContact = async (req, res, next) => {
  const { name, email, phone } = req.body;

  const { contactId } = req.params;

  const [contact] = contacts.filter((item) => item.id === contactId);

  if (!contact) {
    return res.status(400).json({ message: "Not found" });
  }

  contacts.forEach((contact) => {
    if (contact.id === req.params.contactId) contact.name = name;
    contact.email = email;
    contact.phone = phone;
  });

  res.status(200).json({ message: "success" });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
