const fs = require('fs/promises');
const path = require("path");
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const foundContact = contacts.find((contact) => contact.id === contactId);
  return foundContact || null;

}

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...body
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const foundContact = contacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (foundContact === -1) { return null; }
  const result = contacts.splice(foundContact, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}
 


const updateContact = async (id, body) => {
   const contacts = await listContacts();
  const foundContact = contacts.findIndex(
    (contact) => contact.id === id
  );
  if (foundContact === -1) { return null; } 
  
  contacts[foundContact] = {id, ...body};
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[foundContact];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
