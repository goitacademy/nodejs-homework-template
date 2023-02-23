const fs = require("fs/promises");
const path = require("path");
const shortid = require("shortid");

const contactsPath = path.resolve(__dirname, "contacts.json");

const readContacts = async () => {
  const contactsRaw = await fs.readFile(contactsPath);
  const contacts = JSON.parse(contactsRaw);
  return contacts;
};
const writeContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const listContacts = async () => {
  const contacts = await readContacts();
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await readContacts();
  const contact = contacts.find((item) => item.id === contactId);
  return contact || null;
};

const removeContact = async (contactId) => {
  const contacts = await readContacts();
  const updateContact = contacts.filter((item) => item.id !== contactId);
  await writeContacts(updateContact);
};

const addContact = async (body) => {
  const id = shortid();
  const newContact = { id, ...body };
  const contacts = await readContacts();
  contacts.push(newContact);
  await writeContacts(contacts);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await readContacts();
  const contact = contacts.find((item) => item.id === contactId);
  const { name, email, phone } = body;
  if (contact) {
    contact.name = name;
    contact.email = email;
    contact.phone = phone;
  }
  await writeContacts(contacts);
  return contact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
