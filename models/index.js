const fs = require('fs/promises')
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "/contacts.json");

const listContacts = async () => {
  const date = await fs.readFile(contactsPath);
    return JSON.parse(date);
}

const getContactById = async (id) => {
  const contacts = await listContacts();
  const oneContact = contacts.find((contact) => contact.id === id);
  return oneContact || null;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const indexDelete = contacts.findIndex((contact) => contact.id === contactId);
  if (indexDelete === -1) {
    return null;
  }
  const [deleteContact] = contacts.splice(indexDelete, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return deleteContact;
}

const addContact = async (body) => {
  const contacts = await listContacts();
    const addContact = { id: nanoid(), ...body };
    contacts.push(addContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return addContact;
  }


const updateContact = async (contactId, body) => {
  const contacts = await  listContacts();
  const indexUpdateContact = contacts.findIndex((contact) => contact.id === contactId);
  if (indexUpdateContact === -1) {
    return null
  }
  contacts[indexUpdateContact] = { contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[indexUpdateContact];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

