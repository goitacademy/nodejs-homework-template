const crypto = require("crypto");
const DB = require("./db");
const db = new DB("./contacts.json");

const listContacts = async () => {
  return await db.read();
};

const getContactById = async (contactId) => {
  const contacts = await db.read();
  const [contact] = contacts.filter(
    (contact) => parseInt(contact.id) === parseInt(contactId)
  );
  if (!contact) {
    return null;
  }
  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await db.read();
  const filteredContacts = contacts.filter(
    (contact) => String(contact.id) !== contactId
  );
  await db.write(filteredContacts);
  return contacts;
};

const addContact = async (body) => {
  const contacts = await db.read();
  const newContact = {
    id: crypto.randomUUID(),
    ...body,
  };
  contacts.push(newContact);
  await db.write(contacts);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await db.read();
  const index = contacts.findIndex(
    (contact) => String(contact.id) === contactId
  );
  if (index === -1) {
    return null;
  }
  contacts[index] = { ...contacts[index], ...body };
  await db.write(contacts);
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
