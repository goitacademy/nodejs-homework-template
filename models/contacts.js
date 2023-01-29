const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");

const { v4: uuidv4 } = require("uuid");

async function listContacts() {
  return JSON.parse(await fs.readFile(contactsPath, "utf-8"));
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  if (!result) {
    return null;
  }
  return result;
}

async function addContact({ name, email, phone }) {
  const contacts = await listContacts();

  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const newContacts = contacts.findIndex((item) => item.id === contactId);
  if (newContacts === -1) {
    return null;
  }
  const removeCon = contacts.splice(newContacts, 1);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return removeCon;
}

async function updateContact(contactId, body) {
  const contacts = await listContacts();
  const newContacts = contacts.findIndex((item) => item.id === contactId);

  if (newContacts === -1) {
    return;
  }

  contacts[newContacts] = { id: contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts[newContacts];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
