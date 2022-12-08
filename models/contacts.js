// const uniqid = require("uniqid");
const {nanoid} = require("nanoid");
const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "./contacts.json");

async function writeContacts(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

// -------------ContactsFunctions--------------------

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const id = String(contactId);
  const contacts = await listContacts();
  const contact = contacts.find((cont) => cont.id === id);
  return contact || null;
}

async function removeContact(contactId) {
  const id = String(contactId);
  const contacts = await listContacts();
  const contactForDeleteId = contacts.findIndex((contact) => contact.id === id);
  if (contactForDeleteId === -1) {
    return null;
  }
  const [removeCont] = contacts.splice(contactForDeleteId, 1);
  await writeContacts(contacts);
  return removeCont;
}

async function addContact({ name, email, phone }) {
  const newContact = { id: nanoid(), name, email, phone };
  const contacts = await listContacts();
  const newContacts = [...contacts, newContact];
  await writeContacts(newContacts);
  return newContact;
}

async function updateContact(contactId, body) {
  const id = String(contactId);
  const contacts = await listContacts();
  const contactForUpdateId = contacts.findIndex((contact) => contact.id === id);
  if (contactForUpdateId === -1) {
    return null;
  }
  contacts[contactForUpdateId] = { ...contacts[contactForUpdateId], ...body };
  await writeContacts(contacts);
  return contacts[contactForUpdateId];
}

module.exports = { listContacts, getContactById, removeContact, addContact };

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
