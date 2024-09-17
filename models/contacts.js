const fs = require('fs/promises');
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const contactsPath = path.join(__dirname, "contacts.json");


const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data)
  return contacts;
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contactById = contacts.find(
    contact => contact.id === contactId.toString()
  );
  if (!contactById) {
    return null
  }
  return contactById
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex(
    contact => contact.id === contactId.toString()
  );
  if (contactIndex === -1) {
    return null
  }
  const removedContact = contacts[contactIndex];
  contacts.splice(contactIndex, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return removedContact
}

const addContact = async (body) => {
  const { name, email, phone } = body;
  const contacts = await listContacts();
  const newContact = {
    name, email, phone, id: uuidv4()
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
}

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;
  const contacts = await listContacts();
  const contact = await getContactById(contactId);
  if (!contact) {
    return null
  }
  if (name) {
    contact.name = name
  }
  if (email) {
    contact.email = email
  }
  if (phone) {
    contact.phone = phone
  }
  const contactIndex = contacts.findIndex((item) => item.id === contactId);
  contacts[contactIndex] = contact;
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
