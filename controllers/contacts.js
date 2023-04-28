const contacts = require('../models/contacts');
const { HttpError, ctrlWrapper } = require('../helpers');

const listContacts = async (req, res) => {
  const contactList = await contacts.listContacts();
  res.json(contactList);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const contact = await contacts.getContactById(id);

  if (!contact) {
    throw HttpError(404, 'Not found');
  }

  res.json(contact);
};

const addContact = async ({ body }, res) => {
  const newContact = await contacts.addContact(body);
  res.status(201).json(newContact);
};

const updateContact = async (req, res) => {
  const {
    body,
    params: { id },
  } = req;

  const updatedContact = await contacts.updateContact(id, body);

  if (!updatedContact) {
    throw HttpError(404, 'Not found');
  }

  res.json(updatedContact);
};

const removeContact = async (req, res) => {
  const { id } = req.params;
  const removedContact = await contacts.removeContact(id);

  if (!removedContact) {
    throw HttpError(404, 'Not found');
  }

  res.json({ message: 'contact deleted' });
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  removeContact: ctrlWrapper(removeContact),
};
