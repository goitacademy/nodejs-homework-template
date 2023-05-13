const fs = require("fs/promises");

const path = require("path");

const { nanoid } = require("nanoid");
const { log } = require("console");

const contactsPath = path.join(__dirname, "contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const results = contacts.find((item) => item.id === contactId);
  console.log(`results111`, results);
  return results || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [results] = contacts.splice(index, 1);
  updateContacts(contacts);
  return results;
}

async function addContact(data) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  contacts.push(newContact);
  updateContact(contacts);
  return newContact;
}

async function updateContact(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
