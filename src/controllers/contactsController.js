const {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
} = require("../models/contactsModel");

const getAllContacts = (req, res) => {
  const contacts = listContacts();
  res.status(200).json(contacts);
};

const getContactById = (req, res) => {
  const { id } = req.params;
  const contact = getById(id);
  if (contact) {
    res.status(200).json(contact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
};

const createContact = (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).json({ message: "missing required name field" });
  }
  const newContact = addContact({ name, email, phone });
  res.status(201).json(newContact);
};

const deleteContact = (req, res) => {
  const { id } = req.params;
  const isRemoved = removeContact(id);
  if (isRemoved) {
    res.status(200).json({ message: "contact deleted" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
};

const updateContactById = (req, res) => {
  const { id } = req.params;
  const update = req.body;
  if (Object.keys(update).length === 0) {
    return res.status(400).json({ message: "missing fields" });
  }
  const updatedContact = updateContact(id, update);
  if (updatedContact) {
    res.status(200).json(updatedContact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContactById,
};
