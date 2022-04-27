const { NotFound } = require('http-errors');
const { model } = require('../models/contacts');

const addContact = async (reqParams, contacts) =>
  await model.addContact(reqParams, contacts);

const getContacts = async () => await model.listContacts();

const getContact = async (id, contacts) => {
  const contact = await model.getContact(id, contacts);
  if (!contact) throw new NotFound('Contact not found');
  return contact;
};

const updateContact = async (id, reqParams, contacts) => {
  const contact = await model.updateContact(id, reqParams, contacts);
  if (!contact) throw new NotFound('Contact not found');
  return contact;
};

const deleteContact = async (id, contacts) => {
  const isContactDeleted = await model.deleteContact(id, contacts);
  if (!isContactDeleted) throw new NotFound('Contact not found');
};

exports.service = {
  addContact,
  getContacts,
  getContact,
  updateContact,
  deleteContact,
};
