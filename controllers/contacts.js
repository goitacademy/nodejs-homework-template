const contacts = require('../models/contacts');

const { HttpError, ctrlWrapper } = require('../helpers');

const listContacts = async (req, res) => {
  const allContacts = await contacts.listContacts();
  res.json(allContacts);
};

const getContactById = async (req, res) => {
  const id = req.params.contactId;
  const contactById = await contacts.getContactById(id);
  if (!contactById) {
    throw HttpError(404, 'Not found');
  }
  res.json(contactById);
};

const addContact = async (req, res) => {  
  const newContact = await contacts.addContact(req.body);
  res.status(201).json(newContact);
};

const removeContact = async (req, res) => {
  const id = req.params.contactId;
  const removingContact = await contacts.removeContact(id);
  if (!removingContact) {
    throw HttpError(404, 'Not found');
  }
  res.json({ message: 'Contact deleted' });
};

const updateContact = async (req, res) => {  
  const id = req.params.contactId;
  const updatingContact = await contacts.updateContact(id, req.body);
  if (!updatingContact) {
    throw HttpError(404, 'Not found');
  }
  res.json(updatingContact);
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
};
