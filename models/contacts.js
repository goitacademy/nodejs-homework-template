 const fs = require('fs/promises')
 const path = require('path');
 const {nanoid} = require('nanoid');

 const contactsPath  = path.json(__dirname, './models/contacts.json');


const listContacts = async () => {
  const data = await fs.readFile(contactsPath );
  return JSON.parse(data);
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId);
  return result || null;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const  [result]  = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newcontacts = {
    contactId: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newcontacts);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newcontacts;
}

const updateContact = async (contactId, data) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  allContacts[index] = { id, ...data };
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return allContacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
