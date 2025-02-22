const Contact = require('../models/contacts');

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const contacts = await Contact.listContacts(owner);
  res.json(contacts);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  
  const contact = await Contact.getContactById(contactId, owner);
  if (!contact) {
    return res.status(404).json({ message: 'Not found' });
  }
  res.json(contact);
};

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const newContact = await Contact.addContact(req.body, owner);
  res.status(201).json(newContact);
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  
  const updatedContact = await Contact.updateContact(contactId, req.body, owner);
  if (!updatedContact) {
    return res.status(404).json({ message: 'Not found' });
  }
  res.json(updatedContact);
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  
  const deletedContact = await Contact.removeContact(contactId, owner);
  if (!deletedContact) {
    return res.status(404).json({ message: 'Not found' });
  }
  res.json({ message: 'Contact deleted' });
};

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  updateContact,
  deleteContact,
};
