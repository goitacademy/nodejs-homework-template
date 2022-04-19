const generateUniqueId = require("generate-unique-id");
const DB = require("../db/db");
const db = new DB("../db/contacts.json");

const listContacts = async () => {
  return await db.read();
};

const getContactById = async (contactId) => {
  const numberId: number = Number(contactId);
  const contacts = await db.read();
  const [contact] = contacts.filter((contact) => contact.id === numberId);
  return contact;
};

const removeContact = async (contactId) => {
  const numberId: number = Number(contactId);
  const contacts = await db.read();
  const index = contacts.findIndex((contact) => contact.id === numberId);
  if (index !== -1) {
    const [contact] = contacts.splice(index, 1);
    await db.write(contacts);
    return contact;
  }
  return null;
};

const addContact = async (body) => {
  const contacts = await db.read();
  const id: number = Number(generateUniqueId({ length: 5, useLetters: false }));
  const newContact = {
    id,
    ...body,
  };
  contacts.push(newContact);
  await db.write(contacts);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const numberId: number = Number(contactId);
  const contacts = await db.read();
  const index = contacts.findIndex((contact) => contact.id === numberId);
  if (index !== -1) {
    contacts[index] = { ...contacts[index], ...body };
    await db.write(contacts);
    return contacts[index];
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
