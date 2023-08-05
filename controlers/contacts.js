const contacts = require("../models/contacts");

const getAllContacts = async (req, res) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getContactById = async (req, res) => {
  const id = req.params;
  const result = await contacts.getContactById(id);
  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const { name, email, phone } = req.body;

  const newContact = await contacts.addContact(name, email, phone);
  res.status(201).json(newContact);
};

const removeContact = async (req, res) => {
  const id = req.params;
  const removedContact = await contacts.removeContact(id);
  if (!removedContact) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json({ message: "contact deleted" });
};

const updateContact = async (req, res) => {
  const id = req.params;

  const updatedContact = await contacts.updateContact(id, req.body);
  if (!updatedContact) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json(updatedContact);
};

module.exports = {
  getAllContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
