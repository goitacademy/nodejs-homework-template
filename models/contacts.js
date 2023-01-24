const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const contactsPath = path.join(__dirname, "./contacts.json");

const updateContacts = async (contacts) =>
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf8");
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const res = contacts.find((contact) => contact.id === contactId);
  if (!res) {
    return null;
  }
  return res;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  body = { id: uuidv4(), ...body };
  contacts.push(body);
  await updateContacts(contacts);
  return body;
};

const updateContact = async (contactId, body) => {
  if (!contactId) {
    return undefined;
  }
  const contacts = await listContacts();
  const matchedIndex = contacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (matchedIndex === -1) {
    return undefined;
  }
  contacts[matchedIndex] = { ...contacts[matchedIndex], ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts), "utf-8");
  return contacts[matchedIndex];
};

const removeContact = async (contactId) => {
  const data = await fs.readFile(contactsPath, "utf8");
  const parsed = JSON.parse(data);
  const removeIndex = parsed.findIndex((contact) => contact.id === contactId);
  const removed = parsed.splice(-1, removeIndex);
  parsed.splice(removeIndex, 1);
  await fs.writeFile(contactsPath, JSON.stringify(parsed, undefined, 2));
  return removed;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
