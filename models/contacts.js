const fs = require('fs/promises');
const path = require('path');
const uniqid = require("uniqid");
const contactsPath = path.resolve("models", "contacts.json");

const listContacts = async () => {const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);}

const getContactById = async (contactId) => {const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId);
  return result || null;}

const removeContact = async (contactId) => {const contacts = await listContacts();
  const index = contacts.findIndex(
      (contact) => contact.id === contactId
  );
  if (index === -1) return null;
  const [removedContact] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return removedContact;
}

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = {
    name,
    email,
    phone,
    id: uniqid(),
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

const updateContact = async (contactId, body) => { const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === contactId);
  if (index === -1) {
    return null
  }
  contacts[index] = {contactId, ...body};
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];  }


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
