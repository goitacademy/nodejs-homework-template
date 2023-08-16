const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");

const contactsPath = path.join(__dirname, "contacts.json");

const read = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
}

const write = (data) => {
  return fs.writeFile(contactsPath, JSON.stringify(data));
}

const listContacts = async () => {
  const contacts = await read();
  return contacts;
}

const getContactById = async (contactId) => {
  const contacts = await read();
  return contacts.find((contact) => contact.id === contactId) || null;
}

const addContact = async (body) => {
  const contacts = await read();
  const newContact = { id: crypto.randomUUID(), ...body };

  contacts.push(newContact); 
  await write(contacts);
  return newContact;
}

const removeContact = async (contactId) => {
  const contacts = await read();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  const removedContact = contacts[index];
  contacts.splice(index, 1);
  await write(contacts);
  return removedContact;
}

const updateContact = async (contactId, body) => {
  const contacts = await read();

  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  const updatedContact = {id: contactId, ...body };
  contacts.splice(index, 1, updatedContact);

  await write(contacts);

  return updatedContact;
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
}
