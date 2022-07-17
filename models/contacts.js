const fs = require("fs/promises");
const app = ('../../app');
const path = require("path");
const { v4: uuid} = require("uuid");
const contactsPath = path.join(__dirname, "contacts.json");

async function updateContactsDb(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, "\t"));
}

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  if (!result) {
    return null;
  }
  return result;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  const [removeContact] = contacts.splice(idx, 1);
  await updateContactsDb(contacts);
  return removeContact;
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  const contacts = await listContacts();
  const newContact = {
    name,
    email,
    phone,
    id: uuid(),
  };
  contacts.push(newContact);
  await updateContactsDb(contacts);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { id: contactId, name, email, phone };
  await updateContactsDb(contacts);
  return contacts[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};