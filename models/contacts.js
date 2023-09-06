const fs = require("fs/promises");

const path = require("path");

const crypto = require("crypto");

const contactsPath = path.join(__dirname, "/contacts.json");

async function readContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
}

async function writeContacts(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

const listContacts = async () => {
  const data = await readContacts();
  return data;
};

const getContactById = async (contactId) => {
  const data = await readContacts();
  const findContact = data.find((contact) => contact.id === contactId);
  return findContact || null;
};

const removeContact = async (contactId) => {
  const data = await readContacts();
  const findContact = data.find((contact) => contact.id === contactId);
  if (!findContact) {
    return null;
  }
  const contactIndex = data.findIndex((contact) => contact.id === contactId);
  data.splice(contactIndex, 1);
  writeContacts(data);
  return findContact;
};

const addContact = async (body) => {
  const data = await readContacts();
  const newContact = {
    id: crypto.randomUUID(),
    ...body,
  };
  data.push(newContact);

  writeContacts(data);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const data = await readContacts();
  const contactIndex = data.findIndex((contact) => contact.id === contactId);
  if (contactIndex === -1) {
    return null;
  }
  data[contactIndex] = { id: contactId, ...body };
  writeContacts(data);
  return data[contactIndex];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
