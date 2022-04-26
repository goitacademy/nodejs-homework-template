const { NotFound } = require('http-errors');
const {
  listContacts,
  getContactById,
  removeContact,
  addContactbyId,
  changeContact,
} = require('../models/contacts');
const {
  serializeContactsListResponce,
  serializeContactResponce,
} = require('./serialize');

const addContact = async (req, res, next) => {
  const contact = await addContactbyId(req.body);

  res.status(201).send(serializeContactResponce(contact));
};

const getContacts = async (req, res, next) => {
  const contacts = await listContacts();

  res.status(200).send(serializeContactsListResponce(contacts));
};

const getContact = async (req, res, next) => {
  const contact = await getContactById(req.params.id);
  if (!contact) throw new NotFound('Contact not found');

  res.status(200).send(serializeContactResponce(contact));
};

const updateContact = async (req, res, next) => {
  const contact = await changeContact(req.params.id, req.body);
  if (!contact) throw new NotFound('Contact not found');

  res.status(200).send(serializeContactResponce(contact));
};

const deleteContact = async (req, res, next) => {
  const isContactDeleted = await removeContact(req.params.id);
  if (!isContactDeleted) throw new NotFound('Contact not found');

  res.status(204).send();
};

module.exports = {
  addContact,
  getContacts,
  getContact,
  updateContact,
  deleteContact,
};
