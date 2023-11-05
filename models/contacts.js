const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("crypto");

const contactsPath = path.join(__dirname, "/contacts.json");

async function readContacts() {
  const data = await fs.readFile(contactsPath, { encoding: "UTF-8" });
  return JSON.parse(data);
}

function writeContacts(contacts) {
  return fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));
}

const listContacts = async () => {
  const contacts = await readContacts();
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await readContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  return contact || null;
};

const removeContact = async (contactId) => {
  const contacts = await readContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const newContacts = [
    ...contacts.slice(0, index),
    ...contacts.slice(index + 1),
  ];
  await writeContacts(newContacts);
  return contacts[index];
};

const addContact = async (body) => {
  const contacts = await readContacts();
  const newContact = { ...body, id: crypto.randomUUID() };
  contacts.push(newContact);
  await writeContacts(contacts);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await readContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return undefined;
  }

  const updatedContact = { ...contacts[index], ...body };

  const newContacts = [
    ...contacts.slice(0, index),
    updatedContact,
    ...contacts.slice(index + 1),
  ];

  await writeContacts(newContacts);

  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
