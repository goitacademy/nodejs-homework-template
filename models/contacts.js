const fs = require('fs/promises')
const path = require("path");

const contactsPath = path.join(__dirname, "./contacts.json");
const { v4 } = require("uuid");

const updateContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const listContacts = async () => {
const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}



const getContactById = async (contactId) => {
 const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId);
  if (!result) {
    return null;
  }
  return result;
}

const removeContact = async (contactId) => {
 const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id === contactId);
  if (idx === -1) {
    return null;
  }
  const [deleteContact] = contacts.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return deleteContact;
}

const addContact = async ({ name, email, phone }) => {
   const contacts = await listContacts();
  const newContact = { id: v4(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
}

const updateContact = async (contactId, { name, email, phone }) => {
 const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }

  contacts[idx] = { id: contactId, name, email, phone };
  await updateContacts(contacts);
  return contacts[idx];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}