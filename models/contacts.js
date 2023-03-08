const fs = require('fs').promises;
const path = require('path');
const { v4 } = require('uuid');

const contactsPath = path.resolve(__dirname, "./models/contacts.json");

const listContacts = async () => {
const data = await fs.readFile(contactsPath);
const contacts = JSON.parse(data);
return contacts;
}

const getContactById = async (contactId) => {
const contacts = await listContacts();
const result = contacts.find(item => item.id === contactId);
return result;
}

const removeContact = async (contactId) => {
const contacts = await listContacts();
const removedContact = contacts.find(item => item.id === contactId); 
const NewContactList = contacts.filter(item => item.id ===! contactId); 
fs.writeFile(contactsPath, JSON.stringify(NewContactList));
return removedContact;
}

const addContact = async (name, email, phone) => {
const contacts = await listContacts();
const newContacts = { name, email, phone, id: v4() };
contacts.push(newContacts);
await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContacts;
}

const updateContact = async (contactId, name, email, phone) => {
  const contacts = await listContacts();

  const contact = contacts.find(item => item.id === contactId); 
  if (name) contact.name = name;
  if (email) contact.email = email;
  if (phone) contact.phone = phone;

  const contactIdx = contacts.findIndex(item => item.id === contactId);
  contacts[contactIdx] = contact;

fs.writeFile(contactsPath, JSON.stringify(contacts));
return contacts;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
