// const fs = require('fs/promises')
const { nanoid } = require("nanoid");
const contacts = require("../models/contacts.json");

const listContacts = async () => {
  return await contacts;
};

const getContactById = async (contactId) => {
  const contactById = await contacts.find(
    (item) => item.id === String(contactId)
  );
  return contactById;
};

const removeContact = async (contactId) => {
  await contacts.filter((item) => item.id !== String(contactId));
};

const addContact = async (body) => {
  const newContact = {
    id: nanoid(),
    ...body,
  };
  contacts.push(newContact);
  return await newContact;
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
