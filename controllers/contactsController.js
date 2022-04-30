const operations = require('../models/contacts');

// Избавились от next в каждой функции, ибо юзаем его внутри мидлвары
const getAllContacts = async (req, res) => {
  const contacts = await operations.listContacts();
  res.json(contacts);
};

const getOneContact = async (req, res) => {
  const { contactId } = req.params;
  const contact = await operations.getContactById(contactId);
  if (!contact) {
    const error = new Error(`Contact with id: ${contactId} not found`);
    error.status = 404;
    throw error;
  }
  res.json(contact);
};

const addContact = async (req, res) => {
  const contact = await operations.addContact(req.body);
  res.status(201).json(contact);
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const deletedContact = await operations.removeContact(contactId);
  if (!deletedContact) {
    const error = new Error(`Contact with id: ${contactId} not found`);
    error.status = 404;
    throw error;
  }
  res.json(deletedContact);
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const updatedContact = await operations.updateContact(contactId, req.body);
  if (!updatedContact) {
    throw new Error(`Contact with id=${contactId} not found`);
  }
  res.status(201).json(updatedContact);
};

module.exports = {
  getAllContacts,
  getOneContact,
  addContact,
  deleteContact,
  updateContact,
};
