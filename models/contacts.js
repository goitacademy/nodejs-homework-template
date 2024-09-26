const fs = require('fs').promises;
const { nanoid } = require('nanoid');
const path = require("path");

const contactsPath = path.join(__dirname, "../models/contacts.json");


const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const res = contacts.find(contact => contact.id === contactId);
  return res || null;
}


const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [res] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return res;
}

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...body,
  }
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
}

const updateById = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const id = contactId;
  contacts[index] = { id, ...body };
  await updateContacts(contacts);
  return contacts[index];
}

const updateContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateById,
}
