const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");

const filePath = path.join(__dirname, "contacts.json");
function writeContacts(contacts) {
  return fs.writeFile(filePath, JSON.stringify(contacts, undefined, 2));
}
const listContacts = async () => {
  const data = await fs.readFile(filePath, { encoding: "utf-8" });
  return JSON.parse(data);
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  return contact;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return undefined;
  }

  const newContacts = [...contacts.slice(0, index), ...contacts.slice(index + 1)];

  await writeContacts(newContacts);

  return contacts[index];
}

const addContact = async (body) => {
  const contacts = await listContacts();

  const newContact = { ...body, id: crypto.randomUUID() };

  contacts.push(newContact);

  await writeContacts(contacts);

  return newContact;
}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
