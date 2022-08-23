const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.resolve("models/contacts.json");

const listContacts = async () => {
  const result = await fs.readFile(contactsPath);
  return JSON.parse(result);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((el) => el.id === contactId);
  if (!result) {
    return null;
  }
  return result;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((el) => el.id === contactId);
  if (idx === -1) {
    return null;
  }
  const result = contacts.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const { name, email, phone } = body;
  
  const newContact = {
    name,
    email,
    phone,
    id: uuidv4(),
  };
  contacts.push(newContact)
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return newContact
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts()
  const idx = contacts.findIndex(el=> el.id === contactId)
  console.log(idx, contacts[idx])
  contacts[idx] = {...body, contactId}
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return contacts[idx]

};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
