const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const allContacts = JSON.parse(data);
  return allContacts;
}

async function getContactById(contactId) {
  const id = String(contactId);
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === id);
  return contact || null;
}

async function removeContact(contactId) {
  const id = String(contactId);
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index === -1) {
    return null;
  }
  const [contactForRemove] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contactForRemove;
}

async function addContact({ name, email, phone }) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
