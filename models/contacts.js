const { read } = require("fs");
const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const readContactsFile = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading contacts file:", error.message);
    return [];
  }
};

const writeContactsFile = async (contacts) => {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  } catch (error) {
    console.error("Error writing contacts file:", error.message);
  }
};

const listContacts = async () => {
  return await readContactsFile();
};

const getContactById = async (contactId) => {
  const contacts = await readContactsFile();
  return contacts.find((contact) => contact.id === contactId) || null;
};

const removeContact = async (contactId) => {
  const contacts = await readContactsFile();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) return null;

  const [removedContact] = contacts.splice(index, 1);
  await writeContactsFile(contacts);
  return removedContact;
};

const addContact = async (body) => {
  const contacts = await readContactsFile();
  const newContact = { id: uuidv4(), ...body };

  contacts.push(newContact);
  await writeContactsFile(contacts);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await readContactsFile();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) return null;

  contacts[index] = { ...contacts[index], ...body };
  await writeContactsFile(contacts);
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
