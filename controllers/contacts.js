const contacts = require("../models/contacts/contacts.json");
const { HttpError, ctrlWrapper } = require("../helpers");

const listContacts = async (req, res) => {
  res.json(contacts);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const contact = contacts.find((contact) => contact.id === id);
  if (contact) {
    res.json(contact);
  } else {
    throw new HttpError(404, "Not found");
  }
};

const addContact = async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    const missingField = !name ? "name" : !email ? "email" : "phone";
    throw new HttpError(400, `Missing required ${missingField} field`);
  }
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    throw new HttpError(400, "Missing fields");
  }
  const contact = contacts.find((contact) => contact.id === id);
  if (contact) {
    contact.name = name;
    contact.email = email;
    contact.phone = phone;
    res.json(contact);
  } else {
    throw new HttpError(404, "Not found");
  }
};

const removeContact = async (req, res) => {
  const { id } = req.params;
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index !== -1) {
    const removedContact = contacts.splice(index, 1);
    res.json({ message: "Contact deleted" });
  } else {
    throw new HttpError(404, "Not found");
  }
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  removeContact: ctrlWrapper(removeContact),
};
