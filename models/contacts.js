const fs = require("node:fs/promises");
const crypto = require("node:crypto");
const path = require("node:path");

const contactsPath = path.join(__dirname, "contacts.json");

async function readFile() {
  const contacts = await fs.readFile(contactsPath, { encoding: "UTF-8" });
  return JSON.parse(contacts);
}

function writeFile(contacts) {
  return fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));
}

const listContacts = async () => {
  const contacts = await readFile();
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await readFile();
  const contact = contacts.find((contact) => contact.id === contactId);

  if (contact === undefined) {
    return null;
  }

  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await readFile();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  const newContacts = [
    ...contacts.slice(0, index),
    ...contacts.slice(index + 1),
  ];

  await writeFile(newContacts);
  return contacts[index];
};

const addContact = async (body) => {
  const contacts = await readFile();
  const newContact = {
    id: crypto.randomUUID(),
    ...body,
  };

  contacts.push(newContact);
  await writeFile(contacts);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await readFile();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }
  contacts[index] = { id:contactId, ...body };
  await writeFile(contacts);
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};


