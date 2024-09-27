// const fs = require('fs/promises')
const { nanoid } = require("nanoid");
const DB = require("./db");
const db = new DB("contacts.json");

const listContacts = async () => {
  return await db.read();
};

const getContactById = async (contactId) => {
  const contacts = await db.read();
  const [contact] = contacts.filter((contact) => contact.id === contactId);
  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await db.read();
  const idx = contacts.findIndex((contact) => contact.id === contactId);
  if (idx !== -1) {
    const [contact] = contacts.splice(idx, 1);
    await db.write(contacts);
    return contact;
  }
  return null;
};

const addContact = async (body) => {
  const contacts = await db.read();
  const newContact = {
    id: nanoid(),
    ...body,
  };
  contacts.push(newContact);
  await db.write(contacts);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await db.read();
  const idx = contacts.findIndex((contact) => contact.id === contactId);
  if (idx !== -1) {
    contacts[idx] = { ...contacts[idx], ...body };
    await db.write(contacts);
    return contacts[idx];
  }
  return null;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
