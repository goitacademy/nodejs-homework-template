const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");
const { isContactValid } = require("../schemas/validation.js");

const getContacts = async (req, res) => {
  const contacts = await listContacts();
  console.log("GET /", contacts);
  res.status(200).json(contacts);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (contact) {
    res.status(200).json(contact);
  } else {
    res.status(404).json({ message: "Contact was not found" });
  }
};

const postContact = async (req, res) => {
  const { error } = isContactValid(req.body);
  if (error) {
    res.status(400).json({ message: "Missing required name field" });
  }
  const newContact = await addContact(req.body);
  if (newContact) {
    res.status(201).json(newContact);
  } else {
    res.status(400).json({ message: "Contact is already added." });
  }
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const updateContacts = await removeContact(contactId);
  if (updateContacts) {
    res.status(200).json({ message: "Contact deleted" });
  } else {
    res.status(404).json({ message: "Contact was not found" });
  }
};

const putContact = async (req, res) => {
  const { error } = isContactValid(req.body);
  if (error) {
    res.status(400).json({ message: "Missing fields." });
  }
  const { contactId } = req.params;
  const updatedContact = await updateContact(contactId, req.body);
  if (updateContact) {
    res.status(200).json(updatedContact);
  } else {
    res.status(404).json({ message: "Contact was not found" });
  }
};

module.exports = {
  getContacts,
  getById,
  postContact,
  deleteContact,
  putContact,
};
