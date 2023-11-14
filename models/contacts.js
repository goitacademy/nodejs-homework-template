const fs = require("fs/promises");
const path = require("node:path");
const contactsPath = path.join(__dirname, "contacts.json");
const crypto = require("node:crypto");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((cont) => cont.id === contactId);
  if (!contact) {
    return null;
  } else {
    return contact;
  }
};
function writeContacts(contacts) {
  return fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));
}
const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((cont) => cont.id === contactId);
  const contactsNew = contacts.filter((cont) => cont.id !== contactId);
  await writeContacts(contactsNew);
  if (!contact) {
    return null;
  } else {
    return contact;
  }
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  const contacts = await listContacts();
  const newContact = {
    id: crypto.randomUUID(),
    name: name,
    email: email,
    phone: phone,
  };
  contacts.push(newContact);
  await writeContacts(contacts);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === contactId);
  const { name, email, phone } = body;
  if (idx === -1) {
    return null;
  }
  const id = contactId;
  const contact = { id, name, email, phone };
  contacts[idx] = contact;
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
