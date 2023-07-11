const fs = require("fs").promises;

const { v4: uuidv4 } = require("uuid");
const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");

const fileWrite = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const listContacts = async () => {
  const result = await fs.readFile(contactsPath);
  return JSON.parse(result);
};

const getContactById = async (contactId) => {
  const id = String(contactId);
  const searchContacts = await listContacts();
  const contactById = searchContacts.find((contact) => contact.id === id);
  return contactById || null;
};

const removeContact = async (contactId) => {
  const id = String(contactId);
  const arrayContacts = await listContacts();
  const index = arrayContacts.findIndex((contact) => contact.id === id);
  if (index === -1) {
    return null;
  }
  const deleteContact = arrayContacts.splice(index, 1);
  fileWrite(arrayContacts);
  return deleteContact;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = { id: uuidv4(), ...body };
  contacts.push(newContact);
  fileWrite(contacts);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const id = String(contactId);
  const contacts = await listContacts();
  let result = null;
  const newContacts = contacts.map((contact) => {
    if (contact.id === id) {
      result = { ...contact, ...body };
      return result;
    } else {
      return contact;
    }
  });
  fileWrite(newContacts);
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
