import * as contactsModel from "../models/contactsModel.js";

const listContacts = async (req, res) => {
  const contacts = await contactsModel.listContacts();
  res.json(contacts);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const contact = await contactsModel.getContactById(id);
  if (contact) {
    res.json(contact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
};

const removeContact = async (req, res) => {
  const { id } = req.params;
  await contactsModel.removeContact(id);
  res.json({ message: "Contact deleted" });
};

const addContact = async (req, res) => {
  const { body } = req;
  const newContact = await contactsModel.addContact(body);
  res.status(201).json(newContact);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const updatedContact = await contactsModel.updateContact(id, body);
  if (updatedContact) {
    res.json(updatedContact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
};

export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
