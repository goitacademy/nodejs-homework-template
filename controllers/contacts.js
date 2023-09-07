const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../models/contacts');

const { HttpError, ctrlWrapper } = require('../helpers');

const getAll = async (req, res) => {
  const allContacts = await listContacts();
  res.status(200).json(allContacts);
};

const getContact = async (req, res) => {
  const { contactId } = req.params;
  const oneContact = await getContactById(contactId);

  if (!oneContact) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json(oneContact);
};

const createContact = async (req, res) => {
  const newContact = await addContact(req.body);
  res.status(201).json(newContact);
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const deletedContact = await removeContact(contactId);
  if (!deletedContact) {
    throw HttpError(404, 'Not found');
  }

  res.status(200).json('Contact deleted');
};

const renewContact = async (req, res) => {
  console.log(req.body);
  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, 'Missing fields');
  }

  const { contactId } = req.params;
  const updatedContact = await updateContact(contactId, req.body);
  if (!updatedContact) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json(updatedContact);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getContact: ctrlWrapper(getContact),
  createContact: ctrlWrapper(createContact),
  deleteContact: ctrlWrapper(deleteContact),
  renewContact: ctrlWrapper(renewContact),
};
