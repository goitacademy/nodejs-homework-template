const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");

const contactsPath = path.join(__dirname, './contacts.json');

async function readListContacts() {
  const data = await fs.readFile(contactsPath, "utf8");
  return JSON.parse(data);
}

function rewriteListContacts(contacts) {
  return fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));
}


async function listContacts() {
  const contacts = await readListContacts();
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await readListContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  return contact || null;
}

async function removeContact(contactId) {
  const contacts = await readListContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [removeContact] = contacts.splice(index, 1);
  await rewriteListContacts(contacts);
  return removeContact;
}

async function addContact(data) {
  const contacts = await readListContacts();
  const newContact = {
    id: crypto.randomUUID(),
   ...data,
  };
  contacts.push(newContact);
  await rewriteListContacts(contacts);
  return newContact;
}

async function updateContactById (contactId, data) {
  const contacts = await readListContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  contacts[index] = {
    contactId,
  ...data
  };
return contacts[index];}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
}













