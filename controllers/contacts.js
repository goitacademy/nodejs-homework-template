const {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../models/contacts');

const { HttpError, ctrlWrapper } = require('../helpers');

const getAll = async res => {
  const contacts = await getContacts();
  res.json(contacts);
};

const getById = async (req, res) => {
  const id = req.params.contactId;
  const contact = await getContactById(id);
  if (!contact) {
    throw HttpError(404, 'Contact not found');
  }
  res.json(contact);
};

const addNew = async (req, res) => {
  const newContact = await addContact(req.body);
  res.status(201).json(newContact);
};

const deleteById = async (req, res) => {
  const id = req.params.contactId;
  const deletedContact = await removeContact(id);
  if (!deletedContact) {
    throw HttpError(404, 'Contact not found');
  }
  res.json({ message: 'Contact deleted' });
};

const updateById = async (req, res) => {
  const id = req.params.contactId;
  const updatedContact = await updateContact(id, req.body);
  if (!updatedContact) {
    throw HttpError(404, 'Contact not found');
  }
  res.json(updatedContact);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  addNew: ctrlWrapper(addNew),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
};
