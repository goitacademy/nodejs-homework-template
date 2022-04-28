const { service } = require('../services/contacts');
const {
  serializeContactsListResponce,
  serializeContactResponce,
} = require('./serialize');

const addContact = async (req, res) => {
  const contact = await service.addContact(req.body);
  res.status(201).send(serializeContactResponce(contact));
};

const getContacts = async (req, res) => {
  const contacts = await service.getContacts();
  res.status(200).send(serializeContactsListResponce(contacts));
};

const getContact = async (req, res) => {
  const contact = await service.getContact(req.params.id);
  res.status(200).send(serializeContactResponce(contact));
};

const updateContact = async (req, res) => {
  const contact = await service.updateContact(req.params.id, req.body);
  res.status(200).send(serializeContactResponce(contact));
};

const deleteContact = async (req, res) => {
  await service.deleteContact(req.params.id);
  res.status(204).send();
};

exports.controller = {
  addContact,
  getContacts,
  getContact,
  updateContact,
  deleteContact,
};
