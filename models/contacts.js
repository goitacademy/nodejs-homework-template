const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "./contacts.json");
const { v4 } = require("uuid");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);

  return contacts;
}

async function getContactById(id) {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === id);

  if (!contact) {
    return null;
  }

  return contact;
}

async function addContact(body) {
  const contacts = await listContacts();
  const newContact = { id: v4(), ...body };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));

  return newContact;
}

async function updateContact(id, body) {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === id);

  if (idx === -1) {
    return null;
  }

  contacts[idx] = { id, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts));

  return contacts[idx];
}

async function removeContact(id) {
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id === id);

  if (idx === -1) {
    return null;
  }

  const [removedContact] = contacts.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));

  return removedContact;
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
};
