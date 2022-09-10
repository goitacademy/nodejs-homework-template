const { randomUUID } = require("crypto");
const { ValidationError, WrongParametersError } = require("../helpers/errors");
const { listContacts, rewriteListContacts } = require("../models/contacts");

const getAllContacts = async () => {
  const contacts = await listContacts();
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const requiredContact = contacts.find((contact) => contact.id === contactId);

  if (!requiredContact) {
    throw new WrongParametersError("Not found");
  }
  return requiredContact;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = { id: randomUUID(), ...body };
  contacts.push(newContact);

  await rewriteListContacts(contacts);
  return newContact;
};

const deleteContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    throw new WrongParametersError("Not found");
  }

  contacts.splice(index, 1);
  await rewriteListContacts(contacts);
};

const updateContact = async (contactId, body) => {
  if (Object.keys(body).length === 0) {
    throw new ValidationError("missing fields");
  }
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    throw new WrongParametersError("Not found");
  }

  contacts[index] = { ...contacts[index], ...body };
  await rewriteListContacts(contacts);
  return contacts[index];
};

module.exports = {
  getAllContacts,
  getContactById,
  deleteContact,
  addContact,
  updateContact,
};
