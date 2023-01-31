const fs = require("node:fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");
const contactsPath = path.resolve(__dirname, "contacts.json");

const readContacts = async () => {
  const contactRaw = await fs.readFile(contactsPath);
  const contacts = JSON.parse(contactRaw);
  return contacts;
};

const listContacts = async () => {
  const data = await readContacts();
  return data;
};

const getContactById = async (contactId) => {
  const data = await readContacts();
  const contactById = data.find((contact) => contact.id === contactId);
  return contactById || null;
};

const removeContact = async (contactId) => {
  const data = await readContacts();
  const uData = data.filter((contact) => contact.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(uData, null, 2));
};

const addContact = async ({ name, email, phone }) => {
  const id = nanoid();
  const contact = { id, name, email, phone };
  const uData = await readContacts();
  uData.push(contact);
  await fs.writeFile(contactsPath, JSON.stringify(uData, null, 2));
  return contact;
};

const updateContact = async (contactId, body) => {
  const contactsDB = await readContacts();
  const index = contactsDB.findIndex((contact) => contact.id === contactId);
  contactsDB[index] = { id: contactId, ...body };
  fs.writeFile(contactsPath, JSON.stringify(contactsDB, null, 2));
  return contactsDB[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
