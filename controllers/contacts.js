const contacts = require('../models/contacts.js');
const { HttpError, ctrlWrapper } = require('../helpers');
const { isEmpty } = require('lodash');

const getContacts = async (req, res) => {
  const result = await contacts.getContacts();
  return res.json(result);
};
const getContactById = async (req, res) => {
  const { contactId } = req.params;

  const contact = await contacts.getContactById(contactId);
  if (!contact) {
    throw HttpError({ status: 404, message: 'Not Found' });
  }
  res.json(contact);
};
const addContact = async (req, res) => {
  const contact = await contacts.addContact(req.body);
  res.status(201).json(contact);
};
const updateContact = async (req, res, next) => {
  if (isEmpty(req.body)) {
    throw HttpError({ status: 400, message: 'Missing fields' });
  }
  const { contactId } = req.params;

  const contact = await contacts.updateContact(contactId, req.body);

  if (!contact) {
    throw HttpError({ status: 404, message: 'Contact not found!' });
  }
  res.json(contact);
};
const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const removedContactId = await contacts.removeContact(contactId);
  if (!removedContactId) {
    throw HttpError({
      status: 404,
      message: "You can't remove contact which is not exist",
    });
  }
  res.json({ id: removedContactId, message: 'Contact deleted' });
};

module.exports = {
  getContacts: ctrlWrapper(getContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  removeContact: ctrlWrapper(removeContact),
};
