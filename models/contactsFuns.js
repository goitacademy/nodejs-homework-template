// const fs = require('fs/promises')
const { nanoid } = require("nanoid");
const fs = require("fs").promises;
const path = require("path");

const contactsFilePath = path.join(__dirname, "contacts.json");

const readContactsFile = async () => {
  try {
    const data = await fs.readFile(contactsFilePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const writeContactsFile = async (contacts) => {
  await fs.writeFile(
    contactsFilePath,
    JSON.stringify(contacts, null, 2),
    "utf-8"
  );
};

const listContacts = async () => {
  return readContactsFile();
};

const getContactById = async (contactId) => {
  const contacts = await readContactsFile();
  return contacts.find((contact) => contact.id === contactId);
};

const removeContact = async (contactId) => {
  const contacts = await readContactsFile();
  const filteredContacts = contacts.filter(
    (contact) => contact.id !== contactId
  );

  if (filteredContacts.length < contacts.length) {
    await writeContactsFile(filteredContacts);
    return true;
  }

  return false;
};

const addContact = async (body) => {
  const contacts = await readContactsFile();
  const id = nanoid();
  const contactWithId = { id, ...body };
  contacts.push(contactWithId);
  await writeContactsFile(contacts);
  return contactWithId;
};

const updateContact = async (contactId, body) => {
  const contacts = await readContactsFile();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index !== -1) {
    contacts[index] = { ...contacts[index], ...body };
    await writeContactsFile(contacts);
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
