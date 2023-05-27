const fs = require("fs").promises;
const path = require("path");

const { v4 } = require("uuid");

const contactsPath = path.resolve("./contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const idToString = String(contactId);
  const contactById = contacts.find((contact) => contact.id === idToString);
  return contactById || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const idToString = String(contactId);
  const index = contacts.findIndex((item) => item.id === idToString);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { id: v4(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}
async function updateContacts(contactId, body) {
  const contacts = await listContacts();
  const idToString = String(contactId);
  const index = contacts.findIndex((item) => item.id === idToString);
  if (index === 1) {
    return null;
  }
  contacts[index] = { contactId, ...body };
  await updateContacts(contacts);
  return contacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContacts,
};
