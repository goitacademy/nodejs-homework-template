const fs = require('fs/promises');
const path = require("path");
const {v4: uuidv4} = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

async function changeContacts(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data)
}

const getContactById = async (contactId) => {
  const contactsList = await listContacts();
  const result = contactsList.find((contact) => contact.id === contactId);
  return result || null;
}

const removeContact = async (contactId) => {
  const contactsList = await listContacts();
  const removeIndex = contactsList.findIndex((contact) => contact.id === contactId);
  if (removeIndex === -1) {
    return null;
  }
  const [result] = contactsList.splice(idx, 1);
  await changeContacts(contactsList);
  return result;
}

const addContact = async (body) => {
  const contactsList = await listContacts();
  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };
  contactsList.push(newContact);
  await changeContacts(contactsList);
  return newContact;
}


const updateContact = async (contactId, body) => {
  const contactsList = await listContacts();
  const updateIndex = contactsList.findIndex((contact) => contact.id === contactId);
  if (updateIndex === -1) {
    return null;
  }
  const id = contactId;
  contactsList[updateIndex] = { id, name, email, phone };
  await changeContacts(contactsList);
  return contactsList[updateIndex];
}


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
